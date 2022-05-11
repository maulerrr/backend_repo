const express = require("express");
const router = express.Router();
const path = require("path")
const ejs = require('ejs')
const bodyparser = require('body-parser')
const authCtrl = require('../controllers/authController')

const {check} = require("express-validator");

router
    .route('/reg')
    .get((req, res) => res.render(path.resolve("pages/reg.ejs")))
    // .post(authCtrl.registration)
module.exports = router;