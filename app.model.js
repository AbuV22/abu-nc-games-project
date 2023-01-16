const db = require("./db/connection");

const fetchCategories = () => {
  return db.query("SELECT * FROM categories;").then((data) => {
    return data.rows;
  });
};

module.exports = { fetchCategories };
