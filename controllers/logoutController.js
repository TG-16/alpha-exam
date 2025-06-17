const pool = require("../models/db");
const { generateToken } = require("../utils/token");

exports.logout = (req, res) => {
  const sql = "DELETE FROM login_sessions WHERE user_id = ?";
  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  });
};
