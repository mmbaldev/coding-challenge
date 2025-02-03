const { Movie, Rating, Comment } = require("../models");
const sequelize = require("../config/database");
const {
  searchMoviesWithOpenAI,
  searchMoviesWithHuggingFace,
  searchMoviesWithCohere,
} = require("../services/llmService");

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      include: [
        { model: Rating, attributes: [] },
        { model: Comment, attributes: [] },
      ],
      attributes: [
        "id",
        "title",
        [
          sequelize.fn(
            "COALESCE",
            sequelize.fn("AVG", sequelize.col("Ratings.stars")),
            0
          ),
          "rating",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.fn("DISTINCT", sequelize.col("Comments.id"))
          ),
          "comments_count",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.fn("DISTINCT", sequelize.col("Ratings.id"))
          ),
          "ratings_count",
        ],
      ],
      group: ["Movie.id"],
      raw: true,
    });

    const formattedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      comments_count: parseInt(movie.comments_count, 10),
      rating: parseFloat(parseFloat(movie.rating).toFixed(2)), // Ensures rating has 2 decimal place
      ratings_count: parseInt(movie.ratings_count, 10),
    }));

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "content"],
        },
        {
          model: Rating,
          attributes: [],
        },
      ],
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const comments_count = await Comment.count({ where: { movieId: id } });
    const ratings_count = await Rating.count({ where: { movieId: id } });
    const ratingAvg = await Rating.findOne({
      where: { movieId: id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    res.json({
      id: movie.id,
      title: movie.title,
      comments: movie.Comments,
      comments_count,
      ratings_count,
      rating: ratingAvg?.avgRating
        ? parseFloat(ratingAvg.avgRating.toFixed(1))
        : 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { title } = req.body;
    const movie = await Movie.create({ title });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchMovie = async (req, res) => {
  const { keyword, method } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  let results;
  switch (method) {
    case "openai":
      results = await searchMoviesWithOpenAI(keyword);
      break;
    case "huggingface":
      results = await searchMoviesWithHuggingFace(keyword);
      break;
    case "cohere":
      results = await searchMoviesWithCohere(keyword);
      break;
    default:
      results = await searchMoviesWithOpenAI(keyword);
  }

  res.json(results);
};
