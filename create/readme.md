# How to refresh this dataset

```bash
node download-all.js
bash download-all.sh
cd boundaries
gunzip *
```

This downloads all the countries with simplified 0.0001 geometries.
It downloads 17 MB of gzipped data, 52 MB of raw geojsons. The biggest file is 2 MB.

# v1

```bash
node process-boundaries.js
```

Generates 20768 files of files (122 MB). Folder few MBs. Biggest files is 777 kB ([v1/88/26.geojson](./v1/88/26.geojson)).
Takes 7h on Macbook M1 Air, or 4h on Macbook M1 Pro.


# optional: tidy up

```bash
node tidy-up.js
```
- round to 5 decimals -> 116 MB
- (ZIP 17.8 MB)

v1/14/50.geojson = 269kB pretty json
v2/14/50.geojson = 60kb no spaces, less tags
v2/14/50.geojson = 53kb with rounded to 5 decimals


Experiment:
- polyline 5 dec -> 86 MB




# use


Download options:
- https://github.com/zbycz/which-country/blob/main/create/v1/88/26.geojson
- https://cdn.jsdelivr.net/gh/zbycz/which-country/dist/create/v1/88/26.geojson
- https://zbycz.github.io/which-country/create/v1/14/50.geojson
  -  moderately big (270kB raw) is 87ms in gzip:
    ![speed](./speed.png)
    After cache hit, it goes down to 30ms. 
    // TODO find if files can be permanent Expire +10y ..


# notes

// find biggest file in folder recursively using ls:
```bash
ls -lR | grep -v '^d' | sort -k5 -n -r | head -n 10
```

