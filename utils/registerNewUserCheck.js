//mock
const checkNewUser = (req, res, next) => {
    // Check if the user is already registered
    if (req.session && req.session.user) {
        // If user is already registered, redirect to the home page
        return res.redirect('/');
    }
    
    // If user is not registered, proceed to the next middleware or route handler
    next();
    }

module.exports = checkNewUser;