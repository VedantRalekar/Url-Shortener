const jwt = require("jsonwebtoken")
const userModel = require("../models/user")


module.exports = async function(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.render("login");
    }
   try {
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({email:decoded.email}).select("-password")

        if(!user){
            return res.render("login"); 
        }

        req.user = user;
        next(); 

   } catch(error){

    console.log("Something went's wrong..", error.message);
    return res.render("login");
   }
}