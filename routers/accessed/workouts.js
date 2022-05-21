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

let daily9 = [];

axios.request(options).then(function (response) {
    const allExercises = response.data

    for (let index = 0; index < 9; index++) {
        daily9[index] = allExercises[Math.floor(Math.random()*1327)];
    }
    daily9.forEach(exerc =>{
        console.log(exerc);
    })
}).catch(function (error) {
    console.error(error);
});



router
    .route("/cardio_accessed")
    .get((req, res) => {
        res.render(path.resolve("pages/accessed/workout pages/cardio.ejs"), {
            exerciseName: daily9[0].name,
            gif: daily9[0].gifUrl,
            bodyPart: daily9[0].bodyPart,
            equipment: daily9[0].equipment,
            target: daily9[0].target,

            exerciseName2: daily9[1].name,
            gif2: daily9[1].gifUrl,
            bodyPart2: daily9[1].bodyPart,
            equipment2: daily9[1].equipment,
            target2: daily9[1].target,

            exerciseName3: daily9[2].name,
            gif3: daily9[2].gifUrl,
            bodyPart3: daily9[2].bodyPart,
            equipment3: daily9[2].equipment,
            target3: daily9[2].target
        })
    })
module.exports = router;

router
    .route("/massgain_accessed")
    .get((req, res) => {
            res.render(path.resolve("pages/accessed/workout pages/massgain.ejs"), {
                exerciseName4: daily9[3].name,
                gif4: daily9[3].gifUrl,
                bodyPart4: daily9[3].bodyPart,
                equipment4: daily9[3].equipment,
                target4: daily9[3].target,

                exerciseName5: daily9[4].name,
                gif5: daily9[4].gifUrl,
                bodyPart5: daily9[4].bodyPart,
                equipment5: daily9[4].equipment,
                target5: daily9[4].target,

                exerciseName6: daily9[5].name,
                gif6: daily9[5].gifUrl,
                bodyPart6: daily9[5].bodyPart,
                equipment6: daily9[5].equipment,
                target6: daily9[5].target
            })
        })
module.exports = router;

router
    .route("/weightloss_accessed")
    .get((req, res) => {
        res.render(path.resolve("pages/accessed/workout pages/weightloss.ejs"), {
            exerciseName7: daily9[6].name,
            gif7: daily9[6].gifUrl,
            bodyPart7: daily9[6].bodyPart,
            equipment7: daily9[6].equipment,
            target7: daily9[6].target,

            exerciseName8: daily9[7].name,
            gif8: daily9[7].gifUrl,
            bodyPart8: daily9[7].bodyPart,
            equipment8: daily9[7].equipment,
            target8: daily9[7].target,

            exerciseName9: daily9[8].name,
            gif9: daily9[8].gifUrl,
            bodyPart9: daily9[8].bodyPart,
            equipment9: daily9[8].equipment,
            target9: daily9[8].target
        })
    })
module.exports = router;