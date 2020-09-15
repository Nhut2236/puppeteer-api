const express = require("express");
const puppeteer = require("puppeteer");
const fs = require('fs');
const e = require("express");
const router = express();


const openBrowser = async () => {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: false,
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

router.post('/autoTest', async (req, res) => {
    const url = req.body.url;
    const { browser, page } = await openBrowser();
    await page.goto(url);
    //await page.waitFor(3000);
    const usernameInput = await page.$("#username");
    await page.evaluate(usernameInput => { usernameInput.value = "Nhutvm"; }, usernameInput);
    const passwordInput = await page.$("#password");
    await page.evaluate(passwordInput => { passwordInput.value = "123"; }, passwordInput);
    //await page.waitFor(3000);
    await page.click("#login");
    // await page.waitFor(3000);
    await closeBrowser({ page, browser});
    res.status(200).json({message: "insert the value automatically in input field"});
});

module.exports = router;

