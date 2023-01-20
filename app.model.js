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
      if (!data.rows.length) {
        return Promise.reject({ message: "Review not found", status: 404 });
      }
      return data.rows[0];
    });
};

const fetchReviewsIDComment = (review_id) => {
  return db
    .query(`SELECT review_id FROM reviews WHERE review_id = $1`, [review_id])
    .then((data) => {
      if (!data.rows.length) {
        return Promise.reject({ status: 404, message: "Review not found" });
      }
      return db
        .query(
          `
  SELECT comment_id, votes, created_at, author, body, review_id
  FROM comments
  WHERE review_id = $1
  ORDER BY created_at DESC
  `,
          [review_id]
        )
        .then((data) => {
          if (!data.rows.length) {
            return [];
          }
          return data.rows;
        });
    });
};

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewsID,
  fetchReviewsIDComment,
};
