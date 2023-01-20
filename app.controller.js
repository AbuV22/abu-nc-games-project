const { response } = require("express");
const {
  fetchCategories,
  fetchReviews,
  fetchReviewsID,
  fetchReviewsIDComment,
  insertComment,
} = require("./app.model");
const comments = require("./db/data/test-data/comments");
const reviews = require("./db/data/test-data/reviews");

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
  fetchReviewsID(review_id)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

const getReviewsIDComment = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewsIDComment(review_id)
    .then((comments) => {
      if (!comments.length) {
        res.status(200).send([]);
      } else {
        res.status(200).send(comments);
      }
    })
    .catch((err) => {
      next(err);
    });
};

const postReviewIDComments = (req, res, next) => {
  const { body } = req;
  insertComment(body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = {
  getCategories,
  getReviews,
  getReviewsID,
  getReviewsIDComment,
  postReviewIDComments,
};
