const { fetchCategories, fetchReviews } = require("./app.model");

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
      console.log(reviews, "<-- controller log");
      res.status(200).send({ reviews });
    })
    .catch(next);
};
module.exports = { getCategories, getReviews };
