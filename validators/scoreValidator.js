const { check, validationResult } = require("express-validator");

exports.scoreRules = [
  check("university_id").isInt({ gt: 0 }).withMessage("Invalid university ID"),
  check("stream_id").isInt({ gt: 0 }).withMessage("Invalid stream ID"),
  check("year_id").isInt({ gt: 2000 }).withMessage("Invalid year"),
  check("subject_id").isInt({ gt: 0 }).withMessage("Invalid subject ID"),
  check("semester_id")
    .isInt({ min: 1, max: 2 })
    .withMessage("Invalid semester"),
  check("score")
    .isInt({ min: 0, max: 100 })
    .withMessage("Score must be between 0 and 100"),
];

exports.validateScore = (req, res, next) => {
  if (!req.is("application/json")) {
    return res.status(400).json({ message: "Request must be in JSON format" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};
