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
const fetch = require('node-fetch');

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

app.get("/popularMovies", async (req, res) => {
  let moviesList = [];

  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  fetch(url, options)
    .then((response) => {
        let data = response.json()
        return data;
    })
    .then((json) => res.status(200).send(json))
    .catch((err) => {
      functions.logger.error("error:" + err);
    });
});

exports.app = functions.https.onRequest(app);