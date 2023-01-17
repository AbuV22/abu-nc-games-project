const db = require("./db/connection");

const fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

const fetchReviews = () => {
  return db
    .query(
      `
  SELECT owner, title, review_id, category, review_img_url, created_at, votes, designer, 
  (SELECT COUNT(*) FROM comments WHERE comments.review_id = reviews.review_id) as comment_count
  FROM reviews
  ORDER BY created_at DESC;
  `
    )
    .then((data) => {
      const reviews = data.rows.map((review) => {
        return {
          ...review,
          comment_count: parseInt(review.comment_count),
          created_at: new Date(review.created_at),
        };
      });
      return reviews;
    });
};

module.exports = { fetchCategories, fetchReviews };
