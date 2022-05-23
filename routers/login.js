const express = require("express");
const router = express.Router();
const path = require("path")
const controller = require('../controllers/authController')

router
    .route("/login")
    .get((req, res) => res.render(path.resolve("pages/login.ejs")))
    .post(controller.login);
module.exports = router;