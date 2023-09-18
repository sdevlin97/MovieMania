/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const env = require("dotenv");
const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.post("/test", async (req, res) => {
    functions.logger.info("A request has been made");
    res.send("Hello from Firebase functions!")
});

// app.post("/processMovieData", async (req, res) => {
//     try {
//         let moviesList = [];
//         // Get the list of movies
//         let movieResponse = await axios({
//             url: 'https://moviesdatabase.p.rapidapi.com/titles',
//             method: "POST",
//             headers: {
//                 "X-RapidAPI-Key": "1e582ff4f5msha23ff115a1807a1p105fffjsn14c35c5efc71",
//                 "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
//             },
//             data: "limit 20; info base_info;"
//         })
//             .then((response) => {
//                 moviesList = response.data;
//                 functions.logger.log("In the backend, in processMovieData, we have retrieved the movie data: ", moviesList);
//                 let convertedMoviesList = [];
//                 // process the movies data into an object that only has the data we need
//                 for (let i = 0; i < response.data.length; i++) {
//                     const convertedMovie = {
//                         titleText: response.data[i].titleText,
//                         aggregateRating: response.data[i].ratingsSummary.aggregateRating,
//                         voteCount: response.data[i].ratingsSummary.voteCount,
//                         primaryImage: response.data[i].primaryImage.url,
//                         genres: [generateGenreList(response.data[i].genres.genres)]
//                     };
//                     convertedMoviesList.push(convertedMovie);
//                 }
//                 res.status(200).send(convertedMoviesList);
//             })
//             .catch((err) => {
//                 functions.logger.error("Error looping through movies on the backend:", err);
//                 res.status(404).send(err);
//             });
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// function generateGenreList(genres) {
//     if (genres != null) {
//         functions.logger.debug("the genres array is equal to: ", genres);
//         return genres;
//     } else {
//         functions.logger.debug("the genres array is empty");
//         return -1;
//     }
// }

exports.app = functions.https.onRequest(app);