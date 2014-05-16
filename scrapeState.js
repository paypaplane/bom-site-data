var request = require('request');
var cheerio = require('cheerio');

var base_url = 'http://www.bom.gov.au/';


function scrapeState(state, callback) {
    var url = base_url + state + '/observations/' + state + 'all.shtml' //this will not work for act 

    request(url, function(error, response, body) {
        if (error) {
            callback(error);
            return;
        }
        var $ = cheerio.load(body);
        var data = {};
        $(".tabledata tbody tr th a").each(function() {
           
            var locationAndJson = $(this);
            var location = (locationAndJson.text());
            var siteNumber = locationAndJson.attr('href').split('.')[1];
            // console.log(siteNumber);
            
            data[location] = siteNumber;

        });

        // console.log(state);
        // console.log(data);

        callback(null, data);

    });
};

module.exports = scrapeState;