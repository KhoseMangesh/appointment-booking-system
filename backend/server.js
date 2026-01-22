const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
