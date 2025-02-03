const Movie = require("./movie");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rating = sequelize.define("Rating", {
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  movieId: { type: DataTypes.INTEGER, allowNull: false },
});
Movie.hasMany(Rating, { foreignKey: "movieId", onDelete: "CASCADE" });
Rating.belongsTo(Movie, { foreignKey: "movieId" });

// Sync Database
sequelize.sync();

module.exports = Rating;
