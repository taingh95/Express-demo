const db = require('../db')
const md5 = require('md5');


module.exports.index = (req,res) => {
    res.render("auth/index")
}

module.exports.authLogin = (req,res) => {
    const email = req.body.email;
    let user = db.get('users').find({ email : email}).value();

    if(!user) {
        res.render('auth/index', {
            error: [
                'User does not exists!!'
            ]
        })
        return;
    }
    let hashedPassword = md5(req.body.password)
    if(user.password !== hashedPassword) {
        res.render('auth/index', {
            error: [
                'Wrong password.'
            ]
        })
        return;
    }

    res.cookie('userID', user.id, { 
        signed: true 
    });
    res.redirect('/users');
}
