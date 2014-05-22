var geocoder = require('geocoder');

function convertAddressToLatitudeLongitude(locationString, callback) {
    geocoder.geocode(locationString, function(err, geoData) {
        // console.log("hit geoloacte");
        if (err) {
            console.log("error:", err);
            return;
        }
        if (geoData.status === "OK") {
            lat = geoData.results[0].geometry.location.lat;
            lng = geoData.results[0].geometry.location.lng;
        } else if (geoData.error_message) {
            lat = "exceeded limit";
            lng = "exceeded limit";
        } else {
            lat = "not found";
            lng = "not found";
        }
        // console.log(lat, lng);
        callback(null, lat, lng);
    });
}
module.exports = convertAddressToLatitudeLongitude;