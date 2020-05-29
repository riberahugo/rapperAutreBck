var express = require('express');
var fs = require('fs');
var fs_extra = require("fs-extra");
var rimraf = require('rimraf');
var router = express.Router();
var db = require('../db');
var shell = require('shelljs')
var bodyParser = require('body-parser');

const nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var Mail = function(mail) {

};

Mail.createMail = function (email,key, result) {    

    var mailOptions = {
        from: "riberahugo13@gmail.com",
        to: email,
        subject: "Confirmation d'abonnement",
        //text: req.body.message,
        // html: '<b>' + req.body.message + '</b>'
        html:
                '<div style="text-align: center;width: 600px;height: 335px;margin: auto;padding-top: 25px;">' +
                '<img style="width: 400px; height: 150px; object-fit: contain;" src="https://i.ibb.co/kJq5HwF/rapper-Autre.jpg" /><br><br>' +
                '<span style="font-size : 15px;">Bienvenue nouvel apprenant! </span>' +
                '<span style="font-size : 15px;">Vous avez été souscrit à l\'abonnement débutant.</span><br><br>' +
                '<span style="font-size : 15px;">Veuillez cliquer sur le bouton ci dessous afin d\'activer votre compte.</span><br><br>' +
                '<div style="background-color: #D32A23;width: 20%;margin: auto;height: 10%;border-radius: 10px;">'+
                '<div style="padding-top: 6px;">' +
                    '<a style="color:white;text-decoration: none" href=' + `http://localhost:4200/register/${key}` + '>Activation</a>' +
                '</div>' +
                '</div>' +
                '</div>'
    };    
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "riberahugo13@gmail.com",
            pass: "Fucktoutestpris13!"
        }
    });

    transporter.sendMail(mailOptions, function(err, info) {

        if (err) {
            console.log(err)
        }
        else {
            return res.json({ message: 'Mail sent' });
        }
    });

};
// router.post('/invitation_compte', VerifyToken, function(req, res, next) {

//     //getKeyByMail

//     var sql = `SELECT * FROM user_pending WHERE email = '${req.body.email}'`;
    
//     db.query(sql, function(err, row, fields) {
//     if(err) {
//         return res.status(500).send({ error: 'Something failed!' })
//     }

//     var key = "https://hup-learning.com/#/register/" + row[0].key_register

//     var mailOptions = {
//         from: "noreply@agenceformatio.com",
//         to: req.body.email,
//         subject: "Invitation de création de compte Formatio",
//         //text: req.body.message,
//         // html: '<b>' + req.body.message + '</b>'
//         html:
//               '<div style="text-align: center;width: 600px;height: 335px;margin: auto;padding-top: 25px;">' +
//               '<img style="width: 400px; height: 150px; object-fit: contain;" src="https://i.ibb.co/SR1tbVs/formatio.png" /><br><br>' +
//               '<span style="font-size : 15px;">Bonjour </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.last_name}</span>` + ' ' + `<span style="font-size : 15px;font-weight: bold;">${req.body.first_name}</span>!<br><br>` +
//               '<span style="font-size : 15px;">Vous avez été ajouté en tant qu\'</span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.role}</span>` + '<span style="font-size : 15px;"> au sein de l\'agence Formatio.</span><br><br>' +
//               '<span style="font-size : 15px;">Veuillez cliquer sur le bouton ci dessous afin d\'activer votre compte.</span><br><br>' +
//               '<div style="background-color: #2b55a1;width: 20%;margin: auto;height: 10%;border-radius: 10px;">'+
//                 '<div style="padding-top: 6px;">' +
//                     '<a style="color:white;text-decoration: none" href=' + `${key}` + '>Activation</a>' +
//                 '</div>' +
//               '</div>' +
//               '</div>'
//     };
       
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: "noreply@agenceformatio.com",
//             pass: "123456789"
//             // xoauth2: xoauth2.createXOAuth2Generator({
//                 // user: 'riberahugo13@gmail.com',
//                 // clientId: '712420522243-m4ckji3b4c0ou1k0uorqge9sakvt7cuv.apps.googleusercontent.com',
//                 // clientSecret: 'xJYuJTBFTM0nLeAmu6CEaxQP',
//                 // refreshToken: '{refresh-token}',
//                 // accessToken: '{cached access token}'
//             // })
//         }
//     });
      
//     transporter.sendMail(mailOptions, function(err, info) {

//         if (err) {
//             console.log(err)
//         }
//         else {
//             return res.json({ message: 'Mail sent' });
//         }
//       });
//     });
   
//     //end

// });

// router.post('/invitation_group', VerifyToken, function(req, res, next) {

//     var key = "https://hup-learning.com/#/" 

//     var mailOptions = {
//         from: "noreply@agenceformatio.com",
//         to: req.body.email,
//         subject: "Invitation dans un groupe Formatio",
//         //text: req.body.message,
//         // html: '<b>' + req.body.message + '</b>'
//         html:
//               '<div style="text-align: center;width: 600px;height: 335px;margin: auto;padding-top: 25px;">' +
//               '<img style="width: 400px; height: 150px; object-fit: contain;" src="https://i.ibb.co/SR1tbVs/formatio.png" /><br><br>' +
//               '<span style="font-size : 15px;">Bonjour </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.last_name}</span>` + ' ' + `<span style="font-size : 15px;font-weight: bold;">${req.body.first_name}!</span><br><br>` +
//               '<span style="font-size : 15px;">Vous avez été ajouté dans le groupe </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.groupName}</span>` + '<span style="font-size : 15px;"> au sein de l\'agence Formatio.</span><br><br>' +
//               '<span style="font-size : 15px;">Veuillez cliquer sur le bouton ci dessous afin de rejoindre ce groupe.</span><br><br>' +
//               '<div style="background-color: #2b55a1;width: 20%;margin: auto;height: 10%;border-radius: 10px;">'+
//                 '<div style="padding-top: 6px;">' +
//                     '<a style="color:white;text-decoration: none" href=' + `${key}` + '>Rejoindre</a>' +
//                 '</div>' +
//               '</div>' +
//               '</div>'
//     };
       
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "noreply@agenceformatio.com",
//             pass: "123456789"
//             // xoauth2: xoauth2.createXOAuth2Generator({
//                 // user: 'riberahugo13@gmail.com',
//                 // clientId: '712420522243-m4ckji3b4c0ou1k0uorqge9sakvt7cuv.apps.googleusercontent.com',
//                 // clientSecret: 'xJYuJTBFTM0nLeAmu6CEaxQP',
//                 // refreshToken: '{refresh-token}',
//                 // accessToken: '{cached access token}'
//             // })
//         }
//     });
      
//     transporter.sendMail(mailOptions, function(err, info) {

//         if (err) {
//             console.log(err)
//         }
//         else {
//             return res.json({ message: 'Mail sent' });
//         }
//       });
// });

// router.post('/invitation_session', VerifyToken, function(req, res, next) {

//     var key = "https://hup-learning.com/#/" 

//     var mailOptions = {
//         from: "noreply@agenceformatio.com",
//         to: req.body.email,
//         subject: "Invitation dans une session Formatio",
//         //text: req.body.message,
//         // html: '<b>' + req.body.message + '</b>'
//         html:
//               '<div style="text-align: center;width: 600px;height: 355px;margin: auto;padding-top: 25px;">' +
//               '<img style="width: 400px; height: 150px; object-fit: contain;" src="https://i.ibb.co/SR1tbVs/formatio.png" /><br><br>' +
//               '<span style="font-size : 15px;">Bonjour </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.last_name}</span>` + ' ' + `<span style="font-size : 15px;font-weight: bold;">${req.body.first_name}!</span><br><br>` +
//               '<span style="font-size : 15px;">Vous avez été ajouté dans la session nommée </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.session_name}</span>` + 
//               '<span style="font-size : 15px;"> qui s\'éffectuera du </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.session_start}</span>` + '<span style="font-size : 15px;"> au </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.session_end}</span>` + '<span style="font-size : 15px;"> au sein de l\'agence Formatio.</span><br><br>' +
//               '<span style="font-size : 15px;">Veuillez cliquer sur le bouton ci dessous afin de rejoindre cette session.</span><br><br>' +
//               '<div style="background-color: #2b55a1;width: 20%;margin: auto;height: 10%;border-radius: 10px;">'+
//                 '<div style="padding-top: 6px;">' +
//                     '<a style="color:white;text-decoration: none" href=' + `${key}` + '>Rejoindre</a>' +
//                 '</div>' +
//               '</div>' +
//               '</div>'
//     };
       
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "noreply@agenceformatio.com",
//             pass: "123456789"
//             // xoauth2: xoauth2.createXOAuth2Generator({
//                 // user: 'riberahugo13@gmail.com',
//                 // clientId: '712420522243-m4ckji3b4c0ou1k0uorqge9sakvt7cuv.apps.googleusercontent.com',
//                 // clientSecret: 'xJYuJTBFTM0nLeAmu6CEaxQP',
//                 // refreshToken: '{refresh-token}',
//                 // accessToken: '{cached access token}'
//             // })
//         }
//     });
      
//     transporter.sendMail(mailOptions, function(err, info) {

//         if (err) {
//             console.log(err)
//         }
//         else {
//             return res.json({ message: 'Mail sent' });
//         }
//       });
// });


// router.post('/relance_mail', VerifyToken, function(req, res, next) {
//     var userId = req.userId;

//     var sql = `SELECT id, email, first_name, last_name FROM users WHERE id = '${userId}'`;

//     var sql1 = `UPDATE session_user SET finish_in_time = 1 WHERE id =  '${req.body.id}'`
//     var key = "https://hup-learning.com/#/" 


//     temps_restant = Number(req.body.time_spend);
//     var h = Math.floor(temps_restant / 3600);
//     var m = Math.floor(temps_restant % 3600 / 60);
//     var s = Math.floor(temps_restant % 3600 % 60);
//     var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " h ") : "";
//     var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
//     var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
//     temps_restant = hDisplay + mDisplay + sDisplay; 

//     db.query(sql, function(err, row, fields) {
//         if(err) {
//             return res.status(500).send({ error: 'Something failed!' })
//         }
//          var mailOptions = {
//              from: "noreply@agenceformatio.com",
//              to: row[0].email,
//              subject: "Relance temps de formation",
//              //text: req.body.message,
//              // html: '<b>' + req.body.message + '</b>'
//              html:
//                    '<div style="text-align: center;width: 600px;height: 500px;margin: auto;padding-top: 25px;">' +
//                    '<img style="width: 400px; height: 150px; object-fit: contain;" src="https://i.ibb.co/SR1tbVs/formatio.png" /><br><br>' +
//                    '<span style="font-size : 15px;">Bonjour </span>' + `<span style="font-size : 15px;font-weight: bold;">${row[0].last_name}</span>` + ' ' + `<span style="font-size : 15px;font-weight: bold;">${row[0].first_name}</span>!<br><br>` +
//                    '<span style="font-size : 15px;">Vous avez fini la formation </span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.title}</span>` + '<span style="font-size : 15px;"> au sein de l\'agence Formatio, félécitations à vous.</span><br><br>' +
//                    '<span style="font-size : 15px;">Cependant il vous reste du temps de formations à valider: </span>'+ `<span style="font-size : 15px;font-weight: bold;">${temps_restant}</span><br><br>` +
//                    '<span style="font-size : 15px;">Veuillez cliquer sur le bouton ci-dessous afin de compléter votre formation.</span><br><br>' +
//                    '<span style="font-size : 15px;">Vous avez jusqu\'au pour valider votre formation</span>' + `<span style="font-size : 15px;font-weight: bold;">${req.body.end_date}</span> <br><br>`+
//                    '<div style="background-color: #2b55a1;width: 20%;margin: auto; height: 35px; border-radius: 10px; font-size: 1.2em;padding: 5px;>'+
//                      '<div style="padding-top: 6px;">' +
//                          '<a style="color:white;text-decoration: none" href=' + `${key}` + '>Accéder au site</a>' +
//                      '</div>' +
//                      '</div>' +
//                    '</div>'
//          };
//          db.query(sql1, function(err, row, fields) {
//             if(err) {
//                 return res.status(500).send({ error: 'Something failed!' })
//             }
//          });
           
//          var transporter = nodemailer.createTransport({
//              service: 'gmail',
//              host: 'smtp.gmail.com',
//              port: 465,
//              secure: true,
//              auth: {
//                  user: "noreply@agenceformatio.com",
//                  pass: "123456789"
//              }
//          });

//          transporter.sendMail(mailOptions, function(err, info) {

//              if (err) {
//                  console.log(err)
//              }
//              else {
//                  return res.json({ message: 'Mail sent' });
//              }
//            });
//     });
   
// });


module.exports = Mail;