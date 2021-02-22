var express = require('express');
var router = express.Router();

/* GET coole page. */
router.get('/', function(req, res, next) {
  res.render('cool', { title: 'cools' });
});

module.exports = router;
