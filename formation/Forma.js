var sql = require('../db');
const ENV = 'http://localhost:3000/images/pdf/';
var fs = require('fs');

var Forma = function(formation) {
    this.item = formation.item;
    this.lvl = formation.lvl;
    this.title = formation.title;
    this.video = formation.video;
    this.file = formation.file;
};

Forma.updateItem = function (body,file_pdf, result) {    

    var file = file_pdf;
    console.log(file)
    file.name = body.key;   
    
    if(file.mimetype == "application/pdf"){
        file.mv('public/images/pdf/' + '/' + file.name +'.pdf');
    }

    if(body.lvl == 'debutant'){

        var sqll = 
        `UPDATE pack_debutant
            SET item = '${body.pack}'
        WHERE id = 1`

    }
    
    sql.query(sqll, function (err, res) {
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

module.exports= Forma;