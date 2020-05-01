var express = require('express');
var router = express.Router();
var db = require('../db')
var bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");
var rand = require("generate-key");

const nodemailer = require("nodemailer");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



// router.get('/', VerifyToken, function(req, res, next) {

//     //cron_res = req.body

//     var sql = `SELECT * FROM cron2`;


//     db.query(sql, function(err, row, fields) {
//         if(err) {
//           return res.status(500).send({ error: 'Something failed!' })
//         }

//         for(i= 0; i < row.length; i++) {
//             row[i].sessions = JSON.parse(row[i].sessions)
//         }

//         var cron_res = row;

        


//     //lecture du cron_result
//     for(let i=0; i<cron_res.length;i++){

//         //check du mail
//         User.checkEmail(cron_res[i].mail, async function(err, user) {
//             if (err) {
//                 return res.status(500).send({ error: 'Something failed!' })
//             }
//             else {

//                 console.log(cron_res[i])

//                 //si l'user existe
//                 if(user.length > 0){
                    
//                     //recuperation des session par la ref
//                     for(let j = 0;j < cron_res[i].sessions.length;j++){

//                         var start = cron_res[i].sessions[j].start_date.replace('/','').replace('/','');;
//                         var end = cron_res[i].sessions[j].end_date.replace('/','').replace('/','');;

//                         console.log(start)
//                         console.log(end)

//                         var motInverse1 = [];
//                         var motInverse2 = [];

//                         for (var a = 0; a < start.length; a++) {
//                             motInverse1[a] = start[a];
//                             //console.log(motInverse1)
//                         };

//                         for (var b = 0; b < end.length; b++) {
//                             motInverse2[b] = end[b];
//                         };

//                         console.log(motInverse1)
//                         console.log(motInverse2)

//                         start = motInverse1[6]+motInverse1[7]+motInverse1[4]+motInverse1[5]+'-'+motInverse1[2]+motInverse1[3]+'-'+motInverse1[0]+motInverse1[1]
//                         end = motInverse2[6]+motInverse2[7]+motInverse2[4]+motInverse2[5]+'-'+motInverse2[2]+motInverse2[3]+'-'+motInverse2[0]+motInverse2[1]

//                         var dateSS = {
//                             start_date: start,
//                             end_date: end
//                         }

//                         Session.getSessionByRef(cron_res[i].sessions[j].reference,dateSS, function(err, session) {
//                             if (err) {
//                                 return res.status(500).send({ error: 'Something failed!' })
//                             }
//                             else {

//                                 //creation de la session_pending
//                                 var session_pending = {
//                                     id_session : session[0].id,
//                                     id_course : session[0].id_course,                    
//                                     array_module : session[0].array_module,
//                                     array_activite : session[0].array_activite,
//                                     array_redo : session[0].array_redo,
//                                     global_time : session[0].global_time,
//                                     time_spend : session[0].global_time,
//                                     format_duration : session[0].format_duration,
//                                     id_user : user[0].id,
//                                     id_company : user[0].id_company,
//                                     type : 'START',
//                                     progression : 0
//                                 }

//                                 SessionUser.createSessionUser(session_pending, function(err, session_pending) {
//                                     if (err) {
//                                         return res.status(500).send({ error: 'Something failed!' })
//                                     }
//                                     else {
                                        
//                                     }
//                                 });

//                             }
//                         });

//                     }
//                     //invitation mail

//                     this.invitationAutoExistUser(cron_res[i], function(err, session_pending) {
//                         if (err) {
//                             return res.status(500).send({ error: 'Something failed!' })
//                         }
//                         else {

//                         }
//                     });

//                 }

//                 //si l'user existe pas
//                 if(user.length == 0){
                    
//                     //creation du model
//                     userAdd = {

//                         last_name: '', 
//                         first_name: '',  
//                         email: cron_res[i].mail,  
//                         password: '', 
//                         role: 'étudiant',
//                         id_company: 1,
//                         date: new Date().toISOString().slice(0,10),                        
//                         key_register: rand.generateKey(),
//                         actif: false

//                     };

//                     await User.createUser(userAdd, async (err, user) => {
//                         if (err) {
//                             return res.status(500).send({ error: 'Something failed!' })
//                         }
//                         else {

//                         console.log(user)    


//                          await User.info(cron_res[i].sessions[0], async (err, dateS) => {  

//                             console.log("salut")

//                             //recuperation du groupe grace a la reference
//                             await Group.getGroupByRef(cron_res[i].sessions[0].reference,dateS, async (err, group) =>{
//                                 if (err) {

//                                     return res.status(500).send({ error: 'Something failed!' })
//                                 }
//                                 else {

//                                     await User.createGroup(group, user, async (err, new_group_user) => {
//                                         console.log("coucou")
//                                         console.log(new_group_user)

//                                         await GroupUser.createGroupUser(new_group_user, async (err, group) => {
//                                             if (err) {
//                                                 return res.status(500).send({ error: 'Something failed!' })
//                                             }
//                                             else {
    
//                                                 for(let j = 0;j < cron_res[i].sessions.length;j++){

//                                                     var start = cron_res[i].sessions[j].start_date.replace('/','').replace('/','');;
//                                                     var end = cron_res[i].sessions[j].end_date.replace('/','').replace('/','');;

//                                                     console.log(start)
//                                                     console.log(end)

//                                                     var motInverse1 = [];
//                                                     var motInverse2 = [];

//                                                     for (var a = 0; a < start.length; a++) {
//                                                         motInverse1[a] = start[a];
//                                                         //console.log(motInverse1)
//                                                     };

//                                                     for (var b = 0; b < end.length ; b++) {
//                                                         motInverse2[b] = end[b];
//                                                     };

//                                                     console.log(motInverse1)
//                                                     console.log(motInverse2)

//                                                     start = motInverse1[6]+motInverse1[7]+motInverse1[4]+motInverse1[5]+'-'+motInverse1[2]+motInverse1[3]+'-'+motInverse1[0]+motInverse1[1]
//                                                     end = motInverse2[6]+motInverse2[7]+motInverse2[4]+motInverse2[5]+'-'+motInverse2[2]+motInverse2[3]+'-'+motInverse2[0]+motInverse2[1]

//                                                     var dateSS = {
//                                                         start_date: start,
//                                                         end_date: end
//                                                     }
    
//                                                     await Session.getSessionByRef(cron_res[i].sessions[j].reference,dateSS, async (err, session) => {
//                                                         if (err) {
//                                                             return res.status(500).send({ error: 'Something failed!' })
//                                                         }
//                                                         else {
                    
//                                                             //creation de la session_pending
//                                                             var session_pending = {
//                                                                 id_session : session[0].id,
//                                                                 id_course : session[0].id_course,                    
//                                                                 array_module : session[0].array_module,
//                                                                 array_activite : session[0].array_activite,
//                                                                 array_redo : session[0].array_redo,
//                                                                 global_time : session[0].global_time,
//                                                                 time_spend : session[0].global_time,
//                                                                 format_duration : session[0].format_duration,
//                                                                 id_user : user,
//                                                                 id_company : 1,
//                                                                 type : 'START',
//                                                                 progression : 0
//                                                             }
                            
//                                                             await SessionUser.createSessionUser(session_pending, function(err, session_pending) {
//                                                                 if (err) {
//                                                                     return res.status(500).send({ error: 'Something failed!' })
//                                                                 }
//                                                                 else {
                                              
//                                                                 }
//                                                             });
                            
//                                                         }
//                                                     });
                            
//                                                 }
                                              
//                                             }
//                                         });

//                                     });

                                   

                                    
//                                 }
//                             });

                            
//                      });
//                     }
//                     });

//                     //invitation nouveaux

//                     this.invitationAutoNotExistUser(cron_res[i], function(err, session_pending) {
//                         if (err) {
//                             return res.status(500).send({ error: 'Something failed!' })
//                         }
//                         else {
       
//                         }
//                     });
//                 }
                
//             }
//         });

//     }   
        
//     });
             
// });

// invitationAutoExistUser = function (obj, result) {
    
//     var sql = `SELECT * FROM users WHERE email = '${obj.mail}'`;
    
//     db.query(sql, function(err, row, fields) {
    
//         if(err) {
//             return res.status(500).send({ error: 'Something failed!' })
//         }

//         var liste_session = ''

//         for(let i=0;i<obj.sessions.length;i++){

//             liste_session = liste_session + '<p>'+ obj.sessions[i].name + ' : ' + ' ' + obj.sessions[i].start_date + ' - ' + obj.sessions[i].end_date +'</p>'

//         }

//         var mailOptions = {
//             from: "noreply@agenceformatio.com",
//             to: obj.mail,
//             subject: "FORMATIO: Invitation sessions",
//             html:
//                 '<div style="text-align: center;width: 600px;height: 600px;;margin: auto;padding-top: 25px;">' +
//                 '<img style="width: 400px; height: 150px; object-fit: contain;" src="https://i.ibb.co/SR1tbVs/formatio.png" /><br><br>' +
//                 '<span style="font-size : 15px;">Bonjour </span>' + `<span style="font-size : 15px;font-weight: bold;">${row[0].last_name}</span>` + ' ' + `<span style="font-size : 15px;font-weight: bold;">${row[0].first_name}</span>!<br><br>` +
//                 '<span style="font-size : 15px;">Vous avez été ajouté aux sessions suivantes:</span>' + '<br><br>' +
//                 `${liste_session}` + '<br>' +
//                 '<span style="font-size : 15px;">Veuillez cliquer sur le bouton ci dessous afin de commencer vos formations.</span><br><br>' +
//                 '<div style="background-color: #2b55a1;width: 20%;margin: auto;height: 8%;border-radius: 10px;">'+
//                     '<div style="padding-top: 10px;">' +
//                         '<a style="color:white;text-decoration: none;font-size:1.2em" href="https://hup-learning.com/#/">Commencer</a>' +
//                     '</div>' +
//                 '</div>' +
//                 '</div>'
//         };
       
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: "noreply@agenceformatio.com",
//                 pass: "123456789"
//             }
//         });
      
//         transporter.sendMail(mailOptions, function(err, info) {

//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 return res.json({ message: 'Mail sent' });
//             }
//         });

//     });
// }

// invitationAutoNotExistUser = function (obj, result) {
    
//     var sql = `SELECT * FROM users WHERE email = '${obj.mail}'`;
    
//     db.query(sql, function(err, row, fields) {
    
//         if(err) {
//             return res.status(500).send({ error: 'Something failed!' })
//         }

//         var liste_session = ''

//         for(let i=0;i<obj.sessions.length;i++){

//             liste_session = liste_session + '<p>'+ obj.sessions[i].name + ' : ' + ' ' + obj.sessions[i].start_date + ' - ' + obj.sessions[i].end_date +'</p>'

//         }

//         var mailOptions = {
//             from: "noreply@agenceformatio.com",
//             to: obj.mail,
//             subject: "FORMATIO: Invitation sessions",
//             html:
//                 '<div style="text-align: center;width: 600px;height: 600px;;margin: auto;padding-top: 25px;">' +
//                 '<img style="width: 400px; height: 150px; object-fit: contain;" src="https://i.ibb.co/SR1tbVs/formatio.png" /><br><br>' +
//                 '<span style="font-size : 15px;">Bonjour nouvel apprenant!</span>' + `<br><br>` +
//                 '<span style="font-size : 15px;">Vous avez été ajouté aux sessions suivantes:</span>' + '<br><br>' +
//                 `${liste_session}` + '<br>' +
//                 '<span style="font-size : 15px;">Veuillez cliquer sur le bouton ci dessous pour vous inscrire afin de commencer vos formations.</span><br><br>' +
//                 '<div style="background-color: #2b55a1;width: 20%;margin: auto;height: 8%;border-radius: 10px;">'+
//                     '<div style="padding-top: 10px;">' +
//                         '<a style="color:white;text-decoration: none;font-size:1.2em" href="https://hup-learning.com/#/register/' + `${row[0].key_register}` + '">Inscription</a>' +
//                     '</div>' +
//                 '</div>' +
//                 '</div>'
//         };
       
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: "noreply@agenceformatio.com",
//                 pass: "123456789"
//             }
//         });
      
//         transporter.sendMail(mailOptions, function(err, info) {

//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 return res.json({ message: 'Mail sent' });
//             }
//         });

//     });
// }


module.exports = router;