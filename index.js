const express = require("express");
const app = express();

const port = 3000;


//data
let users =  [
    {name: "Tai", id: "1"},
    {name: "Linh", id: "2"}
]



app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    name: "Tai"
  });
});

app.get('/users', (req,res) => {
    res.render("users/index", {
        users
    })
})

app.get('/users/search', (req,res) => {
    let q = req.query.q;
    let matchedUser = users.filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index', {
        users: matchedUser
    })
    console.log(req.query)
})



app.listen(port, () => console.log(`App is running on port ${3000}`));
