var express = require('express');
const { getTemplateData } = require('./_utils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('preview', getTemplateData({ title: 'miniprogram-preview' }));
});

module.exports = router;
