const pool = require("../models/db");
const bcrypt = require("bcrypt");

exports.changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hash = await bcrypt.hash(newPassword, 10);
  const sql = "UPDATE users SET password = ? WHERE email = ?";

  db.query(sql, [hash, email], (err, result) => {
    if (err) {
      console.error("Password change error:", err);
      return res.status(500).json({ message: "Failed to change password" });
    }
    res.json({ message: "Password changed successfully" });
  });
};
