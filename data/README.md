kartverket data transformer
===============

Creates a MultiPolygon .geojson for each region in the abas files from kartverket.

A region can be a municipality or county.

Run the script using node (requires underscore).

sudo node transformer.js counties true
sudo node transformer.js municipalities true

If last variable is left out (or false) .geojson files will not be created and saved. The script wil only output number of regions (MuliPloygons) present in the original data.