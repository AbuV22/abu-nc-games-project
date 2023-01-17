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

const getReviewsID = () => {
  const { review_id } = request.params;
  fetchReviewsID(review_id).then((reviews) => {
    console.log(reviews);
    response.status(200).send({ reviews });
  });
};
module.exports = { getCategories, getReviews, getReviewsID };
