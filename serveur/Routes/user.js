const express = require("express");

const router = express.Router();
const {registerController , loginController , currentController} = require("../Controllers/user");
const { loginRules, regiterRules, validation } = require("../Middleware/validator");
const isAuth = require("../Middleware/passport");
// router.get("/", (req, res) => {
//     res.send("Welcome")
// });


// register routes 
router.post("/register", regiterRules(),validation,  registerController);
router.post("/login", loginRules(), validation,  loginController);
router.get("/current", isAuth() , currentController);
module.exports = router; 