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

// const getReviewsID = () => {
//   fetchReviewsID(id).then((something) => {
//     console.log(something);
//   });
// };
module.exports = { getCategories, getReviews };
