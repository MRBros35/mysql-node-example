var mysql = require("mysql");
var express = require('express');
var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

app.use('/api/v1/get_test_data', (req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM test_data;", (err, result) => {
            //if (err) throw err;
            res.send(result);
        });
    });
});

app.use('/', (req, res) => {
	res.sendFile(__dirname + '/static/html/index.html');
});

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Listening on http://%s:%s", host, port);
});