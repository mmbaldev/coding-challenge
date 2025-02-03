const { Wish } = require("../models");
const sequelize = require("../config/database");

exports.addToWishlist = async (req, res) => {
  try {
    const { title } = req.body;
    const wish = await Wish.create({ title });
    res.status(201).json(wish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
