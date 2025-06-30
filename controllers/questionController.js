const db = require("../models/db");

exports.submit = (req, res) => {
  const { university_id, stream_id, year_id, subject_id, semester_id, exam_id, score } =
    req.body;
  const sql = `INSERT INTO score (user_id, university_id, stream_id, year_id, subject_id, semester_id,exam_id, score)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    req.user.id,
    university_id,
    stream_id,
    year_id,
    subject_id,
    semester_id,
    exam_id ,
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
};
