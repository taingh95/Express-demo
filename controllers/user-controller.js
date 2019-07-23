const db = require('../db')
const generateUniqueId = require('generate-unique-id');



module.exports.index = (req,res) => {
    res.render("users/index", {
        users:  db.get('users').value()
    })
}

module.exports.search = (req,res) => {
    let q = req.query.q;
    let matchedUser = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index', {
        users: matchedUser
    })
    console.log(req.query)
}

module.exports.getCreate = (req,res) => {
    res.render('users/create-user')
}

module.exports.postCreate = (req,res) => {
    req.body.id = generateUniqueId.init({
        length: 32,
        useLetters: false
      });
    let errors = [];
    let user = {
        name: req.body.name, id: req.body.id, phone: req.body.phone
    }
    if(!req.body.name) {
        errors.push("Name is required!!")
    }
    if(!req.body.phone) {
        errors.push("Phone is required!!")
    }
    if(errors.length) {
        res.render('users/create-user', {
            errors, values: req.body
        })
        return;
    }
    db.get('users').push(user).write();
    res.redirect('/users')
}

module.exports.viewUser = (req,res) => {
    res.render('users/view', {
        user: db.get('users').find({id : req.params.id}).value()
    })
}