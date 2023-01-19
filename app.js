const express = require("express");
const app = express();
const { getCategories, getReviews, getReviewsID } = require("./app.controller");
const pg = require("pg");

app.use(express.json());
app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsID);

// PSQL Error
app.use((err, req, res, next) => {
  if (err.message === "Review not found") {
    res.status(404).send({ message: err.message });
  } else if ((err.message = "Invalid Review ID")) {
    res.status(400).send({ message: err.message });
  } else if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

// General Error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = { app };
