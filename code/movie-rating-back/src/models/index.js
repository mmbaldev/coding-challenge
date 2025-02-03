const sequelize = require("../config/database");
const Movie = require("./movie");
const Comment = require("./comment");
const Rating = require("./rating");
const Wish = require("./wishlist");

const syncDatabase = async () => {
  try {
    await sequelize.authenticate(); // Ensure database connection
    console.log("✅ Database connected successfully.");

    if (process.env.NODE_ENV === "test") {
      await sequelize.sync({ force: true }); // Clean database in test mode
      console.log("🔄 Test Database Reset");
    } else {
      await sequelize.sync();
      console.log("✅ Database synchronized without data loss.");
    }
  } catch (error) {
    console.error("❌ Database synchronization error:", error);
  }
};

module.exports = { sequelize, Movie, Comment, Rating, Wish, syncDatabase };
