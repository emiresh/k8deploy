var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT4090 – Cloud Computing - IT18116052' });
});

module.exports = router;
