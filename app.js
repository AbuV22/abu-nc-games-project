const express = require("express");
const app = express();
const { getCategories, getReviews } = require("./app.controller");

app.use(express.json());
app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
// app.get("/api/reviews/:review_id", getReviewsID);

// PSQL Error
app.use((err, req, res, next) => {
  if (err.status && err.message) {
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
