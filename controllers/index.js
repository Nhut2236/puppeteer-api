const express = require("express");
const { VERSION } = require("../config/common");
const router = express();

router.get("/", (req, res) => {
  res.send(`Welcome service images api version ${VERSION}:<br/>
      *upload: /upload, <br/>
      *resize: /resize?name=abcd&width=100, <br/>
      *capture: body {<br/>
        "url":"https://www.facebook.com/",<br/>
        "type":"png",<br/>
        "width":816,<br/>
        "height":482,<br/>
        "deviceScaleFactor":4
      }
    `);
});

module.exports = router;
