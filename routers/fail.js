const express = require("express");
const router = express.Router();
const path = require("path")

router
    .route('/fail')
    .get((req, res) => res.render(path.resolve("pages/authfail.ejs")))
module.exports = router;