const { check, validationResult } = require('express-validator');

exports.scoreRules = [
  check('university_id').isInt(),
  check('stream_id').isInt(),
  check('year_id').isInt(),
  check('subject_id').isInt(),
  check('semester_id').isInt(),
  check('score').isInt()
];

exports.validateScore = (req, res, next) => {
  if (!req.is('application/json')) {
    return res.status(400).json({ message: 'Request must be in JSON format' });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};
