const express = require("express");
const db = require("../db");

const router = express.Router();

/* REGISTER */
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";

  db.query(sql, [name, email, password], (err) => {
    if (err) {
      return res.status(400).send("User already exists");
    }
    res.send("Registration successful");
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (err, result) => {
    if (result.length > 0) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

module.exports = router;
