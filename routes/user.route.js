var express = require('express')
var router = express.Router()
const generateUniqueId = require('generate-unique-id');

const db = require('../db')


router.get('/', (req,res) => {
    res.render("users/index", {
        users:  db.get('users').value()
    })
})

//search-user
router.get('/search', (req,res) => {
    let q = req.query.q;
    let matchedUser = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index', {
        users: matchedUser
    })
    console.log(req.query)
})

//add-new-user
router.get('/create', (req,res) => {
    res.render('users/create-user')
})
router.post('/create', (req,res) => {
    req.body.id = generateUniqueId.init({
        length: 32,
        useLetters: false
      });
    let user = {
        name: req.body.name, id: req.body.id
    }
    db.get('users').push(user).write();
    res.redirect('/users')
})

//view dynamic router
router.get('/:id', (req,res) => {
    res.render('users/view', {
        user: db.get('users').find({id : req.params.id}).value()
    })
})

module.exports = router
