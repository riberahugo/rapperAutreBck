var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');
var sql = require('../db');

var VerifyToken = require('../auth/VerifyToken');
var Forma = require('./Forma');

 
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//key validation
router.get('/get_formation_debutant', function(req, result, next) {

    sql.query("SELECT * from pack_debutant where id = ?", 1, function (err, res) {
        if(err) {
            console.log("error: ", err);
            return result.status(500).send();
        }
        else{
            return result.status(200).send(res);
        }
    });   
});

router.get('/get_formation_pro', function(req, result, next) {

    sql.query("SELECT * from pack_pro where id = ?", 1, function (err, res) {
        if(err) {
            console.log("error: ", err);
            return result.status(500).send();
        }
        else{
            console.log(res)
            return result.status(200).send(res);
        }
    });   
});

router.put('/update_item', function(req, res, next) {

    var body = req.body;
    console.log(body)

    Forma.updateItem(body,req.files.pdf, function(err, info, next) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send(info);
        }
      });
});

module.exports = router;