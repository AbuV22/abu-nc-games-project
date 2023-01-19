const db = require("./db/connection");
const reviews = require("./db/data/test-data/reviews");

const fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

const fetchReviews = () => {
  return db
    .query(
      `
    SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes,reviews.designer, +COUNT(comments.review_id) as comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC;
    `
    )
    .then((data) => {
      return data.rows;
    });
};
const fetchReviewsID = (review_id) => {
  return db
    .query(
      `
    SELECT reviews.review_id, reviews.title, reviews.review_body, reviews.designer, reviews.review_img_url, reviews.votes, reviews.category, reviews.owner, reviews.created_at
    FROM reviews
    WHERE reviews.review_id = $1
  `,
      [review_id]
    )
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = { fetchCategories, fetchReviews, fetchReviewsID };
