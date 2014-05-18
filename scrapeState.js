// var request = require('request');
// var cheerio = require('cheerio');
// var geocoder = require('geocoder');

// var base_url = 'http://www.bom.gov.au/';

// function scrapeState(state, callback) {
//     var url = '';
//     if (state === 'act') {
//         url = base_url + 'act/observations/canberra.shtml'; //http://www.bom.gov.au/fwo/IDN60903/IDN60903.94939.json 
//     } else {
//         url = base_url + state + '/observations/' + state + 'all.shtml';
//     }
//     request(url, function(error, response, body) {
//         if (error) {
//             callback(error);
//             return;
//         }
//         var $ = cheerio.load(body);
//         var data = {};

//         var i = 0;
//         $(".tabledata tbody tr th a").each(function() {
//             i++; 
//             var locationAndJson = $(this);
//             var location = (locationAndJson.text());
//             var siteNumber = locationAndJson.attr('href').split('.')[1];

//             if (i === 1) {  //geo test
//                 geocoder.geocode(location+", "+state+", Australia", function ( err, geoData ) {
//                     if(geoData.error_message){
//                     console.log(geoData.error_message, geoData.status);
//                     }

//                     data[location] = {
//                         siteNumber: siteNumber,
//                         lat: geoData,
//                         lng: geoData
//                     };
//                     if (i === $(".tabledata tbody tr th a").length) {
//                         console.log ($(".tabledata tbody tr th a").length); 
//                         callback(null, data);
//                     }
//                 });
//             }
//         });
       
//     });
// };
// module.exports = scrapeState;


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