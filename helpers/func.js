const cloudinary = require("../config/cloudinary");
const { FOLDER } = require("../config/common");

const WORK_DIR = "uploads/";
const TIME_OUT = 60000;
const WAIT_UNTIL = "networkidle2";
const FULL_PAGE = false;
const SIZE_PAGE = "a4";

const uploadCloudDinary = (
  { path },
  callbackSuccess = () => {},
  callbackFailed = () => {}
) => {
  const uniqueFilename = new Date().toISOString();
  
  cloudinary.uploader.upload(
    path,
    { public_id: `${FOLDER}/${uniqueFilename}`, tags: `${FOLDER}` }, // directory and tags are optional
    function (err, image) {
      if (err) return callbackFailed(err);
      console.log("file uploaded to Cloudinary");
      // remove file from server
      const fs = require("fs");
      fs.unlinkSync(path);
      // return image details
      callbackSuccess(image);
    }
  );
};

const websiteToImage = async (
  url,
  {
    page,
    width,
    height,
    type,
    waitForSelector,
    deviceScaleFactor,
    waitUntil = WAIT_UNTIL,
    timeout = TIME_OUT,
    fullPage,
    format = SIZE_PAGE,
    ...opts
  }
) => {
  const options = {
    waitUntil,
    timeout,
    deviceScaleFactor,
    ...opts,
  };
  await page.setViewport({ width, height });
  await page.goto(url, options);

  if (waitForSelector) await page.waitForSelector(waitForSelector);

  const path = `${WORK_DIR}capture.${type}`;

  await page.screenshot({
    path,
    fullPage,
    type,
  });
  return { localFile: path };
};

const websiteToPDF = async (
  url,
  {
    page,
    width,
    height,
    waitForSelector,
    deviceScaleFactor,
    waitUntil = WAIT_UNTIL,
    timeout = TIME_OUT,
    printBackground = false,
    fullPage,
    format = SIZE_PAGE,
    ...opts
  }
) => {
  const options = {
    waitUntil,
    timeout,
    deviceScaleFactor,
    ...opts,
  };
  await page.goto(url, options);
  if (waitForSelector) await page.waitForSelector(waitForSelector);
  const path = `${WORK_DIR}capture.pdf`;

  const pdfFile = await page.pdf({
    path,
    width,
    height,
    fullPage,
    format,
    printBackground,
  });
  return { localFile: path, pdfFile };
};

module.exports = {
  uploadCloudDinary,
  websiteToImage,
  websiteToPDF,
};
