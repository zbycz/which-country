const fs = require('fs');
const turf = require('@turf/turf');


// load all countries into memory (50 MB)
const dir = fs.readdirSync('./boundaries')

const boundaries = [];
for (const file of dir) {
    if (file.endsWith('.geojson')) {
        const object = JSON.parse(fs.readFileSync(`./boundaries/${file}`));
        const features = object.features;
        if (features && features.length > 0)
            boundaries.push(features[0]);
    }
}

// add bbox to each country
for (const boundary of boundaries) {
    boundary.bbox = turf.bbox(boundary);
}


const all = boundaries.map(f => {
    f.properties = {
        relation_id: f.properties.osm_id * -1,
        code: f.properties.all_tags["ISO3166-1"],
        name: f.properties.name,
        local_name: f.properties.local_name,
    }
    f.geometry = undefined;
    return f
});

fs.writeFileSync('./only-bbox.json', JSON.stringify(all));
