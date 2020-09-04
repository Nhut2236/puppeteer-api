require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const Index = require("./controllers/index");
const Upload = require("./controllers/upload");
const Resize = require("./controllers/resize");
const Capture = require("./controllers/capture");
const Snapshot = require("./controllers/snapshot");
const Pdf = require("./controllers/pdf");
const Collect = require("./controllers/collect");
const AutoTest = require("./controllers/autoTest");

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors("*"));

app.use(Index);
app.use(Upload);
app.use(Resize);
app.use(Capture);
app.use(Snapshot);
app.use(Pdf);
app.use(Collect);
app.use(AutoTest);

app.listen(port, () => {
  console.log("Connnecting: " + port);
});
