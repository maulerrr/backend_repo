const express = require("express");
const router = express.Router();
const path = require("path");

router
    .route("/workpage_accessed")
    .get((req, res) => res.render(path.resolve("pages/accessed/workpage.ejs")))
module.exports = router;