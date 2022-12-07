const express = require("express");
const { VERSION } = require("../config/common");
const router = express();

router.get("/", (req, res) => {
  res.send(`Welcome service crawler ${VERSION}:<br/>`);
});

module.exports = router;
