const express = require("express");
const fs = require('fs');
const router = express();
const NOT_EXIST = "file doesn't exist";
const path = require('path');

router.get("/pdf", async (req, res) => {
    let urlPdf = path.join(__dirname+"\\..\\uploads\\capture.pdf");
    try{
        var data =fs.readFileSync(urlPdf);
        res.contentType("application/pdf");
        res.send(data);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(NOT_EXIST);
    }
    res.end();
});

module.exports = router;
