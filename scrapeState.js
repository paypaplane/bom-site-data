var request = require('request');
var cheerio = require('cheerio');
var geocoder = require('geocoder');

var bomdata = require('./bomdata.json');
var buildLocationObject = require('./buildLocationObject');
var base_url = 'http://www.bom.gov.au/';


function scrapeState(state, callback) {

    var data = {};
    var url = '';
    if (state === 'act') {
        url = base_url + 'act/observations/canberra.shtml'; //http://www.bom.gov.au/fwo/IDN60903/IDN60903.94939.json 
    } else {
        url = base_url + state + '/observations/' + state + 'all.shtml';
    }
    request(url, function(error, response, body) {
        if (error) {
            callback(error);
            return;
        }
        var $ = cheerio.load(body);

        var j = 0;
        $(".tabledata tbody tr th a").each(function() {
            var scrapedLocationRow = $(this);
            var location = (scrapedLocationRow.text());
            var siteNumber = scrapedLocationRow.attr('href').split('.')[1];

            buildLocationObject(location, state, siteNumber, data, function(error, locationData) {

                j++;

                // AllLocationData = locationData;

                console.log(locationData);

                if (j === $(".tabledata tbody tr th a").length) {
                    console.log(j, " of ", $(".tabledata tbody tr th a").length);
                    callback(error, locationData);
                }
            });
        });
    });
};
module.exports = scrapeState;
