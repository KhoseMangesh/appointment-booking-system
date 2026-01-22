const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // put your MySQL password if you set one
  database: "hospital_booking"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    return;
  }
  console.log("MySQL connected");
});

module.exports = db;
