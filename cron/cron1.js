// var imaps = require('imap-simple');
// const simpleParser = require('mailparser').simpleParser;
// const _ = require('lodash');
// const utf8 = require('utf8');
// var sql = require('../db');

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// var config = {
//     imap: {
//         user: 'validations@agenceformatio.com',
//         password: 'Ydewhuzaqsd2020!!',
//         host: 'imap.gmail.com',
//         port: 993,
//         tls: true
//     }
// };

// imaps.connect(config).then(function (connection) {
//   return connection.openBox('INBOX').then(function () {

//     var delay = 24 * 3600 * 1000;
//     var yesterday = new Date();
//     yesterday.setTime(Date.now() - delay);
//     yesterday = yesterday.toISOString();
//     // var searchCriteria = ['ALL', ['SINCE', yesterday]];

//       var searchCriteria = ['ALL', ['SINCE', yesterday]];
//       var fetchOptions = {
//           bodies: ['HEADER', 'TEXT', ''],
//       };
//       return connection.search(searchCriteria, fetchOptions).then(function (messages) {
//           messages.forEach(function (item) {
//               var all = _.find(item.parts, { "which": "" })
//               var id = item.attributes.uid;
//               var idHeader = "Imap-Id: "+id+"\r\n";
//               simpleParser(idHeader+all.body, (err, mail) => {
//                 mail.text = mail.text.replace(/&eacute;/g, 'é');
//                 mail.text = mail.text.replace(/&agrave;/g, 'à');
//                 mail.textAsHtml = mail.textAsHtml.replace(/&apos;/g, '\'');
//                 mail.textAsHtml = mail.textAsHtml.replace(/ &amp;eacute;/g, 'é');
               
                
                
//                   // access to the whole mail object
//                   if(mail.subject == "Inscription a une session d'une action") {
//                     var email = '';
//                     var pos1 = mail.html.indexOf('Courriel');
//                     var pos2 = mail.html.split('</li>', 3).join('</li>').length;
//                     mail.text = mail.text.replace(/(\r\n|\n|\r)/gm, " ");

    
                      

//                     var date1 = '';
//                     var date2 = '';
//                     var pos3 = mail.html.indexOf(' du ');
//                     var pos4 = mail.html.indexOf(' au ');

//                     var theme = '';
//                     var pos5 = mail.text.indexOf("l'action");
//                     var pos6 = mail.text.indexOf("référence");

//                     var ref = '';
//                     var pos7 = mail.text.split(').', 1).join(').').length;
                    
//                     for(var i = pos1 + 11 ; i < pos2; i++) {
//                       email = email + mail.html[i];
//                     }

//                     for(var j = pos3 + 4 ; j < pos4; j++) {
//                       date1 = date1 + mail.html[j];
//                     }

//                     for(var k = pos4 + 4 ; k <  pos4 + 15; k++) {
//                       date2 = date2 + mail.html[k];
//                     }

//                     for(var w = pos5 + 9 ; w <  pos6; w++) {
//                       theme = theme + mail.text[w];
//                     }

//                     for(var x = pos6 + 10 ; x <  pos7; x++) {
//                       ref = ref + mail.text[x];
//                     }

//                     var add = {
//                       email: email,
//                       start_date: date1,
//                       end_date: date2,
//                       theme: theme,
//                       ref: ref
//                     }

//                     sql.query(`INSERT INTO cron1 set ?`, add, function (err, res) {
//                       if(err) {
//                         console.log(err)
//                       }
//                       else{
                     
//                       }
//                     });  

//                   }

//               });
//           });
//       });
//   });
// })
// .catch( function( e ){
//   console.log( e );
// });