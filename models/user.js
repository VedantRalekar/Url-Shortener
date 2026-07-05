const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        minLength: 3,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    }
},{timestamps:true})


module.exports = mongoose.model("user",userSchema);