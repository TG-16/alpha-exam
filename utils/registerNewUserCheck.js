//transfered for login
const checkNewUser = (req, res, next) => {
    const { email } = req.body;    
    const sql = 'SELECT status FROM users WHERE email = ?';

    db.query(sql, [email], (err, results) => {
    if (err) {
        console.error(err);
        // handle error
    } else if (results.length === 0) {
        console.log('User not found');
    } else {
        console.log('User status:', results[0].status);
    }
    });

    next();
    }

module.exports = checkNewUser;