const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/url-shortner";

mongoose
        .connect(MONGO_URL)
        .then(function(){
            console.log("MongoDB Connected..");
        })
        .catch(function(error){
            console.log(error.message);
        });

module.exports = mongoose.connection