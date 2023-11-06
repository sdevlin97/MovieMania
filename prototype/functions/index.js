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
const fetch = require("node-fetch");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/popularMovies", async (req, res) => {
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
      let data = response.json();
      return data;
    })
    .then((json) => res.status(200).send(json))
    .catch((err) => {
      functions.logger.error("error:" + err);
    });
});

app.get("/top_rated", async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  fetch(url, options)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((json) => res.status(200).send(json))
    .catch((err) => {
      functions.logger.error("error:" + err);
    });
});

app.get("/upcoming", async (req, res) => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  fetch(url, options)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .then((json) => res.status(200).send(json))
    .catch((err) => {
      functions.logger.error("error:" + err);
    });
});

app.get("/movieDetails/:id", async (req, res) => {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.API_KEY,
    },
  };

  fetch(url, options)
    .then((response) => {
      let data = response.json();
      functions.logger.debug("The ID we passed in is: ", id);
      functions.logger.debug("The data for the movie we clicked on is: ", data);
      return data;
    })
    .then((json) => res.status(200).send(json))
    .catch((err) => {
      functions.logger.error("error:" + err);
    });
});

exports.app = functions.https.onRequest(app);
