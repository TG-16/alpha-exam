const pool = require("../models/db");
const { generateToken } = require("../utils/token");

exports.logout = async (req, res) => {
  await pool.execute("DELETE FROM login_sessions WHERE user_id = ?", [
    req.user.id,
  ]);
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
