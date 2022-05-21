const express = require("express");
const router = express.Router();
const path = require("path");

const axios = require("axios");
const {body} = require("express-validator");


const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': '29c1f531bdmsh920a28432f4321ep11321ajsn99d328b2bc52'
    }
};

let daily3 = [];

axios.request(options).then(function (response) {
    const allExercises = response.data

    for (let index = 0; index < 3; index++) {
        daily3[index] = allExercises[Math.floor(Math.random()*1327)];
    }
    daily3.forEach(exerc =>{
        console.log(exerc);
    })
}).catch(function (error) {
    console.error(error);
});

router
    .route("/cardio")
    .get((req, res) => {
        res.render(path.resolve("workout pages/cardio.ejs"), {
            exerciseName: daily3[0].name,
            gif: daily3[0].gifUrl,
            bodyPart: daily3[0].bodyPart,
            equipment: daily3[0].equipment,
            target: daily3[0].target,

            exerciseName2: daily3[1].name,
            gif2: daily3[1].gifUrl,
            bodyPart2: daily3[1].bodyPart,
            equipment2: daily3[1].equipment,
            target2: daily3[1].target,

            exerciseName3: daily3[2].name,
            gif3: daily3[2].gifUrl,
            bodyPart3: daily3[2].bodyPart,
            equipment3: daily3[2].equipment,
            target3: daily3[2].target
        })
    })
    // .post((req, res) => res.render(path.resolve("workout pages/cardio.ejs")));
    // .post((req, res) => res.render(path.resolve("pages/authfail.ejs")));
module.exports = router;

router
    .route("/massgain")
    // .get((req, res) => res.render(path.resolve("workout pages/massgain.ejs")))
    .get((req, res) => res.render(path.resolve("pages/authfail.ejs")))
    // .post((req, res) => res.render(path.resolve("workout pages/massgain.ejs")));
module.exports = router;

router
    .route("/weightloss")
    // .get((req, res) => res.render(path.resolve("workout pages/weightloss.ejs")))
    .get((req, res) => res.render(path.resolve("pages/authfail.ejs")))
    // .post((req, res) => res.render(path.resolve("workout pages/weightloss.ejs")));
module.exports = router;