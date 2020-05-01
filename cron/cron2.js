// var sql = require('../db');
// const _ = require('lodash');

// sql.query(`Select * from cron1`, async function (err, res) {
//     if(err) {
//         console.log("error: ", err);
//     }
//     else{     
//         var list = res.filter((elem, index, self) => self.findIndex(
//             (t) => {return (t.email === elem.email && t.email === elem.email)}) === index)

//         for(i=0; i < list.length; i++) {
//             var email = list[i].email;
//             var user = {
//                 mail: list[i].email,
//                 sessions: []
//             }
//             for(j=0; j < res.length; j++) {
//                 if(email == res[j].email) {
//                     user.sessions.push({
//                         name: res[j].theme,
//                         start_date: res[j].start_date,
//                         end_date: res[j].end_date,
//                         reference: res[j].ref
//                     })
//                 }
//             }

//             user.sessions = JSON.stringify(user.sessions)

//             await sql.query(`INSERT INTO cron2 set ?`, user);


//         }

    
//     }
// }); 