const express = require("express");
const path = require("path")
const router = express.Router();
const ejs = require('ejs')

router
    .route("/")
    .get((req, res) => res.render(path.resolve("pages/accessed/index.ejs")))
    .post((req, res) => res.render(path.resolve("pages/accessed/index.ejs")));
module.exports = router;

router
    .route("/index_accessed")
    .get((req, res) => res.render(path.resolve("pages/accessed/index.ejs")))
    .post((req, res) => res.render(path.resolve("pages/accessed/index.ejs")));
module.exports = router;