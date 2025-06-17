const express = require('express');
const router = express.Router();

const logout = require('../controllers/logoutController');
const passwordCh = require('../controllers/passwordChangeController');
const question = require('../controllers/questionController');
const score = require('../controllers/scoreController');

const authMW = require('../middlewares/auth');
const deviceCheck = require('../middlewares/deviceCheck');

const { questionRules, validateQuestion } = require('../validators/questionValidator');
const { scoreRules, validateScore } = require('../validators/scoreValidator');
const { passwordRules, validatePassword } = require('../validators/passwordValidator');

router.post('/logout', authMW, logout);
router.post('/change-password',authMW, passwordRules, validatePassword, passwordCh);
router.post('/questions/fetch', authMW, deviceCheck, questionRules, validateQuestion, question.fetch);
router.post('/scores/submit', authMW, deviceCheck, scoreRules, validateScore, score.submit);

module.exports = router;
