const pool = require("../models/db");
const bcrypt = require("bcrypt");

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user_id;
    const { newPassword } = req.body;
    const hash = await bcrypt.hash(newPassword, 10);
    const sql = "UPDATE users SET password = ? WHERE user_id = ?";
    db.query(sql, [hash, userId], (err, result) => {
      if (err) {
        console.error("Password change error:", err);
        return res.status(500).json({ message: "Password change failed" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Password changed successfully" });
    });
  } catch (error) {
    console.error("Change password exception:", error);
    res.status(500).json({ message: "Server error" });
  }
};
