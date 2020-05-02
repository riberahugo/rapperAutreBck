var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// var Course = require('../courses/Course');

// var price;

const stripe = require('stripe')('sk_test_dn1JDGQuqnnql3fTAk469Pnj00MOIs38kS');

router.post('/', function(req, res, next) {

    var amount = req.body;

    if(amount.type == 'debutant'){
        console.log('paiement pack débutant')
        stripe.charges.create(
            {
                amount: 26000,
                currency: 'eur',
                source: 'tok_amex',
                description: 'Paiement d\'un pack débutant',
            },
            function(err, charge) {
                console.log(charge)
            }
            
        );
    }
    if(amount.type == 'pro'){
        console.log('paiement pack pro')
        stripe.charges.create(
            {
                amount: 20000,
                currency: 'eur',
                source: 'tok_amex',
                description: 'Paiement d\'un pack pro',
            },
            function(err, charge) {
                console.log(charge)
            }
            
        );
    }
});

router.post('/abonnement/:plan', function(req, res, next) {

    var token = req.body;
    var plan = req.params.plan;

    console.log(token)
    console.log(token.email)

    stripe.customers.create(
        {
          source: token.id,
          email: token.email
        //description:'hello'
        },
        function(err, customer) {
            // asynchronously called

            var cancelatDebutant = (Date.now() / 1000) + 13 * 604800 // 13 semaines
            cancelatDebutant = Math.round(cancelatDebutant)

            var cancelatPro = (Date.now() / 1000) + 10 * 604800 // 10 semaines
            cancelatPro = Math.round(cancelatPro)

            if(plan == 'debutant'){

                stripe.subscriptions.create({
                    customer: customer.id,
                    //cancel_at_period_end: true,
                    cancel_at: cancelatDebutant, //nb de sconde dans une semaine
                    items: [
                        {
                            plan: 'plan_HCifskulHJ6uev'
                        }
                    ]
                },
                function(err, subscriptions) {
                    console.log(subscriptions)
                }
                );
            }
            if(plan == 'pro'){

                stripe.subscriptions.create({
                    customer: customer.id,
                    //cancel_at_period_end: true,
                    cancel_at: cancelatPro, //nb de sconde dans une semaine
                    items: [
                        {
                            plan: 'plan_HCifskulHJ6uev'
                        }
                    ]
                },
                function(err, subscriptions) {
                    console.log(subscriptions)
                }
                );
            }

          }
    );
});

module.exports = router;