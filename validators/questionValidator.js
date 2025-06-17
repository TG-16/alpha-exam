const { check, validationResult } = require("express-validator");

exports.questionRules = [
  check("university_id").isInt({ gt: 0 }),
  check("stream_id").isInt({ gt: 0 }),
  check("year_id").isInt({ gt: 2000 }),
  check("subject_id").isInt({ gt: 0 }),
  check("semester_id").isInt({ min: 1, max: 2 }),
  check("exam_id").isInt({ gt: 0 }),
];

exports.validateQuestion = (req, res, next) => {
  if (!req.is("application/json")) {
    return res.status(400).json({ message: "Request must be in JSON format" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
