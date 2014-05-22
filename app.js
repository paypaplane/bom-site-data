var fs = require('fs');
var scrapeStates = require('./scrapeStates');
var states = ['nsw', 'vic', 'qld', 'sa', 'wa', 'tas', 'nt', 'act'];

scrapeStates(states, function(error, data) {
    if (error) {
        console.log('error:', error);
        return;
    }

    fs.writeFile('bomdata.json', JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });

});
