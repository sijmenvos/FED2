var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/sjaak', function(req, res) {
  res.send('respond with a Sjaak repsonse');
});

module.exports = router;
