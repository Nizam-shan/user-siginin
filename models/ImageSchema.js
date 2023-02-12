const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
   name:{
    type:String,
   
   },
    image:
        {
            
           type : String
            //required:true
         },
});

const Image = mongoose.model("IMAGE",ImageSchema);

module.exports = Image;