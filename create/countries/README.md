# get countries from overpass

areas contain all sort of closed ways and relation, but they are delayed several hours

id starts with 3600... for relation and 2400... for ways

```
// countries.json
[out:json][timeout:25];
area[admin_level=2]["ISO3166-1"]["name"];
out tags qt;
```
