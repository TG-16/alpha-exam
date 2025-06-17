const pool = require('../models/db');

exports.submit = async (req, res) => {
  const { university_id, stream_id, year_id, subject_id, semester_id, score } = req.body;
  if (!university_id || !stream_id || !year_id || !subject_id || !semester_id || typeof score !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  await pool.execute('INSERT INTO score (user_id, university_id, stream_id, year_id, subject_id, semester_id, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.user.id, university_id, stream_id, year_id, subject_id, semester_id, score]);
  res.json({ message: 'Score submitted' });
};