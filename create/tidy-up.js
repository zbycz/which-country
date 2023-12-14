/*
const boundaries = {"type" : "FeatureCollection", "features" : [{"type": "Feature", "geometry": {"type":"Polygon","coordinates":[[[12.0905752,50.2524063],[12.09058,50.2523901],[12.0906357,50.2523266],[12.0907086,50.25224],[12.0907424,50.2522255],[12.09076,50.2522005],[12.0907647,50.2521771],[12.0908144,50.2521392],[12.0951219,50.252956],[12.0924168,50.2527129],[12.0911877,50.2523911],[12.091128,50.2523836],[12.0905905,50.2524026],[12.0905752,50.2524063]]]}, "properties": {"osm_id": -51684, "boundary": "administrative", "admin_level": 2, "parents": null, "name": "Czechia", "local_name": "Česko", "name_en": "Czechia"}}]}
*/
const fs = require('fs');
const turf = require('@turf/turf');
var polyline = require('@mapbox/polyline');

// const lat = 50
// const lon = 14

for (let lon = -180; lon < 180; lon += 1) {
    fs.mkdirSync(`./v2/${lon}`, {recursive: true});

    for (let lat = -90; lat < 90; lat += 1) {
        const from = `./v1/${lon}/${lat}.geojson`;
        const name = `./v2/${lon}/${lat}.geojson`;

        if (!fs.existsSync(from))
            continue;

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
