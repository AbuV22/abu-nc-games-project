const express = require("express");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewsID,
  getReviewsIDComment,
  postReviewsIDComment,
} = require("./app.controller");
const pg = require("pg");

app.use(express.json());
app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsID);
app.get("/api/reviews/:review_id/comments", getReviewsIDComment);
app.post("/api/reviews/:review_id/comments", postReviewsIDComment);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    err.status = 400;
    err.message = "Invalid data type used";
  }
  res.status(err.status).send({ message: err.message });
});

app.use((err, req, res, next) => {
  if (!err.status || !err.message) {
    err.status = 500;
    err.message = "Internal Server Error";
  }
  res.status(err.status).send({ message: err.message });
});

module.exports = { app };
