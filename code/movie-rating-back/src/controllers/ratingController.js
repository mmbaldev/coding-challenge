const { Movie, Rating } = require("../models");

exports.rateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { stars } = req.body;

    // Find the movie
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // Create and save the rating
    const rating = await Rating.create({ stars, movieId: movieId });
    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
