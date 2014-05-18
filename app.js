// var http = require('http');
var fs = require('fs');
var scrapeStates = require('./scrapeStates');
var states = ['nsw','vic','qld','sa','wa','tas','nt','act'];
// var states = ['act'];

// var server = http.createServer(function(request, response) {

    scrapeStates(states, function(error, data) {
        if (error) {
            // response.end(JSON.stringify({error: error.message}));
            console.log('error:', error);
            return;
        }
        
        fs.writeFile('bomdata.json', JSON.stringify(data), function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
        // response.end(JSON.stringify(data));
    });

// });

// var port = Number(process.env.PORT || 5000);
// server.listen(port);
// console.log('Listening on ' + port);