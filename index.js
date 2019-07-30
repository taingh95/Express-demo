const express = require("express");

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')
//auth middleware
const authMiddlewares = require('./middlewares/auth.middleware')


//body parser
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')



const port = 3000;
const app = express();

//app use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser('nguyenhuutai'));
app.use(express.static('public'))
//view engine
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/",authMiddlewares.requireAuth ,(req, res) => {
  res.render("index", {
    name: "Tai"
  });
});

//authMiddlewares.requireAuth ,
app.use('/users',authMiddlewares.requireAuth ,userRoute)
app.use('/auth', authRoute)
app.use('/products', productRoute)


app.listen(port, () => console.log(`App is running on port ${3000}`));
