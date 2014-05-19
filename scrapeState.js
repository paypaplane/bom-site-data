var request = require('request');
var cheerio = require('cheerio');
var geocoder = require('geocoder');
// var fs = require('fs');
var bomdata = require('./bomdata.json');

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

        
            
            var locationIsSet = bomdata[state] && bomdata[state][location];
            var RunGeoLocate = false;

            if (locationIsSet && typeof bomdata[state][location].lat === 'string'){
                RunGeoLocate = true;
            } else if (!locationIsSet) {
                RunGeoLocate = true;
            }
                  
            if (RunGeoLocate === true) {  // if the latitude is not set in the file, try again to find it

                geocoder.geocode(location + " " + state + ", Australia", function(err, geoData) {
                    console.log("hit geoloacte");
                    j++;

                    if (err) {
                        console.log("error:", err);
                        return;
                    }
                    if (geoData.status === "OK") {
                        data[location] = {
                            siteNumber: siteNumber,
                            lat: geoData.results[0].geometry.location.lat,
                            lng: geoData.results[0].geometry.location.lng
                        };

                    } else if (geoData.error_message) {
                        // console.log(geoData.error_message, geoData.status);
                        data[location] = {
                            siteNumber: siteNumber,
                            lat: "exceeded limit",
                            lng: "exceeded limit"
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
            } else {  // else read the value from
                data[location] = {
                    siteNumber: siteNumber,
                    lat: bomdata[state][location].lat,
                    lng: bomdata[state][location].lng
                };
                j++;
                if (j === $(".tabledata tbody tr th a").length) {
                    j = 0;
                    console.log(j, " of ", $(".tabledata tbody tr th a").length, "pulled data from local json");
                    callback(null, data);
                }

            }

        });

    });
};
module.exports = scrapeState;
