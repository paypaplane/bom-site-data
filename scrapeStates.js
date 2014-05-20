var scrapeState = require('./scrapeState');

function scrapeStates(stateCodes, callback) {
    var states = {};
    var i = 0;
    stateCodes.forEach(function(stateCode, index) {
        scrapeState(stateCode, function(error, state) {
            if (error) {
                callback(error);
                return;
            }

            i++;
            console.log(i, " out of ", stateCodes.length, "for", stateCode);
            states[stateCode] = state;

            if (i === stateCodes.length) {
                callback(null, states);
            }
        });
    });
};

module.exports = scrapeStates;
