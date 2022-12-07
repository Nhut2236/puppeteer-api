require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const Index = require("./controllers/index");
const Crawler = require("./controllers/crawler");

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors("*"));

app.use(Index);
app.use(Crawler);

app.listen(port, () => {
  console.log("Connnecting: " + port);
});
