const express = require("express");

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')
//auth middleware
const authMiddlewares = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

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

//enabled cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//sessionMiddleware
app.use(sessionMiddleware);

app.get("/",authMiddlewares.requireAuth ,(req, res) => {
  res.render("index", {
    name: "Tai"
  });
});

//authMiddlewares.requireAuth ,
app.use('/users',authMiddlewares.requireAuth ,userRoute)
app.use('/auth', authRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)


app.listen(port, () => console.log(`App is running on port ${3000}`));
