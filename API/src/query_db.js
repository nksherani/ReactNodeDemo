//query_db.js
var sql = require('mssql');

    var config = {
        user:'trainers',
        password:'trainers',
        server:'DESKTOP-Q7R4CFG\\SQLEXPRESS',
        database:'Trainers',
        // options: {
        //     instanceName: 'SQLEXPRESS',
        //     encrypt: false // Use this if you're on Windows Azure 
        // }
};


module.exports = {
    QueryDb: function (query) {
        sql.close();
        return sql.connect(config).then(function () {
            var request = new sql.Request();
            // Return the Promise object that will contain the result of 
            // the query when resolved
            return request.query(query);
        });
    }
};

