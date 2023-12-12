# How to refresh this dataset

```bash
node download-all.js
bash download-all.sh
cd boundaries
gunzip *
```

This downloads all the countries with simplified 0.0001 geometries.
It downloads 17 MB of gzipped data, 52 MB of raw geojsons. The biggest file is 2 MB.

```bash
node process-boundaries.js
```

Generates 20768 files of files (530 MB), each folder max 4 MB.
Biggest files is 777 kB ([v1/88/26.geojson](./v1/88/26.geojson)).
Takes 7h on Macbook M1 Air.

// TODO trim to fixed number of decimals




// find biggest file in folder recursively using ls:
    ```bash
    ls -lR | grep -v '^d' | sort -k5 -n -r | head -n 10
    ```

