const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/paymentPic");
  },
  filename: (req, file, cb) => {
    const originalName = path.basename(file.originalname);
    const newFileName = Date.now() + originalName;
    
    req.body.uploadedFileName = newFileName;

    cb(null, newFileName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;