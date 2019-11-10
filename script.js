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
var map = {};

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

			if(map[data[team_name]]===undefined) {
				map[data[team_name]] = true;
				list.push({
					institute: data[institute],
					team_name: data[team_name],
					coach_name: data[coach_name],
					c1_name: data[c1_name],
					c2_name: data[c2_name],
					c3_name: data[c3_name],
					cm_id: data[cm_id]
				});
			} else {
				console.log('#1. Found team is:', data[team_name])
			}
		})
		.on('end', () => {		   
		});

		fs.createReadStream('teams-with-no-photo.csv')
			.pipe(csv())
			.on('data', (data) => {
				
				var institute = 'institution';
				var team_name = 'team_name';
				var coach_name = 'coach_name';
				var c1_name = 'contestant1_name';
				var c2_name = 'contestant2_name';
				var c3_name = 'contestant3_name';
				var cm_id = 'username';

				if(map[data[team_name]]===undefined){
					map[data[team_name]] = true;				

					list.push({
						institute: data[institute],
						team_name: data[team_name],
						coach_name: data[coach_name],
						c1_name: data[c1_name],
						c2_name: data[c2_name],
						c3_name: data[c3_name],
						cm_id: data[cm_id]
					});
				} else {
					console.log('#2. Found team is:', data[team_name])
				}
			})
			.on('end', () => {
				
				list = list.sort((a,b) => {
					return a.institute > b.institute ? 1 : -1
				});
				res.send(list);
				

				// console.log(list.filter((team, idx) => {
				// 	if(team.institute != idx.institute)
				// 		return true;
				// 	else return false;
				// }))
				
				// console.log(list)
			})

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



