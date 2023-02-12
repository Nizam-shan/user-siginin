const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// installed cores and used
const cors = require('cors');
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,            //access-control-allow-credentials:true
//     optionSuccessStatus: 200
// }
// router.use(cors(corsOptions));



// installed cookie parser and used connect
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs"); // password encrypt
const jwt = require("jsonwebtoken"); // to create user jwt token
const fs = require("fs"); // to store image in folder
const Image = require('../models/ImageSchema.js') // image schema 
require("../connection/connection"); 
const authenticate = require("../Middleware/authenticate") // user authentication created and imported here


router.use(cookieParser()); // used cookieparser
const multer = require("multer"); // multer

// storeing image using uulter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // image is going to be stored in this floder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage }) // initialized it

router.get("/", (req, res) => {
    res.send("hlo this router page")
})


// register route for user registration 
router.post("/Register", async (req, res) => {
    const { name, email, phoneNumber, password, confPassword } = req.body; //body the details user have to fill
    if (!name || !email || !phoneNumber || !password || !confPassword) { //if not filled any one
        return res.status(422).json({ msg: "do fill the credentials" });
    }
    try {
        const userExist = await User.findOne({ email: email }); // if user register with same email
        if (userExist) { // if exist err msg
            return res.status(422).json({ msg: "user already exist" });
        } else if (password != confPassword) { // if password not equal to confpassword
            return res.status(400).json({ msg: "provide the password correctly" });
        } else { // else data is stored in db
            const user = await new User({ name, email, phoneNumber, password, confPassword });
            await user.save();
            return res.json({ msg: "added sucessfully" });
        }
    } catch (err) {
        console.log(err);
    }
})


// login route for user login
router.post("/signin", async (req, res) => {

    try {
        const { email, password } = req.body; // password and email is matched from body
        if (!email || !password) { // fill the mandatory field
            res.status(422).json({ msg: "Do fill the credentials" })
        }

        const user = await User.findOne({ email: email }); // find user email = email typed by user 

        if (user) {
            // comparing the password with bcrypt
            const pasMatch = await bcrypt.compare(password, user.password); 
            // comapre the password from bcrypt typed by user
            const token = await user.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, { // token is stored in jwtoken
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!pasMatch) {
                res.status(422).json({ mesg: "invalid credentials password" }); //did not match

            } else {
                res.json({ msg: "user loged in" }); // if match
            }

        } else {
            res.status(422).json({ mesg: "invalid credentials" });// if email did not match
        }

    } catch (err) {
        console.log(err);
    }
})

//logout
router.get("/Logout", (req, res) => {
    console.log("logout page")
    res.clearCookie('jwtoken', { path: 'signin' }) // jwttoken will be created deleteing it
    res.status(200).json({ msg: "loged out" })
})

// home page

router.get('/Home', authenticate, (req, res) => {
    console.log("home us page");
    // res.status(200).json({msg:"success"});
    res.send(req.rootUser); // authenticate page // the user data have been passed here

});


router.post("/upload", upload.single("testimage"), async (req, res) => {
    const saveImage = new Image({
        name: req.body.name,
        image: {
            //    data:fs.readFileSync("uploads/" ),
            ContentType: "image/png"
        },
    });
    saveImage.save().then(() => res.status(200).json({ msg: "saved" })).catch(err => console.log(err));

    console.log("image saved");

    console.log(saveImage);
})

router.get("/images", async (req, res) => {
    try {
        const images = await Image.find();
        res.contentType("image/png");
        res.send(images.map(img => img.data));
    } catch (err) {
        res.status(500).send(err);
    }
});


router.get("/Temp", authenticate, (req, res) => {
    console.log("temp page");
    res.send(req.rootUser);

})


module.exports = router;