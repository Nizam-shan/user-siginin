const dotenv = require ('dotenv'); // for secure purpose this dotenv have been installed and used were secret keys are keot
const express = require ("express");
const mongoose = require ("mongoose");
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
mongoose.set('strictQuery', true);
dotenv.config({path:'./config.env'}); //configured env
require('./connection/connection'); // imported db folder 
//const user = require("./models/userSchema");
app.use(express.json());// to use json format 
app.use(require("./routes/auth")) //import router folder and used before app this router will be rendered
app.use(express.static(path.join(__dirname, "./client/public")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/public/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


app.use(cookieParser())
app.listen(8000, () => {
    console.log("port is running and successful");
})

const DB = process.env.MONGO_URL;

// middleware -> if u r only loged in u can access that 
// const middleware = (req,res,next) => {
//     console.log("middleware");
//     next();
// }
//middleware();


// app.get("/", (req,res) => {
//     res.send("this is home page")
// })
// app.get("/about",middlew (req,res) => {
//     res.send("this is about page")
// })
app.get("/contact", (req,res) => {
    //res.cookie("test",'niz');
    res.send("this is contact page")
})