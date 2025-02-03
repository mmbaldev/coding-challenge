require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { syncDatabase } = require("./models");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
app.use(cors());

// Allow all origins
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api", movieRoutes);

syncDatabase().then(() => {
  if (process.env.NODE_ENV !== "test") {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port", process.env.PORT || 3000);
    });
  }
});

module.exports = app;
