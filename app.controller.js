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

const getReviewsID = (req, res) => {
  const { review_id } = req.params;
  fetchReviewsID(review_id)
    .then((reviews) => {
      console.log(reviews);
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
module.exports = { getCategories, getReviews, getReviewsID };
