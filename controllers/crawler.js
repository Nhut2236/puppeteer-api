const express = require("express");
const puppeteer = require("puppeteer");
const router = express();
const { Cluster } = require('puppeteer-cluster');

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

router.get('/crawler', async (req, res) => {
    const url = 'http://www.bloodybunnystore.com/en';
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT, // use one browser per worker
      maxConcurrency: 4, // cluster with four workers
    });
    const { browser, page } = await openBrowser();
    await page.goto(url);
    const selector = '.container-special .item-info h3';
    await page.waitForSelector(selector);
    
    // const categories = await getCategories(page);
    const titles = await getTitles(page);
    const prices = await getPrices(page);
    const promotionPrices = await getPromotionPrices(page);
    const images = await getImages(page);
    const urls = await getUrls(page);
    let data = mergeData(titles[0], prices[0], promotionPrices[0], images[0], urls[0]);
    data = await crawlerDetails(page, data);
    await closeBrowser({ page, browser});

    if(data && data.length){
      return res.status(200).json(data);
    }
    else
      return res.status(200).json({message: "Nothing to collect"});
});

const crawlerDetails = async (page, data) => {
    data = [data[0]];
    for await (const details of data) {
      await page.goto(details.url);
      const selector = '.product-description';
      await page.waitForSelector(selector);
      let description = await page.evaluate(selector => {
        let data = [];
        return [...document.querySelectorAll(selector)].map(item => {
          let text = item.textContent.trim();
          if(text)
            data.push(text)
          return data;
        });
      }, selector);

      if (description && description.length)
        details.description = description[0];
    }
    return data;
};

const mergeData = (titles, prices, promotionPrices, images, urls) => {
  let data = [];
    titles.forEach((_, i) => {
      data.push({
        "title": titles[i],
        "price": prices[i],
        // "promotion-price": promotionPrices[i],
        "image": images[i],
        "url": urls[i]
      });
    });
  return data;
};

const getCategories = async (page) => {
  await page.waitForSelector('.container-special .special-cate h2');
  const selector = '.container-special .special-cate h2';
  return await page.evaluate(selector => {
    let data = [];
    return [...document.querySelectorAll(selector)].map(item => {
      let text = item.textContent.trim();
      if(text)
        data.push(text)
      return data;
    });
  }, selector);
};

const getTitles = async (page) => {
  const selector = '.container-special .item-info h3';
  return await page.evaluate(selector => {
    let data = [];
    return [...document.querySelectorAll(selector)].map(item => {
      let text = item.textContent.trim();
      if(text)
        data.push(text)
      return data;
    });
  }, selector);
};

const getPrices = async (page) => {
  const selector = '.container-special .item-info .list-price span';
  return await page.evaluate(selector => {
    let data = [];
    return [...document.querySelectorAll(selector)].map(item => {
      let text = item.textContent.trim();
      if(text)
        data.push(text)
      return data;
    });
  }, selector);
};

const getPromotionPrices = async (page) => {
  const selector = '.container-special .item-info .list-price del';
  return await page.evaluate(selector => {
    let data = [];
    return [...document.querySelectorAll(selector)].map(item => {
      let text = item.textContent.trim();
      if(text)
        data.push(text)
      return data;
    });
  }, selector);
};

const getImages = async (page) => {
  const selector = '.container-special .img-wrapper img';
  return await page.evaluate(selector => {
    let data = [];
    return [...document.querySelectorAll(selector)].map(item => {
      let text = item.getAttribute('src').trim();
      if(text)
        data.push(text)
      return data;
    });
  }, selector);
};

const getUrls = async (page) => {
  const selector = '.container-special .item a';
  return await page.evaluate(selector => {
    let data = [];
    return [...document.querySelectorAll(selector)].map(item => {
      let text = item.getAttribute('href').trim();
      if(text)
        data.push(text)
      return data;
    });
  }, selector);
};

module.exports = router;



