var express = require('express');
var router = express.Router();
var http = require('http');
	// config = require('./config');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Eindopdracht' });
});

/* GET templates */
router.get('/views/*', function(req, res) {
  res.render(req.path.replace('/views/', ''));
});

module.exports = router;
