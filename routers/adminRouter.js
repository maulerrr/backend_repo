const {Router} = require("express");
const router = new Router();
const controller = require("../controllers/adminController")
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const path = require("path");

module.exports = router
    .get('/admin', (req,res) => res.render(path.resolve("pages/admin.ejs")))
    .get('/getUsers', controller.getUsers)
    .post('/deleteUser', controller.delete)
    .post('/updateUser', controller.update)
    .post('/createUser', controller.registration);
