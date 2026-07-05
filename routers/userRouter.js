const express = require("express")
const router = express.Router();

const userModel = require("../models/user");
const authController = require("../controllers/authController");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/login", (req, res)=>{
    return res.render("login");
});
router.get("/signin", (req, res)=>{
    return res.render("signin");
});
module.exports = router;