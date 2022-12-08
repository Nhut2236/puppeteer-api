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

router.get(`/product/:id`, async (req, res) => {
  const { browser, page } = await openBrowser();
  const product = await getProductById(page, req);
  await closeBrowser({ page, browser });

  if (product) {
    return res.status(200).json(product);
  }
  else
    return res.status(200).json({ message: "Nothing to crawl" });
});

const getProductById = async (page, req) => {
  let id = req.params.id;
  var categoryId = req.query.category_id;
  
  let url = `http://www.bloodybunnystore.com/en/product/${id}/product-${id}`;
  if (categoryId) url += `?category_id=${categoryId}`;
  
  const selector = '.site-product';
  await page.goto(url);
  await page.waitForSelector(selector);
  let product =  await page.evaluate(selector => {
    let item = document.querySelector(selector);
    let title = item.querySelector('.product-cart-sec h1')?.innerText.trim();
    let promotionPrice = item.querySelector('.wrapper-cart .head-cart .text-danger')?.innerText.replace('฿', '').trim();
    let price = item.querySelector('.wrapper-cart .head-cart del')?.innerText.replace('฿', '').trim();
    
    if (!price){
      price = promotionPrice;
      promotionPrice = null;
    }
    
    let salePercent = item.querySelector('.wrapper-cart .head-cart .label-sale')?.innerText.replace('-', '').replace('%','').trim();
    let thumbnail = item.querySelector('.swiper-wrapper img')?.getAttribute('src').trim();
    let remainingAmount = item.querySelector('.product-action .align-items-end')?.innerText.replace('item(s)','').trim();
    let likes = item.querySelector('.product-top button')?.innerText.trim();

    let descriptions = [];
    item.querySelectorAll('.product-description p').forEach((des) => {
      let desTitle = des.querySelector('strong')?.innerText.trim();
      let desDetails = des.innerText.trim();
      descriptions.push({title: desTitle, details : desDetails});
    });

    let tags = [];
    item.querySelectorAll('.tags-list a').forEach((tag) => {
      let tagName = tag.innerText.trim();
      let tagLink = tag.getAttribute('href').trim();
      tags.push({ name: tagName, url: tagLink });
    });

    let galleryThumbnails = [];
    item.querySelectorAll('.gallery-thumbs img').forEach((thumb) => {
      let url = thumb.getAttribute('src');
      galleryThumbnails.push(url);
    });

    let relatedProducts = [];
    item.querySelectorAll('.recommend-sec .item').forEach((relatedProduct) => {
      let rTitle = relatedProduct.querySelector('h3')?.innerText.trim();
      let rUrl = relatedProduct.querySelector('a')?.getAttribute('href').trim();
      let rPromotionPrice = relatedProduct.querySelector('.list-price span')?.innerText.replace('฿', '').trim();
      let rPrice = relatedProduct.querySelector('.list-price del')?.innerText.replace('฿', '').trim();
      
      if (!rPrice){
        rPrice = rPromotionPrice;
        rPromotionPrice = null;
      }

      let rThumbnail = relatedProduct.querySelector('.img-wrapper img')?.getAttribute('src').trim();
      let rSalePercent = relatedProduct.querySelector('.img-wrapper .label-sale')?.innerText.replace('-', '').replace('%','').trim();
      let rId = rUrl.substring(rUrl.indexOf('-') + 1, rUrl.indexOf('-') + 7);
      let rCategoryId = rUrl.substring(rUrl.indexOf('=') + 1);
      let rProduct = {
        "id": rId ? parseInt(rId) : 0,
        "title": rTitle,
        "url": rUrl,
        "price": rPrice ? parseFloat(rPrice).toFixed(2) : null,
        "promotion-price": rPromotionPrice ? parseFloat(rPromotionPrice).toFixed(2) : null,
        "sale-percent": rSalePercent ? parseFloat(rSalePercent).toFixed(2) : null,
        "is-sale": rSalePercent ? true : false,
        "thumbnail": rThumbnail,
        "category_id": rCategoryId ? parseInt(rCategoryId) : 0,
      }
      relatedProducts.push(rProduct);
    });
    
    let product = {
      "title": title,
      "price": price ? parseFloat(price).toFixed(2) : null,
      "promotion-price": promotionPrice ? parseFloat(promotionPrice).toFixed(2) : null,
      "sale-percent": salePercent ? parseFloat(salePercent).toFixed(2) : null,
      "is-sale": salePercent ? true : false,
      "remaining-amount": remainingAmount ? parseInt(remainingAmount) : 0,
      "thumbnail": thumbnail,
      "likes": likes ? parseInt(likes) : 0,
      "descriptions" : descriptions,
      "tags": tags,
      "gallery-thumbnails": galleryThumbnails,
      "related-products": relatedProducts
    };
    return product;
  }, selector);

  product.id = parseInt(id);
  product.category_id = parseInt(categoryId);
  return product;
};

module.exports = router;



