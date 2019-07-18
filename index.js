const express = require("express");
const app = express();

const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    name: "Tai"
  });
});

app.get('/users', (req,res) => {
    res.render("users/index", {
        users: [
            {name: "Tai", id: "1"},
            {name: "Linh", id: "2"}
        ]
    })
})


app.listen(port, () => console.log(`App is running on port ${3000}`));
