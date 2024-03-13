const express = require("express");
const mysql = require("mysql2/promise");
const config = require("./config");

const app = express();
app.use(express.json());

mysql
  .createConnection(config.db)
  .then((connection) => {
    console.log("Connected to MySQL database");
    app.locals.db = connection;
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

app.get("/api/profiles", async (req, res) => {
  try {
    const [rows] = await req.app.locals.db.execute("SELECT * FROM profiles");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/profiles", async (req, res) => {
  const { firstName, lastName, instruments, musicStyles, socialLinks, location, availability, email, phone } = req.body;

  try {
    const [result] = await req.app.locals.db.execute("INSERT INTO profiles (firstName, lastName, instruments, musicStyles, socialLinks, location, availability, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [firstName, lastName, instruments.join(","), musicStyles.join(","), socialLinks.join(","), location, availability, email, phone]);

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
