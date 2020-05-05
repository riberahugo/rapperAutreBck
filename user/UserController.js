var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');

var VerifyToken = require('../auth/VerifyToken');
var User = require('./User');

 
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//key validation
router.get('/register/validation/:key', function(req, res, next) {
    User.getUserByKey(req.params.key, function(err, info, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send(info);
        }
      });
});

router.put('/update/:id', function(req, res, next) {

    var body = req.body;

    User.updateUser(req.params.id,body, function(err, info, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send(info);
        }
      });
});


module.exports = router;