var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');
var User = require('../user/User');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get config file

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  //var id = req.userId

  var sql = `SELECT * FROM users WHERE email='${email}' AND password=MD5('${password}')`;

  db.query(sql, function(err, row, fields) {
    if(err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    if (!row[0]) {
      return res.status(404).send('Email et/ou Mot de passe incorrect.');
    }
    if (row[0]) {
      // create a token
      var token = jwt.sign({ id: row[0].id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      var x = (new Date()).getTimezoneOffset() * 60000; 

      let user_connexion = {
          last_connexion: (new Date(Date.now() - x)).toISOString().slice(0,-1).replace(/-/g, '').replace(/ /g, '').replace(/:/g, '').replace(/T/g, ' ').replace(/\..+/g, '').replace(/ /g, '').toString(),
          //new Date().toISOString().replace(/-/g, '').replace(/ /g, '').replace(/:/g, '').replace(/T/g, ' ').replace(/\..+/g, '').toString(),
          id:row[0].id
      }

      User.updateLastConnexion(user_connexion, function(err, company) {
        if (err) {
            return res.status(500).send({ error: 'Something failed!' })
        }
        else {
            return res.status(200).send({ auth: true, token: token });
        }
      });

      // return the information including token as JSON
      
    
    } else {
      return res.status(401).send({ auth: false, token: null });
    }  

  });
});

router.get('/logout', function(req, res) {
  return res.status(200).send({ auth: false, token: null });
});


router.get('/me', VerifyToken, function(req, res, next) {

  var id = req.userId;
  var sql = `SELECT id, role, first_name, last_name, email, uploaded_image, cover_social, about, private, date, id_company, name_company, telephone FROM users WHERE id='${id}'`;

  db.query(sql, function(err, row, fields) {
    if(err) {
      return res.status(500).send({ error: 'Something failed!' })
    }
    if (!row[0]) {
      return res.status(404).send('Email et/ou Mot de passe incorrect.');
    }
    return res.status(200).send(row[0]);
  });
});

module.exports = router;