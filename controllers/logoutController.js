const pool = require("../models/db");
const { generateToken } = require("../utils/token");

exports.logout = (req, res) => {
  const sql = "DELETE FROM login_sessions WHERE user_id = ?";
  db.query(sql, [req.user.id], (err, result) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    }); // additionally overwrite the token with a blank one and very short lifespan
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1, // 1 millisecond
    });
    res.status(200).json({ message: "Logged out successfully" });
  });
};
