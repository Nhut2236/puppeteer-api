const express = require("express");
const router = express();

const multer = require("multer");

const { uploadCloudDinary } = require("../helpers/func");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

router.post("/upload", (req, res) => {
  const upload = multer({ storage }).single("file");
  upload(req, res, function (err) {
    if (err) {
      return res.send(err);
    }
    console.log("file uploaded to server");
    console.log(req.file);

    const path = req.file.path;
    return uploadCloudDinary(
      { path },
      (data) => {
        return res.json(data);
      },
      (err) => {
        return res.send(err);
      }
    );
  });
});

module.exports = router;
