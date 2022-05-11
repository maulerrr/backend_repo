const express = require("express");
const path = require("path")
const router = express.Router();
const ejs = require('ejs')

router
    .route("/")
    .get((req, res) => res.render(path.resolve("pages/index.ejs")))
    .post((req, res) => res.render(path.resolve("pages/index.ejs")));
module.exports = router;

router
    .route("/index")
    .get((req, res) => res.render(path.resolve("pages/index.ejs")))
    .post((req, res) => res.render(path.resolve("pages/index.ejs")));
module.exports = router;