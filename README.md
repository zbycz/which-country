# which-country DEPREACTED
Static API for fast country lookup



The downloaded data itself follows the license of OpenStreetMap, which is [ODbL](https://opendatacommons.org/licenses/odbl/1-0/). 

**INFO**

More info about algorithms at [`/create` folder](create/). But after all this idea is not ideal, it generates eg 122MB of files which has to be hosted somewhere. It would be better to use utfgrid / codegrid ([lib](https://github.com/hlaw/codegrid-js)), which generates just 1.5MB for whole world, but the generator script is lost and the code is quite old.


Similar projects
----------------

- https://country.is/ IP to Country code
- http://api.geonames.org/countryCodeJSON?lat=49.03&lng=10.2&username=demo
- https://maps.googleapis.com/maps/api/geocode/json?latlng=11.2742848,75.8013801&key=YOUR_API_KEY_HERE

BETTER:
- https://github.com/hlaw/codegrid-js
  - https://github.com/mapbox/utfgrid-spec
  - https://openlayers.org/en/latest/examples/utfgrid.html
  - fetches 35kb for world, then 100-300kb for tile
  - tile storage = 10 MB, zip = 1.5 MB
  - npm pkg https://github.com/QuinsZouls/react-codegrid
- approximate tz lookup in 7kB - for inspiration: https://github.com/photostructure/tz-lookup

