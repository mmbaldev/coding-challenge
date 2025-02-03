const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Movie = require("./movie");

const Comment = sequelize.define("Comment", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  movieId: { type: DataTypes.INTEGER, allowNull: false },
});

Movie.hasMany(Comment, { foreignKey: "movieId", onDelete: "CASCADE" });
Comment.belongsTo(Movie, { foreignKey: "movieId" });

// Sync Database
sequelize.sync();


module.exports = Comment;
