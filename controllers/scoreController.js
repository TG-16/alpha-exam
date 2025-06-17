const db = require("../models/db");

exports.submit = (req, res) => {
  try {
    const {
      university_id,
      stream_id,
      year_id,
      subject_id,
      semester_id,
      score,
    } = req.body;
    if (
      !university_id ||
      !stream_id ||
      !year_id ||
      !subject_id ||
      !semester_id ||
      typeof score !== "number"
    ) {
      return res.status(400).json({ message: "Invalid score submission data" });
    }
    const sql = `INSERT INTO score (user_id, university_id, stream_id, year_id, subject_id, semester_id, score)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      req.user.id,
      university_id,
      stream_id,
      year_id,
      subject_id,
      semester_id,
      score,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Score submission error:", err);
        return res.status(500).json({ message: "Failed to submit score" });
      }
      res
        .status(201)
        .json({
          message: "Score submitted successfully",
          scoreId: result.insertId,
        });
    });
  } catch (error) {
    console.error("Submit score exception:", error);
    res
      .status(500)
      .json({ message: "Unexpected server error submitting score" });
  }
};
