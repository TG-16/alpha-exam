const pool = require("../models/db");
const bcrypt = require("bcrypt");

exports.changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hash = await bcrypt.hash(newPassword, 10);
  await pool.execute("UPDATE users SET password = ? WHERE email = ?", [
    hash,
    email,
  ]);
  res.json({ message: "Password changed" });
};
