var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');

var User = require('../user/User');
var Mail = require('../mail/MailController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// var Course = require('../courses/Course');

// var price;

const stripe = require('stripe')('sk_test_dn1JDGQuqnnql3fTAk469Pnj00MOIs38kS');

router.post('/:email', function(req, res, next) {

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

                User.createUser(req.params.email,'debutant',function(err, user) {
                    if (err) {
                        return res.status(500).send({ error: 'Something failed!' })
                    }
                    else {

                        User.getUserById(user,function(err, user_answer) {
                            if (err) {
                                return res.status(500).send({ error: 'Something failed!' })
                            }
                            else {
                                console.log(user_answer)
                                Mail.createMail(req.params.email,user_answer[0].key_register,function(err, user) {
                                    if (err) {
                                        return res.status(500).send({ error: 'Something failed!' })
                                    }
                                    else {
                                        console.log('done.') 
                                    }
                                });
                            }
                        });
                        
                    }
                });
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

                User.createUser(req.params.email,'professionel',function(err, user) {
                    if (err) {
                        return res.status(500).send({ error: 'Something failed!' })
                    }
                    else {

                        User.getUserById(user,function(err, user_answer) {
                            if (err) {
                                return res.status(500).send({ error: 'Something failed!' })
                            }
                            else {
                                console.log(user_answer)
                                Mail.createMail(req.params.email,user_answer[0].key_register,function(err, user) {
                                    if (err) {
                                        return res.status(500).send({ error: 'Something failed!' })
                                    }
                                    else {
                                        console.log('done.') 
                                    }
                                });
                            }
                        });
                        
                    }
                });
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

            var cancelatDebutantMois = (Date.now() / 1000) + 56 * 604800 // 13 mois
            cancelatDebutantMois = Math.round(cancelatDebutantMois)

            var cancelatPro = (Date.now() / 1000) + 10 * 604800 // 10 semaines
            cancelatPro = Math.round(cancelatPro)

            var cancelatProMois = (Date.now() / 1000) + 44 * 604800 // 10 mois
            cancelatProMois = Math.round(cancelatProMois)

            if(plan == 'debutant'){
                console.log('debutant')
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

                    User.createUser(token.email,'debutant',function(err, user) {
                        if (err) {
                            return res.status(500).send({ error: 'Something failed!' })
                        }
                        else {

                            User.getUserById(user,function(err, user_answer) {
                                if (err) {
                                    return res.status(500).send({ error: 'Something failed!' })
                                }
                                else {
                                    console.log(user_answer)
                                    Mail.createMail(token.email,user_answer[0].key_register,function(err, user) {
                                        if (err) {
                                            return res.status(500).send({ error: 'Something failed!' })
                                        }
                                        else {
                                            console.log('done.') 
                                        }
                                    });
                                }
                            });
                            
                        }
                    });
                }
                );
            }
            if(plan == 'debutantMois'){
                console.log('debutantmois')
                stripe.subscriptions.create({
                    customer: customer.id,
                    //cancel_at_period_end: true,
                    cancel_at: cancelatDebutantMois, //nb de sconde dans une mois
                    items: [
                        {
                            plan: 'price_HMWZdZCcUr2vHo'
                        }
                    ]
                },
                function(err, subscriptions) {
                    console.log(subscriptions)

                    User.createUser(token.email,'debutant',function(err, user) {
                        if (err) {
                            return res.status(500).send({ error: 'Something failed!' })
                        }
                        else {

                            User.getUserById(user,function(err, user_answer) {
                                if (err) {
                                    return res.status(500).send({ error: 'Something failed!' })
                                }
                                else {
                                    console.log(user_answer)
                                    Mail.createMail(token.email,user_answer[0].key_register,function(err, user) {
                                        if (err) {
                                            return res.status(500).send({ error: 'Something failed!' })
                                        }
                                        else {
                                            console.log('done.') 
                                        }
                                    });
                                }
                            });
                            
                        }
                    });
                }
                );
            }
            if(plan == 'proMois'){

                stripe.subscriptions.create({
                    customer: customer.id,
                    //cancel_at_period_end: true,
                    cancel_at: cancelatProMois, //nb de sconde dans une mois
                    items: [
                        {
                            plan: 'price_HMWZxhCrnEOZCC'
                        }
                    ]
                },
                function(err, subscriptions) {
                    console.log(subscriptions)

                    User.createUser(token.email,'pro',function(err, user) {
                        if (err) {
                            return res.status(500).send({ error: 'Something failed!' })
                        }
                        else {

                            User.getUserById(user,function(err, user_answer) {
                                if (err) {
                                    return res.status(500).send({ error: 'Something failed!' })
                                }
                                else {
                                    console.log(user_answer)
                                    Mail.createMail(token.email,user_answer[0].key_register,function(err, user) {
                                        if (err) {
                                            return res.status(500).send({ error: 'Something failed!' })
                                        }
                                        else {
                                            console.log('done.') 
                                        }
                                    });
                                }
                            });
                            
                        }
                    });
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
                            plan: 'plan_HDsmiOfwFm8YTb'
                        }
                    ]
                },
                function(err, subscriptions) {
                    console.log(subscriptions)

                    User.createUser(token.email,'professionel',function(err, user) {
                        if (err) {
                            return res.status(500).send({ error: 'Something failed!' })
                        }
                        else {

                            User.getUserById(user,function(err, user_answer) {
                                if (err) {
                                    return res.status(500).send({ error: 'Something failed!' })
                                }
                                else {
                                    console.log(user_answer)
                                    Mail.createMail(token.email,user_answer[0].key_register,function(err, user) {
                                        if (err) {
                                            return res.status(500).send({ error: 'Something failed!' })
                                        }
                                        else {
                                            console.log('done.') 
                                        }
                                    });
                                }
                            });
                            
                        }
                    });
                }
                );
            }

          }
    );
});

module.exports = router;