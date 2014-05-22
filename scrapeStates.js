var scrapeState = require('./scrapeState');

function scrapeStates(stateCodes, callback) {
    var i = 0;
    var states = {};
    stateCodes.forEach(function(stateCode, index) {
        scrapeState(stateCode, function(error, state) {
            if (error) {
                callback(error);
                return;
            }
            i++;
            console.log(i, " out of ", stateCodes.length, "for", stateCode);
            
            states[stateCode] = state; //////////broken, printing two layers of states
            console.log(state); //////////broken, printing two layers of states

            if (i === stateCodes.length) {
                callback(null, states);
            }
        });
    });
};

module.exports = scrapeStates;
