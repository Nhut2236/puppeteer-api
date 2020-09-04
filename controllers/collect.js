const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs');
const e = require("express");
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

router.post('/collect', async (req, res) => {
    const url = req.body.url;
    const { browser, page } = await openBrowser();
    await page.goto(url);
    // mp3.zing.vn
    const results = await page.evaluate(() => {
      let items = document.querySelectorAll('.title a');
      let itemsArtist = document.querySelectorAll('.artist a');
      let links = [];
      items.forEach((item, index) => {
        links.push({
          title: item.innerText,
          artist: itemsArtist[index].innerHTML,
          link: itemsArtist[index].getAttribute('href')
        })
      });
      return links;
    });
   await closeBrowser({ page, browser});
   if(results && results.length)
    return res.status(200).json(results);
   else
    return res.status(200).json({message: "Nothing to collect"});
   
});

module.exports = router;



