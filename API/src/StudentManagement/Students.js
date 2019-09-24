var querydb = require('../query_db');
var express = require('express');
var app = express();

app.get('/',(req,response)=>{

    querydb.QueryDb('exec Getstudents').then(function (data) {
        //console.log(data);
        var Students = data['recordset'];
        //console.log(Students);
        response.send(Students);

    }).catch(function (ex) {
        console.log(ex);
        console.log("Promise Rejected");
    });
    

});


module.exports = app;