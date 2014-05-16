var grape = require('grape');

var scrapeState = require('../scrapeState');
var scrapeStates = require('../scrapeStates');

grape('scrape 1 state', function(t) {
    t.plan(2);
    scrapeState('qld', function(error, data) {
        t.notOk(error, 'error should be null');
        t.ok(Object.keys(data).length > 10, 'data should have more than 10 keys');
        t.end();
    });

});
grape('scrape all states', function(t) {
    t.plan(2);
    scrapeStates(['qld','vic','nsw'], function(error, data) {
        t.notOk(error, 'error should be null');
        t.ok(data.length === 3, 'data should have three objects');
        t.end();
    });

});
