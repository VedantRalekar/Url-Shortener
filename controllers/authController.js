const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.register = async function(req, res){
    const {fullname, email, password} = req.body;
    try{
      if(!fullname || !email || !password)return res.send("Enter the Details..");
      const user = await userModel.findOne({email});
      if (user) {
        return res.status(400).render("signin", {
            error: "An account with this email already exists. Please login instead."
        });
}
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        fullname, 
        email, 
        password : hashedPassword
      });


      const token = await jwt.sign({id : newUser._id , email : newUser.email}, process.env.JWT_SECRET , {expiresIn : "1h"});

      res.cookie("token",token);
      return res.redirect("/");

    }catch(error){
      return res.send("Error occurred while registering user..");
    }
}

module.exports.login = async function(req, res){
    const {email, password} = req.body;
    try{
        if(!email || !password)return res.send("Enter the Details..");
        const user = await userModel.findOne({email});
        if(!user){
           return res.status(400).render("login", {
            error: "Invalid email or password. Please try again."
        });
        }

        bcrypt.compare(password, user.password, async function(err, result){
            if(result){
               const token = await jwt.sign({id : user._id , email : user.email}, process.env.JWT_SECRET , {expiresIn : "1h"});
               delete user.password;
               res.cookie("token",token); 
               return res.redirect("/");    
          }else{
            return res.status(400).render("login", {
                error: "Invalid email or password. Please try again."
            });
          }

        });

    }catch(error){
        return res.send("Error occurred while logging in user..");
    }
}

module.exports.logout = function(req, res){
    res.clearCookie('token');
    return res.redirect("/user/login");
}
