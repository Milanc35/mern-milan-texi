var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express REST API');
});

// router.route('/').get((req, res) => {
//   res.send('Express REST API');
// });
module.exports = router;
