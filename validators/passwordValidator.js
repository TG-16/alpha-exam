const { check, validationResult } = require('express-validator');

exports.passwordRules = [
  check('email').isEmail(),
  check('newPassword').isLength({ min: 6 })
];

exports.validatePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ errors: errors.array() });
  next();
};
