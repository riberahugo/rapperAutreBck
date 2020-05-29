var sql = require('../db');

var User = function(user) {
    this.role = user.role;
    this.email = user.email;
    this.password = user.password;
};

User.createUser = function (email,role, result) {    

    var newuser = {
        role:role,
        email:email,
        password:strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 10,
            startsWithLowerCase: true
          }),
        key_register:strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 10,
            startsWithLowerCase: true
          }),
        current_lesson: 1
    }

    sql.query("INSERT INTO user set ?", newuser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res.insertId);
        }
    });           
};

User.getUserById = function (id, result) {    

    sql.query("SELECT * from user where id = ?", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res);
        }
    });           
};

User.login = function (email,mdp, result) {   
    
    console.log("coucou")

    sql.query("SELECT * from user where email = ? and password = ?", [email,mdp] , function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res)
            result(null, res);
        }
    });           
};

User.updateUser = function (id,new_user, result) {    

    var key = strRandom({
        includeUpperCase: true,
        includeNumbers: true,
        length: 10,
        startsWithLowerCase: true
    })

    var sqlol = 
    `UPDATE user
        SET role = '${new_user.role}',
            email = '${new_user.email}',
            password = '${new_user.password}', 
            key_register = '${key}',
            current_lesson = 1
    WHERE id = ${id}`

    sql.query(sqlol, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res);
        }
    });           
};

function strRandom(o) {
    var a = 10,
        b = 'abcdefghijklmnopqrstuvwxyz',
        c = '',
        d = 0,
        e = ''+b;
    if (o) {
        if (o.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
        }
        if (o.length) {
        a = o.length;
        }
        if (o.includeUpperCase) {
        e += b.toUpperCase();
        }
        if (o.includeNumbers) {
        e += '1234567890';
        }
    }
    for (; d < a; d++) {
        c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
}

User.getUserByKey = function (key, result) {
    sql.query("Select * from user where key_register = ?",key, function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else{
            result(null, res);
            
        }
    });   
};

module.exports= User;