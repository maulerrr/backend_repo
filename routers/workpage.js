const express = require("express");
const router = express.Router();
const path = require("path");

router
    .route("/workpage")
    .get((req, res) => res.render(path.resolve("pages/workpage.ejs")))
    .post((req, res) => res.render(path.resolve("pages/workpage.ejs")));
module.exports = router;