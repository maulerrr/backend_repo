const express = require("express");
const path = require("path")
const router = express.Router();
const accessMid = require('../../middleware/access')

router
    .route("/")
    .get(accessMid, (req, res) => res.render(path.resolve("pages/accessed/index.ejs")))
    .post(accessMid, (req, res) => res.render(path.resolve("pages/accessed/index.ejs")));
module.exports = router;

router
    .route("/index_accessed")
    .get(accessMid, (req, res) => res.render(path.resolve("pages/accessed/index.ejs")))
    .post(accessMid, (req, res) => res.render(path.resolve("pages/accessed/index.ejs")));
module.exports = router;