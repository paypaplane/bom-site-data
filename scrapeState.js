var request = require('request');
var cheerio = require('cheerio');
var geocoder = require('geocoder');

var base_url = 'http://www.bom.gov.au/';

var data = {};

function scrapeState(state, callback) {
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
            var locationAndJson = $(this);
            var location = (locationAndJson.text());
            var siteNumber = locationAndJson.attr('href').split('.')[1];
            geocoder.geocode(location + ", " + state + ", Australia", function(err, geoData) {

                j++;

                if (err) {
                    console.log("error:", err);
                    return;
                }
                if (geoData.status === "OK") {
                    // console.log(geoData.error_message, geoData.status);
                    data[location] = {
                        siteNumber: siteNumber,
                        lat: geoData.results[0].geometry.location.lat,
                        lng: geoData.results[0].geometry.location.lng
                    };

                } else {
                    data[location] = {
                        siteNumber: siteNumber,
                        lat: "not found",
                        lng: "not found"
                    };
                }

                if (j === $(".tabledata tbody tr th a").length) {
                    j = 0;
                    // console.log(j, " of ", $(".tabledata tbody tr th a").length);
                    callback(null, data);
                }

            });

        });

    });
};
module.exports = scrapeState;

// var geocoder = require('geocoder');
// var request = require('request');
// var cheerio = require('cheerio');

// var base_url = 'http://www.bom.gov.au/';

// var j = 0;
// function scrapeState(state, callback) {
//     var url = base_url + state + '/observations/' + state + 'all.shtml' //this will not work for act 

//     request(url, function(error, response, body) {
//         if (error) {
//             callback(error);
//             return;
//         }
//         var $ = cheerio.load(body);
//         var data = {};
//         $(".tabledata tbody tr th a").each(function() {
//             j++;
//             // console.log(j); 784 hits!

//             var locationAndJson = $(this);
//             var location = (locationAndJson.text());
//             var siteNumber = locationAndJson.attr('href').split('.')[1];
//             // console.log(siteNumber);

//             data[location] = {
//                         siteNumber: siteNumber,
//                         lat: "geoData",
//                         lng: "geoData"
//                     };

//         });

//         // console.log(state);
//         // console.log(data);

//         callback(null, data);

//     });
// };

// module.exports = scrapeState;
