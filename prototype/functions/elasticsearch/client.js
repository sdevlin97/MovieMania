const { Client } = require('@elastic/elasticsearch');
const config = require('./elastic.config.json');
const functions = require("firebase-functions");

//const elasticConfig = config.get('elastic');

const client = new Client({
  cloud: {
    id: "MovieMania:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbzo0NDMkMzQ0MmU2ZDEzZWEzNGNhOGI3NTcwZDc1MTFkMTRhYWYkNmQwODQ2YTc4NWRlNDE3NzliOThhZjFiYmQ3NTc4ODE=",
  },
  auth: {
    apiKey: "cm5xQnk0c0JQZENnR2lYbDQzaWo6dE5LWUt2eHFRajJpSTBuXy1OalR3dw=="
  }
});

/*
client.ping()
  .then(response => functions.logger.error("You are connected to Elasticsearch!"))
  .catch(error => functions.logger.error("Elasticsearch is not connected."))
*/

module.exports = client; 