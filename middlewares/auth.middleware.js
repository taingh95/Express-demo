const db = require('../db')


module.exports.requireAuth = (req,res,next) => {
    var user = db.get('users').find({id : req.signedCookies.userID}).value();
    console.log('signed',req.signedCookies)
    if(!req.signedCookies.userID) {
        res.redirect('/auth/login');
        return;
    }

    if(!user) {
        res.redirect('/auth/login')
        return;
    }
    res.locals.user = user;
    next();
}