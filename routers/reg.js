const express = require("express");
const router = express.Router();
const path = require("path")
const controller = require('../controllers/authController')

const {check} = require("express-validator");

router
    .route('/reg')
    .get((req, res) => res.render(path.resolve("pages/reg.ejs")))
    .post(controller.registration);
module.exports = router;