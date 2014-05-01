require([
  'esri/map',
  'esri/layers/FeatureLayer',
  'esri/InfoTemplate',
  'dojo/domReady!'
], function(Map, FeatureLayer, InfoTemplate) {
  // URL to our feature layer
  var url = 'http://gis-web.heritage.unm.edu/arcgis/rest/services/DataMgmt/MinimumConvexPolygon/MapServer/0';

  // Create our base map
  var map = new Map('map', {
    basemap: 'topo',
    center: [-106.06, 34.26], // longitude, latitude
    zoom: 6
  });

  // When the map loads, we'll take some actions
  function onMapLoaded (e) {
    console.log('Map loaded!');

    // Define our feature layer
    var featureLayer = new FeatureLayer(url, {
      outFields: ['*'],
      infoTemplate: new InfoTemplate('Scientific Name: ${ScientificName}', '${*}')
    });

    // Set up a function to execute when the layer is loaded
    function featureLayerLoaded (e) {
      console.log('Feature layer loaded!');

      map.addLayer(featureLayer);
    }

    featureLayer.on('load', featureLayerLoaded);
  }

  map.on('load', onMapLoaded);
});
