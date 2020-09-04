const express = require("express");
const router = express();
const cloudinary = require("../config/cloudinary");
const { PNG, FILL, HTTP_STRING, FOLDER } = require("../config/common");

router.get("/resize", async (req, res) => {
  const filename = req.query.name;
  const width = parseInt(req.query.width) || 100;
  let result = await cloudinary.image(`${FOLDER}/${filename}`, {
    format: PNG,
    width,
    crop: FILL,
  });
  const url = `${result.slice(
    result.indexOf(HTTP_STRING),
    result.indexOf(PNG) + PNG.length
  )}`;
  res.writeHead(301, {
    location: url,
    "Access-Control-Allow-Origin": "*",
  });
  res.end();
});

module.exports = router;
