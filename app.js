const express = require("express");
const { getCategories } = require("./app.controller");
const app = express();

app.use(express.json());
app.get("/api/categories", getCategories);

// PSQL Error
app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

// General Error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = { app };
