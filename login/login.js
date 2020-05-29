var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');

var User = require('../user/User');
var Mail = require('../mail/MailController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/:email', function(req, res, next) {

    
});