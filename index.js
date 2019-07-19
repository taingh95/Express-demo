const express = require("express");
const app = express();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const generateUniqueId = require('generate-unique-id');



//save db json
const adapter = new FileSync('db.json')
const db = low(adapter)
//set default db
db.defaults({ users: []})
  .write()

//body parser
var bodyParser = require('body-parser')



const port = 3000;


//app use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
//data


//view engine
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    name: "Tai"
  });
});

app.get('/users', (req,res) => {
    res.render("users/index", {
        users:  db.get('users').value()
    })
})

//search-user
app.get('/users/search', (req,res) => {
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
app.get('/users/create', (req,res) => {
    res.render('users/create-user')
})
app.post('/users/create', (req,res) => {
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
app.get('/users/:id', (req,res) => {
    res.render('users/view', {
        user: db.get('users').find({id : req.params.id}).value()
    })
})



app.listen(port, () => console.log(`App is running on port ${3000}`));
