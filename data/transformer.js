/*jslint 
    node: true, 
    nomen: true, 
    vars: true 
*/
/*global 
 */

'use strict';

var _ = require('underscore');
var fs = require('fs');

var regionType = process.argv[2];
var createFile = process.argv[3];

console.log("Region type: " + regionType);
console.log("Create file: " + createFile);

var regionsJSON = require('./original/' + regionType + '.json').features;

var multiPolygonCollection = {};

_.each(regionsJSON, function (regionJSON) {
    
    var regionId = regionJSON.properties.komm;
    
    if(!regionId)
      regionId = regionJSON.properties.fylkesnr;
  
    var regionPolygonCoordinates = regionJSON.geometry.coordinates;

    if (!multiPolygonCollection[regionId]) {
        multiPolygonCollection[regionId] = {};
        multiPolygonCollection[regionId].type = "MultiPolygon";
        multiPolygonCollection[regionId].coordinates  = [regionPolygonCoordinates];
    } else {
        multiPolygonCollection[regionId].coordinates.push(regionPolygonCoordinates);
    }

});

console.log("# of regions with MultiPolygon: " + _.size(multiPolygonCollection));

if(createFile) {
  
  _.each(multiPolygonCollection, function (regionMultiPolygonJSON, regionId) {
    
    if (regionType == "municipalities" && regionId < 1000)
      regionId = "0" + regionId;
    else if (regionType == "counties" && regionId < 10)
      regionId = "0" + regionId;  
    else
      regionId = regionId.toString();
    
    try
    {
      fs.writeFileSync('transformed/' + regionType + '/' + regionId + '.geojson', JSON.stringify(regionMultiPolygonJSON));
      console.log(regionId + '.geojson');
    }
    catch(err)
    {
      console.log('Error: ' + regionId + '.geojson - ' + err);
    }
    
  });
  
}
