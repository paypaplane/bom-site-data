var kgo = require('kgo');
var scrapeState = require('./scrapeState');

function scrapeStates(states, callback){
    kgo('stateData', function(done){
        this.count(states.length);

        states.forEach(function(state){
            scrapeState(state, done);
        });
    })(['stateData'], function(states){
        callback(null, states);
    });    	
};

module.exports = scrapeStates;