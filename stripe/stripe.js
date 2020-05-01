var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// var Course = require('../courses/Course');

// var price;

// const stripe = require('stripe')('sk_test_dn1JDGQuqnnql3fTAk469Pnj00MOIs38kS');

// router.post('/', VerifyToken, function(req, res, next) {

//     Course.getCourseById(req.body.price, function(err, group) {

//     if (err) {
//         return res.status(500).send({ error: 'Something failed!' })
//     }
//     else {

//         if(group[0].reduction == 0){
//             this.price = group[0].prix * 100
//         }
//         else{
//             this.price = group[0].prix - (group[0].prix * group[0].reduction)/100
//             this.price = this.price * 100
//         }

//         stripe.charges.create(
//             {
//               amount: this.price,
//               currency: 'eur',
//               source: 'tok_amex',
//               description: 'Paiement d\'une formation LMS',
//             },
//             function(err, charge) {
              
//             }
            
//         );
//         return res.status(200).send(group);
//     }
//     });

// });

module.exports = router;