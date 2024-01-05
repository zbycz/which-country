/*
const boundaries = {"type" : "FeatureCollection", "features" : [{"type": "Feature", "geometry": {"type":"Polygon","coordinates":[[[12.0905752,50.2524063],[12.09058,50.2523901],[12.0906357,50.2523266],[12.0907086,50.25224],[12.0907424,50.2522255],[12.09076,50.2522005],[12.0907647,50.2521771],[12.0908144,50.2521392],[12.0951219,50.252956],[12.0924168,50.2527129],[12.0911877,50.2523911],[12.091128,50.2523836],[12.0905905,50.2524026],[12.0905752,50.2524063]]]}, "properties": {"osm_id": -51684, "boundary": "administrative", "admin_level": 2, "parents": null, "name": "Czechia", "local_name": "Česko", "name_en": "Czechia"}}]}
*/
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


console.log('Start with lat/lon pair, boundaries', boundaries.length);

// run through all lon/lat pairs
for (let lon = -180; lon < 180; lon += 1) {
    fs.mkdirSync(`./v3/${lon}`, {recursive: true});

    for (let lat = -90; lat < 90; lat += 1) {
        const from = `./v1/${lon}/${lat}.geojson`;
        const name = `./v3/${lon}/${lat}.geojson`;

        if (!fs.existsSync(from))
            continue;

        if (getBboxIntersections(lon, lat) <= 1) {
            continue;
        }



        const geojson = JSON.parse(fs.readFileSync(from).toString());

        const out = geojson.features.map(f => {

            f.properties = {
                relation_id: f.properties.osm_id * -1,
                code: f.properties.all_tags["ISO3166-1"],
                name: f.properties.name,
                local_name: f.properties.local_name,
            }

            const convertPolygon = coordinates =>
                coordinates.map(ring =>
                    ring.map(([lon, lat]) => [
                        Math.round(lon * 1e5) / 1e5,
                        Math.round(lat * 1e5) / 1e5,
                    ]),
                );

            // round to 5 decimals
            if (f.geometry.type === 'Polygon') {
                f.geometry.coordinates = convertPolygon(f.geometry.coordinates);
            } else if (f.geometry.type === 'MultiPolygon') {
                f.geometry.coordinates = f.geometry.coordinates.map(polygon => convertPolygon(polygon));
            }

            return f
        });

        fs.writeFileSync(name, JSON.stringify(turf.featureCollection(out)));
    }
}


function getBboxIntersections(lon, lat) {
    let bbox = [lon, lat, lon + 1, lat + 1];
    let out = 0;

    for (const boundary of boundaries) {
        if (isIntersectingBBox(bbox, boundary)) {
                out++;
        }
    }

    return out;
}

function isIntersectingBBox(bbox1, boundary) {
    let bbox2 = boundary.bbox;
    if (!(
        bbox1[0] > bbox2[2] ||
        bbox1[2] < bbox2[0] ||
        bbox1[3] < bbox2[1] ||
        bbox1[1] > bbox2[3]
    )) {
        return true; // we can also be outside
    }

    return false;
}
