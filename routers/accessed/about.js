const express = require("express");
const router = express.Router();
const path = require("path")

router
    .route("/about_accessed")
    .get((req, res) => res.render(path.resolve("pages/accessed/about.ejs")))
    .post((req, res) => res.render(path.resolve("pages/accessed/about.ejs")));
module.exports = router;