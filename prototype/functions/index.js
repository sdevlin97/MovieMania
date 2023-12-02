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
const cors2 = require('cors');
const app = express();
app.use(bodyParser.json());
const fetch = require("node-fetch");
const client = require('./elasticsearch/client');

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

// Made another cors as example project did not have the {origin:true} modifier and wanted to be safe
app.use(cors2());

// Default, no-parameter call to Elasticsearch for the most commonly used tags
// Returns 20 objects of key (tag name) : doc_count (number of times tag was used)
app.get("/fetchDefaultTags", (req, res) => {
  async function sendESRequest() {
    const body = await client.search({
      index: "moviemania_tags_v3",
      body: {
        size: 20,
        aggs: {
          by_tags: {
            terms: {
              field: "tag.keyword",
              size: 20
            }
          }
        }
      }
    });
    res.json(body.aggregations.by_tags.buckets);
  }
  sendESRequest();
});

// Call to Elasticsearch, searches for passed (selected) tags and returns movieids in order of most connections to tags
// Returns 20 objects of key (movieid) : doc_count (number of times movieid was tagged with selected tags)
app.get("/fetchMovieIds", (req, res) => {
  passedTags = req.query.tags;

  async function sendESRequest() {
    const body = await client.search({
      index: "moviemania_tags_v3",
      body: {
        size: 20,
        query: {
          bool: {
            should: [
              {
                match: {
                  tag: passedTags
                }
              }
            ]
          }
        },
        aggs: {
          by_movieid: {
            terms: {
              field: "movieid.keyword",
              size: 20
            }
          }
        }
      }
    });
    res.json(body.aggregations.by_movieid.buckets);
  }
  sendESRequest();
});

// Call to Elasticsearch, searches for passed movieids and returns tags in order of highest use amongst the movieids
// Returns 20 objects of key (tag name) : doc_count (number of times tag was associated with the passed movieids)
app.get("/fetchNewTags", (req, res) => {
  passedMovieIds = req.query.movieids;

  async function sendESRequest() {
    const body = await client.search({
      index: "moviemania_tags_v3",
      body: {
        size: 20,
        query: {
          bool: {
            should: [
              {
                match: {
                  movieid: passedMovieIds
                }
              }
            ]
          }
        },
        aggs: {
          by_tags: {
            terms: {
              field: "tag.keyword",
              size: 20
            }
          }
        }
      }
    });
    res.json(body.aggregations.by_tags.buckets);
  }
  sendESRequest();
});

// Call to Elasticsearch, searches for passed MovieLens movieids and returns movieids for IMDb and TMDb
// Returns 20 objects (we only need _source.tmdbId)
app.get("/fetchElasticMovieInfo", (req, res) => {
  passedMovieIds = req.query.movieids;

  async function sendESRequest() {
    const body = await client.search({
      index: "moviemania_link_v2",
      body: {
        size: 20,
        query: {
          bool: {
            should: [
              {
                match: {
                  ml_movieid: passedMovieIds
                }
              }
            ]
          }
        }
      }
    });
    res.json(body.hits.hits);
  }
  sendESRequest();
});

exports.app = functions.https.onRequest(app);
