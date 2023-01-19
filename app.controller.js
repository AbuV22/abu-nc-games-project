const { response } = require("express");
const {
  fetchCategories,
  fetchReviews,
  fetchReviewsID,
} = require("./app.model");

const getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};

const getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

const getReviewsID = (req, res, next) => {
  const { review_id } = req.params;
  if (isNaN(review_id)) {
    const error = new Error("Invalid review ID");
    error.status = 400;
    return next(error);
  }
  fetchReviewsID(review_id)
    .then((reviews) => {
      if (!reviews) {
        return next(new Error("Review not found"));
      }
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCategories, getReviews, getReviewsID };
