const fs = require('fs');
const path = require('path');

function validateRegister(req, res, next) {
  // console.log("Validating registration data:\n", JSON.stringify(req.body, null, 2));

  const { email, password, selectedSemesters} = req.body;
  const uploadedFileName = req.file?.filename;
  const filePath = path.join(__dirname, "..", "images", "paymentPic", uploadedFileName);

  if (!email || !password  || !selectedSemesters) {
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) console.error("Failed to delete file after DB error:", unlinkErr);
    });
    console.log("File upload failed or no file provided. semisters");
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // if (password !== confirmPassword) {
  //   fs.unlink(filePath, (unlinkErr) => {
  //     if (unlinkErr) console.error("Failed to delete file after DB error:", unlinkErr);
  //   });
  //   return res.status(400).json({ error: 'Passwords do not match.' });
  // }

  if (password.length < 6) {
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) console.error("Failed to delete file after DB error:", unlinkErr);
    });
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  //amount will be calculated and send to admin dashboard it is not used/saved in the user table
//   const streamCount = Array.isArray(streams) ? streams.length : 0;
//   const semisterCount = Array.isArray(semisters) ? semisters.length : 0;
//   const trueAmount = (semisterCount * 100) + (streamCount * 50);

//   if (Number(amount) !== trueAmount) {
//     return res.status(400).json({ error: 'Amount does not match the calculated value.' });
//   }

  next();
}

module.exports = validateRegister;
