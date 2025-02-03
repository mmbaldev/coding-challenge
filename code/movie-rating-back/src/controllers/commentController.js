const { Movie, Comment } = require("../models");

exports.addComment = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { content } = req.body;
    const comment = await Comment.create({ content, movieId: movieId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
