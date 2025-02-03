const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const ratingController = require("../controllers/ratingController");
const commentController = require("../controllers/commentController");
const wishlistController = require("../controllers/wishlistController");

router.get("/movies/search", movieController.searchMovie);

router.get("/movies", movieController.getMovies);
router.post("/movies", movieController.addMovie);
router.get("/movies/search", movieController.getMovieById);
router.get("/movies/:id", movieController.getMovieById);
router.delete("/movies/:id", movieController.deleteMovie);

router.post("/movies/:movieId/rate", ratingController.rateMovie);

router.post("/movies/:movieId/wishlist", wishlistController.addToWishlist);

router.post("/movies/:movieId/comment", commentController.addComment);
router.delete("/comments/:id", commentController.deleteComment);

module.exports = router;
