kartverket data transformer
===============

Creates a MultiPolygon .geojson for each region in the abas files from kartverket.

To check the number of MultiPolygon .geojson files that will be created use:

```
sudo node transformer.js counties
sudo node transformer.js municipalities
```

Number of counties should be 19.
Number of municipalities should be 428.

To create and save all 19 or 428 .geojson files use:

```
sudo node transformer.js counties true
sudo node transformer.js municipalities true
```

PS: underscore is a requires module.
