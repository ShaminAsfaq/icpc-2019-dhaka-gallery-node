var express = require('express');

var csv = require('csv-parser');
var fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3001

// Allow all in CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


var list = [];
app.get('/', (req, res) => {

	if(list.length===0){
		fs.createReadStream('ICPC Dhaka 2019 collecting photos (Responses) - Form Responses 1.csv')
		.pipe(csv())
		.on('data', (data) => {
		    
		    var institute = 'Name of the University';
		    var team_name = 'Name of the team';
		    var coach_name = 'Name of the coach';
		    var c1_name = 'Name of contestant 1';
		    var c2_name = 'Name of contestant 2';
		    var c3_name = 'Name of contestant 3';
		    var cm_id = 'CM ID';

		    list.push({
		        institute: data[institute],
		        team_name: data[team_name],
		        coach_name: data[coach_name],
		        c1_name: data[c1_name],
		        c2_name: data[c2_name],
		        c3_name: data[c3_name],
		        cm_id: data[cm_id]
		    });
		})
		.on('end', () => {

		    list = list.sort((a,b) => {
		        return a.institute > b.institute ? 1 : -1
		    });

		    res.send(list);
		});
    } else {
		res.send(list)
	}
});

app.get('/url', (req, res) => {
    res.send('Hey!')
});

//  Opening server for the world (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
 console.log('Node server up');
});



