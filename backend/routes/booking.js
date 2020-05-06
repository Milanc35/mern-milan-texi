const Router = require('express').Router();

/* GET home page. */
Router.get('/', function(req, res, next) {
  res.send('Express REST API');
});

module.exports = Router;
