var request = require('request');
var cheerio = require('cheerio');


scrapeState();
function scrapeState(state, callback) {
    var url = 'http://www.bom.gov.au/nsw/observations/nswall.shtml';

    request(url, function(error, response, body) {
        var $ = cheerio.load(body);
        var data = {};

        $(".tabledata tbody tr th a").each(function() {
           
            var locationAndJson = $(this);
          

            var str = locationAndJson.attr('href').split('.')[1];
           
            console.log(str);

    
        });

        // console.log(state);
        // console.log(data);

        // callback(null, data);

    });
};

