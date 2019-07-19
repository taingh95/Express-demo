const express = require("express");
const userRoute = require('./routes/user.route')
//body parser
var bodyParser = require('body-parser')

const port = 3000;
const app = express();

//app use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

//view engine
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    name: "Tai"
  });
});

app.use('/users', userRoute)



app.listen(port, () => console.log(`App is running on port ${3000}`));
