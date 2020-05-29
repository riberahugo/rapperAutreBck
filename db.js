var mysql=require('mysql');

var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'franky',
  database:'rapperautre',
  charset : 'utf8mb4'
});

// newuser : password

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected!');
  });
  
module.exports = connection;