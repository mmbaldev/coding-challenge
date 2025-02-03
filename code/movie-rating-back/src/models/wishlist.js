const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Movie = require("./movie");

const Wish = sequelize.define("Wish", {
  movieId: { type: DataTypes.INTEGER, allowNull: false },
});

Movie.hasMany(Wish, { foreignKey: "movieId", onDelete: "CASCADE" });
Wish.belongsTo(Movie, { foreignKey: "movieId" });

// Sync Database
sequelize.sync();

module.exports = Wish;
