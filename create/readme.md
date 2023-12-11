# How to refresh this dataset

```bash
node download-all.js
bash download-all.sh
cd boundaries
gunzip *
```

This downloads all the countries with simplified 0.0001 geometries.
It downloads 17 MB of gzipped data, 52 MB of raw geojsons. The biggest file is 2 MB.




