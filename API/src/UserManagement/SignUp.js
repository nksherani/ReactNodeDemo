//UserManagement/SignUp

var express = require('express');
var app = express();
var querydb = require('../query_db');
var bcrypt = require('bcryptjs')

app.get('/SignUp',(req,res)=>{

    var data = querydb.QueryDb('select top 2 * from NodeUsers');
    res.send(data);

});

app.post('/SignUp', function (req, res) {
    //console.log(req.body);
    var user = req.body;
    bcrypt.hash(user.password,10, function (err, hash){
        if (err) {
          return next(err);
        }
        user.password = hash;
        var query = 'insert into NodeUsers (email, username, passwordhash) values(\''+user.email+'\',\''+user.username+'\',\''+user.password+'\')';
        console.log(query);
        querydb.QueryDb(query, (err, result) => {
            if(err)
                console.log(err);
            console.log(result)
        });
        res.send('User added successfully');
        //next();
      });
    
  });


  module.exports= app;
