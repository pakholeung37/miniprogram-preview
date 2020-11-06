var express = require('express');
var router = express.Router();
/* GET home page. */
router.use('/preview', require("./preview"))

module.exports = router;
