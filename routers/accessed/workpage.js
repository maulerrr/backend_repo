const express = require("express");
const router = express.Router();
const path = require("path");
const accessMid = require('../../middleware/access')

router
    .route("/workpage_accessed")
    .get(accessMid, (req, res) => res.render(path.resolve("pages/accessed/workpage.ejs")))
module.exports = router;