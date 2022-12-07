const express = require("express");
const { VERSION } = require("../config/common");
const router = express();

router.get("/", (req, res) => {
  res.send(`Welcome service crawler ${VERSION}:<br/>
      *crawler-data: /collect <br/>
    `);
});

module.exports = router;
