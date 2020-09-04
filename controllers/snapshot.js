const express = require("express");
const router = express();
const puppeteer = require("puppeteer");
const GIFEncoder = require("gif-encoder");
const encoder = new GIFEncoder(800, 600);
const fs = require("fs");
const getPixels = require("get-pixels");
const workDir = "./gifs/";

router.post("/snapshot", async (req, res) => {
  const url = req.body.url;
  const width = parseInt(req.body.width) || 800;
  const height = parseInt(req.body.height) || 600;
  let file = require("fs").createWriteStream("mygif.gif");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir);
  }

  // Setup gif encoder parameters
  encoder.setFrameRate(60);
  encoder.pipe(file);
  encoder.setQuality(100);
  encoder.setDelay(0);
  encoder.writeHeader();
  encoder.setRepeat(0);

  // Helper functions declaration
  function addToGif(images, counter = 0) {
    getPixels(images[counter], function (err, pixels) {
      encoder.addFrame(pixels.data);
      encoder.read();
      if (counter === images.length - 1) {
        encoder.finish();
        cleanUp(images, function (err) {
          if (err) {
            console.log(err);
          } else {
            fs.rmdirSync(workDir);
            console.log("Gif created!");
            res.send("done");
          }
        });
      } else {
        addToGif(images, ++counter);
      }
    });
  }

  function cleanUp(listOfPNGs, callback) {
    let i = listOfPNGs.length;
    listOfPNGs.forEach(function (filepath) {
      fs.unlink(filepath, function (err) {
        i--;
        if (err) {
          callback(err);
          return;
        } else if (i <= 0) {
          callback(null);
        }
      });
    });
  }

  await page.setViewport({ width, height });
  await page.goto(url);

  for (let i = 0; i < 60; i++) {
    await page.screenshot({ path: workDir + i + ".png" });
  }

  await browser.close();

  let listOfPNGs = fs
    .readdirSync(workDir)
    .map((a) => a.substr(0, a.length - 4) + "")
    .sort(function (a, b) {
      return a - b;
    })
    .map((a) => workDir + a.substr(0, a.length) + ".png");

  addToGif(listOfPNGs);
});

module.exports = router;
