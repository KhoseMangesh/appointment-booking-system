const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {
  const { patient_name, age, doctor_name, booking_date, booking_time } = req.body;

  const sql = `
    INSERT INTO bookings
    (patient_name, age, doctor_name, booking_date, booking_time)
    VALUES (?,?,?,?,?)
  `;

  db.query(sql, [patient_name, age, doctor_name, booking_date, booking_time], (err) => {
    if (err) {
      return res.status(400).send("Slot already booked");
    }
    res.send("Appointment booked successfully");
  });
});

module.exports = router;
