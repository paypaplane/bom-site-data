
var geocoder = require('geocoder');

var bomdata = require('./bomdata.json');

function buildLocationObject(location, siteNumber, state, data, callback) {
    
    var RunGeoLocate = false;
    var locationIsSet = bomdata[state] && bomdata[state][location];
    if (locationIsSet && typeof bomdata[state][location].lat === 'string') {
        RunGeoLocate = true;
    } else if (!locationIsSet) {
        RunGeoLocate = true;
    }
    if (RunGeoLocate === true) { // if the latitude is not set in the file, try again to find it

        geocoder.geocode(location + " " + state + ", Australia", function(err, geoData) {
            console.log("hit geoloacte");


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

            // console.log(j, " of ", $(".tabledata tbody tr th a").length);
            callback(null, data);
            return;
        });
    } else { // else read the value from
        data[location] = {
            siteNumber: siteNumber,
            lat: bomdata[state][location].lat,
            lng: bomdata[state][location].lng
        };

        callback(null, data);
        return;
    }
}

module.exports = buildLocationObject;