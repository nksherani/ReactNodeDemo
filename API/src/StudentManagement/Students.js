var querydb = require('../query_db');
var express = require('express');
var app = express();

app.get('/',(req,response)=>{

    querydb.QueryDb('select * from Student').then(function (data) {
        console.log('api hit');
        //console.log(data);
        var firstNames = data['recordset'].map((x)=>x.FirstName);
        response.send(firstNames);

    }).catch(function (ex) {
        console.log(ex);
        console.log("Promise Rejected");
    });
    

});


module.exports = app;