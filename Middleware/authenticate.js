const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

const Authenticate = async (req ,res, next) => {
    try{
      
      const token = await req.cookies.jwtoken;
       console.log(token);
       
      const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);

      console.log("verify tok")
      console.log(verifyToken);
      const rootUser =  await User.findOne ({ id: verifyToken.id,  "tokens.token":token });
      console.log(rootUser);

      if (!rootUser) {
        res.send("not a user");
        console.log("not a user");
      }
       
     
      req.token = token;
      console.log("auth tok");
      console.log(token);
      req.rootUser = rootUser;
      console.log(rootUser);
     // req.userId = rootUser._id;
      //console.log(rootUser._id);
      next();

      
    } catch (err) {
        res.status(401).json({msg: "unauthorized"});

        console.log(err);
    }
    
}

module.exports = Authenticate;