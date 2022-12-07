require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const index = require("./controllers/index");
const list = require("./controllers/list");
const details = require("./controllers/details");

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors("*"));

app.use(index);
app.use(list);
app.use(details);

app.listen(port, () => {
  console.log("Connnecting: " + port);
});
