const db = require('../db')

module.exports.index = (req,res) => {
    res.render("auth/index")
}

module.exports.authLogin = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user = db.get('users').find({ email : email}).value();

    if(!user) {
        res.render('auth/index', {
            error: [
                'User does not exists!!'
            ]
        })
        return;
    }

    if(user.password !== password) {
        res.render('auth/index', {
            error: [
                'Wrong password.'
            ]
        })
        return;
    }

    res.cookie('userID', user.id);
    res.redirect('/users');
}
