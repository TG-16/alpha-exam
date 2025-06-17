const express = require('express');
const router = express.Router();

const register = require('../controllers/registerController');
const registerValidator = require('../validators/registerValidator');
// const registerMiddleware = require('../utils/registerNewUserCheck');
const upload = require('../utils/multer');

//Register route
router.post('/signup' ,upload.single("paymentPhoto")  ,registerValidator, register);
router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the registration API" });
});


module.exports = router;
