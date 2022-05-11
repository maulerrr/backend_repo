const express = require("express");
const router = express.Router();
const path = require("path")

let recipesOffer = [];

const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://edamam-recipe-search.p.rapidapi.com/search',
    params: {q: 'chicken'},
    headers: {
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com',
        'X-RapidAPI-Key': '29c1f531bdmsh920a28432f4321ep11321ajsn99d328b2bc52'
    }
};

axios.request(options).then(function (response) {
    let recipes = response.data;
    for (let i = 0; i < 9; i++) {
        recipesOffer = recipes.filter(()=>{
            //not completed the idea
        })
    }
}).catch(function (error) {
    console.error(error);
});

router
    .route("/about")
    .get((req, res) => res.render(path.resolve("pages/nutrition.ejs")))
    .post((req, res) => res.render(path.resolve("pages/nutrition.ejs")));
module.exports = router;