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

  let items = [
    {
        "id": 876216,
        "url": "http://www.bloodybunnystore.com/en/product/876216/product-876216?category_id=116751"
    },
    {
        "id": 818310,
        "url": "http://www.bloodybunnystore.com/en/product/818310/product-818310?category_id=116751"
    },
    {
        "id": 818312,
        "url": "http://www.bloodybunnystore.com/en/product/818312/product-818312?category_id=116751"
    },
    {
        "id": 689392,
        "url": "http://www.bloodybunnystore.com/en/product/689392/product-689392?category_id=116751"
    },
    {
        "id": 656398,
        "url": "http://www.bloodybunnystore.com/en/product/656398/product-656398?category_id=116751"
    },
    {
        "id": 676369,
        "url": "http://www.bloodybunnystore.com/en/product/676369/product-676369?category_id=116751"
    },
    {
        "id": 676368,
        "url": "http://www.bloodybunnystore.com/en/product/676368/product-676368?category_id=116751"
    },
    {
        "id": 676365,
        "url": "http://www.bloodybunnystore.com/en/product/676365/product-676365?category_id=116751"
    },
    {
        "id": 676363,
        "url": "http://www.bloodybunnystore.com/en/product/676363/product-676363?category_id=116751"
    },
    {
        "id": 696221,
        "url": "http://www.bloodybunnystore.com/en/product/696221/product-696221?category_id=110767"
    },
    {
        "id": 696227,
        "url": "http://www.bloodybunnystore.com/en/product/696227/product-696227?category_id=110767"
    },
    {
        "id": 750386,
        "url": "http://www.bloodybunnystore.com/en/product/750386/product-750386?category_id=110767"
    },
    {
        "id": 750390,
        "url": "http://www.bloodybunnystore.com/en/product/750390/product-750390?category_id=110767"
    },
    {
        "id": 705674,
        "url": "http://www.bloodybunnystore.com/en/product/705674/product-705674?category_id=110767"
    },
    {
        "id": 701676,
        "url": "http://www.bloodybunnystore.com/en/product/701676/product-701676?category_id=110767"
    },
    {
        "id": 741481,
        "url": "http://www.bloodybunnystore.com/en/product/741481/product-741481?category_id=110767"
    },
    {
        "id": 701675,
        "url": "http://www.bloodybunnystore.com/en/product/701675/product-701675?category_id=110767"
    },
    {
        "id": 741471,
        "url": "http://www.bloodybunnystore.com/en/product/741471/product-741471?category_id=110767"
    },
    {
        "id": 633868,
        "url": "http://www.bloodybunnystore.com/en/product/633868/product-633868?category_id=110767"
    },
    {
        "id": 811134,
        "url": "http://www.bloodybunnystore.com/en/product/811134/product-811134?category_id=114001"
    },
    {
        "id": 811132,
        "url": "http://www.bloodybunnystore.com/en/product/811132/product-811132?category_id=114001"
    },
    {
        "id": 638512,
        "url": "http://www.bloodybunnystore.com/en/product/638512/product-638512?category_id=114001"
    },
    {
        "id": 614406,
        "url": "http://www.bloodybunnystore.com/en/product/614406/product-614406?category_id=114001"
    },
    {
        "id": 577143,
        "url": "http://www.bloodybunnystore.com/en/product/577143/product-577143?category_id=114001"
    },
    {
        "id": 593789,
        "url": "http://www.bloodybunnystore.com/en/product/593789/product-593789?category_id=114001"
    },
    {
        "id": 614401,
        "url": "http://www.bloodybunnystore.com/en/product/614401/product-614401?category_id=114001"
    },
    {
        "id": 531860,
        "url": "http://www.bloodybunnystore.com/en/product/531860/product-531860?category_id=114001"
    },
    {
        "id": 822890,
        "url": "http://www.bloodybunnystore.com/en/product/822890/product-822890?category_id=114005"
    },
    {
        "id": 653862,
        "url": "http://www.bloodybunnystore.com/en/product/653862/product-653862?category_id=114005"
    },
    {
        "id": 603252,
        "url": "http://www.bloodybunnystore.com/en/product/603252/product-603252?category_id=114005"
    },
    {
        "id": 796295,
        "url": "http://www.bloodybunnystore.com/en/product/796295/product-796295?category_id=114005"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/551532/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%8B%E0%B8%B2-SackBag-Bloody-Bunny?category_id=114005"
    },
    {
        "id": 649742,
        "url": "http://www.bloodybunnystore.com/en/product/649742/product-649742?category_id=114005"
    },
    {
        "id": 649744,
        "url": "http://www.bloodybunnystore.com/en/product/649744/product-649744?category_id=114005"
    },
    {
        "id": 603246,
        "url": "http://www.bloodybunnystore.com/en/product/603246/product-603246?category_id=114005"
    },
    {
        "id": 612808,
        "url": "http://www.bloodybunnystore.com/en/product/612808/product-612808?category_id=114005"
    },
    {
        "id": 603254,
        "url": "http://www.bloodybunnystore.com/en/product/603254/product-603254?category_id=114005"
    },
    {
        "id": 782715,
        "url": "http://www.bloodybunnystore.com/en/product/782715/product-782715?category_id=114006"
    },
    {
        "id": 648592,
        "url": "http://www.bloodybunnystore.com/en/product/648592/product-648592?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/533168/%E0%B8%95%E0%B8%B8%E0%B9%8A%E0%B8%81%E0%B8%95%E0%B8%B2-%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%A2-Bloody-Bunny-2019?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/533169/%E0%B8%95%E0%B8%B8%E0%B9%8A%E0%B8%81%E0%B8%95%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%A2-Dark-Rabbit-2019?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/500249/%E0%B8%95%E0%B8%B8%E0%B9%8A%E0%B8%81%E0%B8%95%E0%B8%B2%E0%B8%AB%E0%B8%A1%E0%B8%B5-eriousuma14?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/519502/Bunny-hood?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/519501/kuma-hood?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/519503/Dark-rabbit-hood?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/500250/%E0%B8%9E%E0%B8%A7%E0%B8%87%E0%B8%81%E0%B8%B8%E0%B8%8D%E0%B9%81%E0%B8%88%E0%B8%95%E0%B8%B8%E0%B9%8A%E0%B8%81%E0%B8%95%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%A2-Bloody-Bunny?category_id=114006"
    },
    {
        "id": null,
        "url": "http://www.bloodybunnystore.com/en/product/500255/%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%A3%E0%B8%B1%E0%B8%81-inkumu?category_id=114006"
    },
    {
        "id": 923147,
        "url": "http://www.bloodybunnystore.com/en/product/923147/product-923147"
    },
    {
        "id": 923146,
        "url": "http://www.bloodybunnystore.com/en/product/923146/product-923146"
    },
    {
        "id": 923143,
        "url": "http://www.bloodybunnystore.com/en/product/923143/product-923143"
    },
    {
        "id": 911525,
        "url": "http://www.bloodybunnystore.com/en/product/911525/product-911525"
    },
    {
        "id": 923142,
        "url": "http://www.bloodybunnystore.com/en/product/923142/product-923142"
    },
    {
        "id": 911524,
        "url": "http://www.bloodybunnystore.com/en/product/911524/product-911524"
    },
    {
        "id": 911523,
        "url": "http://www.bloodybunnystore.com/en/product/911523/product-911523"
    },
    {
        "id": 911522,
        "url": "http://www.bloodybunnystore.com/en/product/911522/product-911522"
    },
    {
        "id": 887639,
        "url": "http://www.bloodybunnystore.com/en/product/887639/product-887639"
    },
    {
        "id": 887638,
        "url": "http://www.bloodybunnystore.com/en/product/887638/product-887638"
    },
    {
        "id": 887637,
        "url": "http://www.bloodybunnystore.com/en/product/887637/product-887637"
    },
    {
        "id": 887636,
        "url": "http://www.bloodybunnystore.com/en/product/887636/product-887636"
    },
    {
        "id": 883358,
        "url": "http://www.bloodybunnystore.com/en/product/883358/product-883358"
    },
    {
        "id": 883351,
        "url": "http://www.bloodybunnystore.com/en/product/883351/product-883351"
    },
    {
        "id": 880442,
        "url": "http://www.bloodybunnystore.com/en/product/880442/product-880442"
    },
    {
        "id": 880441,
        "url": "http://www.bloodybunnystore.com/en/product/880441/product-880441"
    },
    {
        "id": 876216,
        "url": "http://www.bloodybunnystore.com/en/product/876216/product-876216"
    },
    {
        "id": 860848,
        "url": "http://www.bloodybunnystore.com/en/product/860848/product-860848"
    },
    {
        "id": 843438,
        "url": "http://www.bloodybunnystore.com/en/product/843438/product-843438"
    },
    {
        "id": 843434,
        "url": "http://www.bloodybunnystore.com/en/product/843434/product-843434"
    }
]

  let arrays = [];
  for (let i = 0; i < items.length; i++) {
      let item = await getData(page, items[i].url, items[i].id);
      arrays.push(item);
  }

  return arrays;
};
  
const getData = async(page, url, id) => {
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

  product.id = id;
  return product;
};

module.exports = router;



