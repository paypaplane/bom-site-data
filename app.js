var http = require('http');
var scrapeStates = require('./scrapeStates');
// var state = ['nsw','vic','qld','sa','wa','tas','nt','act'];
var states = ['nsw', 'vic', 'qld', 'sa', 'wa', 'tas', 'nt'];
var stateData

var server = http.createServer(function(request, response) {





    scrapeStates(states, function(error, data) {
        if (error) {
            response.end(JSON.stringify({error: error.message}));
            console.log('error:', error);
            return;
        }
        
        response.end(JSON.stringify(data));
    });






});





var port = Number(process.env.PORT || 5000);
server.listen(port);
console.log('Listening on ' + port);
