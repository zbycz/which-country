

// read countries.json
var fs = require('fs');
var countries = JSON.parse(fs.readFileSync('countries.json', 'utf8')).elements;


const out = countries.map(function(country) {
    return {
        id: country.id,
        code: country.tags["ISO3166-1"],
        name: country.tags["name"],
        name_en: country.tags["name:en"],
        flag: country.flag,
    }
})

fs.writeFileSync('countries-out.json', JSON.stringify(out, null, 2))
