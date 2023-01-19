const { response } = require("express");
const {
  fetchCategories,
  fetchReviews,
  fetchReviewsID,
} = require("./app.model");
const comments = require("./db/data/test-data/comments");

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
    const error = new Error("Invalid Review ID");
    error.status = 400;
    return next(error);
  }
  fetchReviewsID(review_id)
    .then((reviews) => {
      if (!reviews) {
        const error = new Error("Review not found");
        error.status = 404;
        return next(error);
      }
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

// const getReviewsIDComment = (req, res, next) => {
//   const { review_id } = req.params;
//   fetchReviewsIDComment(review_id)
//     .then((comments) => {
//       if (!comments.length) {
//         return res.status(404).send({ message: "Comment not found" });
//       }
//       res.status(200).send({ comments });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

module.exports = {
  getCategories,
  getReviews,
  getReviewsID,
};
