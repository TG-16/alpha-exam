const db = require("../models/db");

module.exports = async (req, res, next) => {
  try {
    const deviceId = req.headers["x-device-id"];
    if (!deviceId || typeof deviceId !== "string") {
      return res.status(400).json({ message: "Device ID missing or invalid" });
    }
    db.query(
      "SELECT 1 FROM login_sessions WHERE user_id = ? AND device_id != ?",
      [req.user.id, deviceId],
      (err, results) => {
        if (err) {
          console.error("Device check DB error:", err);
          return res
            .status(500)
            .json({ message: "Device verification failed" });
        }
        if (results.length > 0)
          return res
            .status(403)
            .json({ message: "User already logged in from another device" });
        next();
      }
    );
  } catch (error) {
    console.error("Device check error:", error);
    return res.status(500).json({ message: "Middleware error" });
  }
};
