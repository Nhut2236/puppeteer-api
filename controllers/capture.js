const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs');
const { WIDTH, HEIGHT, JPG, ERR_BAD_REQUREST, ERR_FILE_ERROR, DEVICE_SCALE, PNG, PDF, FULL_PAGE, SIZE_PAGE } = require("../config/common");
const { uploadCloudDinary, websiteToImage, websiteToPDF,} = require("../helpers/func");
const router = express();

const openBrowser = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  return {
    browser,
    page,
  };
};
const closeBrowser = async ({ page, browser }) => {
  await page.close();
  await browser.close();
};

router.post("/capture", async (req, res) => {
  console.log("running capture");
  const url = req.body.url;
  const width = parseInt(req.body.width) || WIDTH;
  const height = parseInt(req.body.height) || HEIGHT;
  const type = req.body.type || JPG;
  const waitForSelector = req.body.waitForSelector;
  const deviceScaleFactor = req.body.deviceScaleFactor || DEVICE_SCALE;
  const fullPage = req.body.fullPage || FULL_PAGE;
  const format = req.body.format || SIZE_PAGE;
  const { browser, page } = await openBrowser();
  let result = "";
  try {
    switch (type) {
      case JPG:
      case PNG:
        result = await websiteToImage(url, {
          page,
          type,
          width,
          height,
          waitForSelector,
          deviceScaleFactor,
          fullPage,
          format
        });
        break;
      case PDF:
        result = await websiteToPDF(url, {
          page,
          width,
          height,
          format,
          waitForSelector,
          deviceScaleFactor,
        });
        break;
      default:
        break;
    }

    await closeBrowser({ browser, page });

    const { localFile } = result;
    if (localFile === "") return res.status(500).send(ERR_FILE_ERROR);
    if (localFile.includes('.pdf')) return res.status(200).send({message: localFile});
    return uploadCloudDinary(
      { path: localFile },
      (data) => {
        console.log("Done capture");
        return res.json(data);
      },
      (err) => {
        return res.send(err);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(ERR_BAD_REQUREST);
    await browser.close();
  }

  res.end();
});

module.exports = router;
