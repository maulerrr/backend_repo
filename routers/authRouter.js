const Router = require('express');
const router = new Router();
const controller = require("../controllers/authController")
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router
    .post('/register',[
        check("username", "Validation with name failed, try again").notEmpty(),
        check("email", "Invalid login, Try again!").isEmail(),
        check("password", "Validation with password failed, try again").notEmpty().isLength({min:4}),
    ] ,controller.registration)
    .post("/login", controller.login)
    .get("/users", roleMiddleware(['USER']), controller.getUsers)
module.exports = router;
