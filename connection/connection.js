const mongoose = require ("mongoose");


const DB = process.env.MONGO_URL;

 mongoose.connect(DB) .then(()=>{
    console.log(`connection successful`);
}).catch((err) => console.log(`not connected`));

