var express = require('express');
var passport = require('passport');
var app = express();
var querydb = require('./query_db');
var bodyParser = require('body-parser');
require('./passport');


//configure express
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//auth
const auth = require('./routes/auth');
app.use('/auth', auth);


//user.js
const user = require('./routes/user');
app.use('/user', passport.authenticate('jwt', { session: false }), user);


//add api listener from signup page
var signup = require('./UserManagement/SignUp');
app.use('/UserManagement', signup);


//home page
app.get('/',(req,response)=>{

    querydb.QueryDb('select top 2 * from dbo.Student').then(function (data) {

        //console.log(data);
        response.send(data);

    }).catch(function (ex) {
        console.log(ex);
        console.log("Promise Rejected");
    });
    

});
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  });


//starting server
var server = app.listen(5000,()=>{
    console.log("Server is running");
    
})