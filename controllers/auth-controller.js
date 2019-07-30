const db = require('../db')
const md5 = require('md5');
const generateUniqueId = require('generate-unique-id');


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

module.exports.create = (req,res) => {
    res.render("auth/sign-up")
}

module.exports.postCreate = (req,res) => {
    req.body.id = generateUniqueId.init({
        length: 32,
        useLetters: false
    });
    let avatar = req.file.path.split('/').slice(1).join('/');
    let hashedPassword = md5(req.body.password)
    let user = {
        email: req.body.email, password: hashedPassword, name: req.body.name, phone: req.body.phone, id : req.body.id, avatar
    }
    db.get('users').push(user).write();
    res.render('auth/index')
}