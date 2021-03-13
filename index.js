var mysql = require("mysql"); // Require the MySQL connection library
var express = require('express'); // Require the Express API creation library
var app = express(); // Create an instance of Express

const path = require("path");

var con = mysql.createConnection({ // Configure a connection to the database
    host: "localhost",
    user: "root", // Don't use root
    password: "", // Please set a password
    database: "test"
});

con.connect(function(err) { // Connect the configured connection to the database
	if (err) console.log(err); // I don't throw errors, a lot are extraneous
});

app.get('/api/v1/testData', (req, res) => { // Have Express listen for GET requests on the URL "/api/v1/testData"
    con.query("SELECT * FROM test_data;", (err, result) => { // Select all columns from all rows from the table test_data and return it to an anonymous callback function
		if (err) console.log(err); // Again, I don't throw errors due to relevancy
		res.send(result); // Send the result back to the client
	});
});

app.get('/', (req, res) => { // Have Express listen for GET requests on the URL "/"
	res.sendFile(path.resolve('static/html/index.html')); // Send the code at the resolved path of the static "index.html" file
});

var server = app.listen(5000, () => { // Have Express listen on port 5000 and store the result in the variable server. When the connection is established, callback this anonymous function.
	let addr = server.address(); // Get the listening address
    var host = addr.address; // Get the hostname of the listening address
    var port = addr.port; // Get he port of the listening address

    console.log("Listening on http://%s:%s", host, port); // Output the listening address to the console
});
