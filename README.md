#bom-site-data

Provides a list of all BOM (Bureau of Meteorology) Sites/stations with relevant site number, latitude and longitude information.

Uses the Geocoder module to pull latitude and longitude info for each location. 

# Usage #

To scrape the Bom data feeds for all Australian states at http://www.bom.gov.au/catalogue/data-feeds.shtml run:

node app.js

As the Geocoder module is limited by requests per day, the app will need to be run daily to fully populate the bomdata.json file.

To check the status of the bomdata.json file run: 

node percentage.js

Example bomdata.json:
{
    "sa": {
        "Adelaide": {
            "siteNumber": "94675",
            "lat": -34.92862119999999,
            "lng": 138.5999594
        },
        "Kuitpo": {
            "siteNumber": "94683",
            "lat": -35.2212485,
            "lng": 138.6933004
        },
        "Edinburgh": {
            "siteNumber": "95676",
            "lat": -34.7461904,
            "lng": 138.638449
        },