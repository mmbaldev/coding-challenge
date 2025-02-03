const { body, validationResult } = require("express-validator");
const Movie = require("../models/movie");

const validateMovie = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required")
    .custom(async (value) => {
      const existingMovie = await Movie.findOne({ where: { title: value } });
      if (existingMovie) {
        throw new Error("Movie title must be unique");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateRating = [
  body("rating")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1-5"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateMovie, validateRating };
