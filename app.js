var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')
 
global.__root   = __dirname + '/';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:52428800}));

app.use(express.static('./dist/'));

app.get('/', function (req, res) {
  res.render('./dist/index.html', {});
});

var MailController = require(__root + 'mail/MailController');
app.use('/api/mail', MailController);

var Stripe = require(__root + 'stripe/stripe');
app.use('/api/stripe', Stripe);

var Invitation = require(__root + 'invitation/invitation');
app.use('/api/invitation', Invitation);

var User = require(__root + 'user/UserController');
app.use('/api/users', User);

var Auth = require(__root + 'auth/AuthController');
app.use('/api/auth', Auth);

var Formations = require(__root + 'formation/Formation');
app.use('/api/formations', Formations);

module.exports = app;