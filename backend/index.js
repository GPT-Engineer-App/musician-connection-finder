const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "musician_app",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

app.get("/api/profiles", (req, res) => {});

app.post("/api/profiles", (req, res) => {});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
