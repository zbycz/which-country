var fs = require('fs');

var countries = JSON.parse(fs.readFileSync('./countries/countries.json', 'utf8')).elements;

const out = countries.map(function(country) {
    var code = country.tags["ISO3166-1"];
    var id = country.id*1 - 3600000000;

    return `wget "https://osm-boundaries.com/Download/Submit?apiKey=XXXXXXXXXXXXX&db=osm20231002&osmIds=-${id}&minAdminLevel=2&maxAdminLevel=2&format=GeoJSON&srid=4326&includeAllTags&simplify=0.0001" -O boundaries/all-${code}.geojson.gz
sleep 1`

})

fs.writeFileSync('download-all.sh', out.join('\n'))
