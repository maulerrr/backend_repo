const express = require("express");
const router = express.Router();
const path = require("path")

router
    .route("/about")
    .get((req, res) => res.render(path.resolve("pages/about.ejs")))
    .post((req, res) => res.render(path.resolve("pages/about.ejs")));
module.exports = router;