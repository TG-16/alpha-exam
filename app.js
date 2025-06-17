const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/../utils/.env" });
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", routes);

// Root health check
app.get("/", (req, res) => {
  res.send("Freshman Exam Backend API running ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Check MySQL connection
const pool = require("./models/db");

pool
  .query("SELECT 1")
  .then(() => console.log("✅ MySQL Connected"))
  .catch((err) => console.error("DB connection error:", err));
