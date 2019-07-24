const db = require('../db')


module.exports.requireAuth = (req,res,next) => {
    var user = db.get('users').find({id : req.cookies.userID}).value();
    console.log(req.cookies.userID)
    if(!req.cookies.userID) {
        res.redirect('/auth/login');
        return;
    }

    if(!user) {
        res.redirect('/auth/login')
        return;
    }
    next();
}