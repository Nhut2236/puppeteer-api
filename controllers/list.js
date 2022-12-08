const express = require("express");
const puppeteer = require("puppeteer");
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

router.get('/products', async (req, res) => {
  const { browser, page } = await openBrowser();

  const products = await getProducts(page);

  await closeBrowser({ page, browser });

  if (products && products.length) {
    return res.status(200).json(products);
  }
  else
    return res.status(200).json({ message: "Nothing to crawl" });
});

const getProducts = async (page) => {
  const url = 'http://www.bloodybunnystore.com/en';
  const selector = '.item';
  await page.goto(url);
  await page.waitForSelector(selector);
  return await page.evaluate(selector => {
    let products = [];
    let items = document.querySelectorAll(selector);
    items.forEach((item) => {
      let title = item.querySelector('h3')?.innerText.trim();
      let url = item.querySelector('a')?.getAttribute('href').trim();
      let price = item.querySelector('.list-price del')?.innerText.replace('฿', '').trim();
      let promotionPrice = item.querySelector('.list-price span')?.innerText.replace('฿', '').trim();     

      if (!price){
        price = promotionPrice;
        promotionPrice = null;
      }
      
      let thumbnail = item.querySelector('.img-wrapper img')?.getAttribute('src').trim();
      let salePercent = item.querySelector('.img-wrapper .label-sale')?.innerText.replace('-', '').replace('%','').trim();
      let id = url.substring(url.indexOf('-') + 1, url.indexOf('-') + 7);
      let categoryId = url.substring(url.indexOf('=') + 1);
      let product = {
        "id": id ? parseInt(id) : 0,
        "title": title,
        "url": url,
        "price": price ? parseFloat(price).toFixed(2) : null,
        "promotion-price": promotionPrice ? parseFloat(promotionPrice).toFixed(2) : null,
        "sale-percent": salePercent ? parseFloat(salePercent).toFixed(2) : null,
        "is-sale": salePercent ? true : false,
        "thumbnail": thumbnail,
        "category_id": categoryId ? parseInt(categoryId) : 0,
      }
      products.push(product)
    });
    return products;
  }, selector);
};

module.exports = router;



