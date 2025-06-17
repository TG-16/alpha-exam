const db = require("../models/db");

exports.fetch = (req, res) => {
  try {
    const {
      university_id,
      stream_id,
      year_id,
      subject_id,
      semester_id,
      exam_id,
    } = req.body;
    if (
      !university_id ||
      !stream_id ||
      !year_id ||
      !subject_id ||
      !semester_id ||
      !exam_id
    ) {
      return res.status(400).json({ message: "Missing classification fields" });
    }
    const sql = `SELECT question_id, question, choices, answer, description
                 FROM questions WHERE university_id = ? AND stream_id = ? AND year_id = ?
                 AND subject_id = ? AND semester_id = ? AND exam_id = ?`;
    const values = [
      university_id,
      stream_id,
      year_id,
      subject_id,
      semester_id,
      exam_id,
    ];
    db.query(sql, values, (err, rows) => {
      if (err) {
        console.error("Question fetch error:", err);
        return res
          .status(500)
          .json({ message: "Database error while fetching questions" });
      }
      res.status(200).json({ questions: rows });
    });
  } catch (error) {
    console.error("Question fetch exception:", error);
    res.status(500).json({ message: "Unexpected error fetching questions" });
  }
};
