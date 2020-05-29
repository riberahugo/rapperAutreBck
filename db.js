var mysql=require('mysql');

var connection=mysql.createConnection({
  host:'http://ec2-15-188-87-82.eu-west-3.compute.amazonaws.com',
  user:'root',
  password:'francky',
  database:'rapperautre',
  charset : 'utf8mb4'
});

// newuser : password

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected!');
  });
  
module.exports = connection;