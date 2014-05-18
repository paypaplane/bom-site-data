var request = require('request');
var cheerio = require('cheerio');


scrapeState();
function scrapeState(state, callback) {
    var url = 'http://www.bom.gov.au/nsw/observations/nswall.shtml';

    request(url, function(error, response, body) {
        var $ = cheerio.load(body);
        var data = {};

        var xx = $(".tabledata tbody tr th a").toArray();
        xx.pop();
        if(xx){
           
           
          

            // var str = locationAndJson.attr('href').split('.')[1];
           
            console.log(xx);
        } else {
            scrapeState(state, callback);
        }
    
        // });

        // console.log(state);
        // console.log(data);

        // callback(null, data);

    });
};

