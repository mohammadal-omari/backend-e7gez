const express = require('express');
const app = express();
require("./config/database").connect();
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const v1 = require('./routes/v1');
const v2 = require('./routes/v2'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("./config/superadmin.create").createSuperAdmin();
const fs = require('fs');

const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: 'server.log',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    },
    log = SimpleNodeLogger.createSimpleLogger(opts);
log.setLevel('warn');
log.setLevel('trace');
log.setLevel('debug');
log.setLevel('error');
log.setLevel('info');



if (process.env.NODE_ENV === 'production') {

    var accessLogStream = fs.createWriteStream(__dirname + "/../server.log", { flags: 'a' });
    app.use(logger({ stream: accessLogStream }));
}
else {
    app.use(logger("dev")); //log to console on development
}


// ----------- Middlewares -----------//

app.use(cors({
    origin: "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    // "preflightContinue": true,
    // credentials: true,
    // optionSuccessStatus:200,
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}));

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
app.use(cookieParser(process.env.sessionSecret))
app.use(session({
    secret: process.env.sessionSecret, 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//******************* passport-auth *****************************/
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});


// ----------- Routes -----------//
app.use('/api/v1', v1);
app.use('/api/v2', v2);

// ----------- STATIC FILE SERVER -----------//
app.use('/images',express.static(__dirname +"/upload"));

// ----------- ERRORS -----------//
app.use((req, res, next) => {
    //404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';
    res.write('<style>     body {background-color: #92a8d1;}   .text { text-align: center;  font-family: \'Times New Roman\', Times, serif; color: red; margin: 300px auto }       </style>')
    res.write('<h1 class="btn btn-secondary text">' + status + ' ' + error + '</h1>')
    res.end();
});

module.exports = app;