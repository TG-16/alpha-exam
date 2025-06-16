const express = require('express');
const router = express.Router();

const register = require('../controllers/registerController');
const registerValidator = require('../validators/registerValidator');
const registerMiddleware = require('../utils/registerNewUserCheck');

//Register route
router.post('/signup' , register);


module.exports = router;
