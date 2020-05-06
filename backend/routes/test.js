const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
const Driver = require('../Models/DriverModel');

/* GET home page. */
router.route('/').get((req, res) => {
  res.send('Express REST API');
});

router.route('/add/user').get((req, res) => {
    const username = req.query.username;
    const description = req.query.description || null;
    if (!username) {
        res.status(400).send('Error: Please eenter username');
    }
    const newUser = new User({
        username: username,
        description: description
    });
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/driver').get((req, res) => {
    const username = req.query.username;
    const description = req.query.description || null;
    if (!username) {
        res.status(400).send('Error: Please eenter username');
    }
    const newDriver = new Driver({
        username: username,
        description: description
    });
    newDriver.save()
      .then(() => res.json('Driver added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

//router.get('/', function(req, res, next) {
  //res.send('Express REST API');
//});

module.exports = router;
