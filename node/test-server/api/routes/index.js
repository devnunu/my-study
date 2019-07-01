var express = require('express');
var router = express.Router();

var test = {
  result_code: 1,
  result_message: 'success',
  data: {
    title: 'test',
    description: 'test code',
  },
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(test).end();
});

module.exports = router;
