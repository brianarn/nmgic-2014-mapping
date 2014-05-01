require([
  'esri/map',
  'esri/layers/FeatureLayer',
  'esri/InfoTemplate',
  'esri/Color',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleFillSymbol',
  'esri/renderers/SimpleRenderer',
  'dojo/domReady!'
], function(Map, FeatureLayer, InfoTemplate, Color, SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer) {
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

      // Let's add a definition expression
      featureLayer.setDefinitionExpression('Shape_Area < 2000000000 AND Shape_Area > 1000000000');

      // Create our SimpleLineSymbol for shape borders
      var outline = new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID, // Line style
        new Color('black'), // Line color
        2 // Line width
      );

      // Create our fill symbol
      var fillSymbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID, // Fill style
        outline, // Outline symbol as defined above
        new Color([0, 0, 255, 0.25]) // Fill color, Blue at 25% opacity
      );

      // Create a renderer for use with the feature layer, using our fill symbol
      var renderer = new SimpleRenderer(fillSymbol);
      featureLayer.setRenderer(renderer);

      map.addLayer(featureLayer);
    }

    featureLayer.on('load', featureLayerLoaded);
  }

  map.on('load', onMapLoaded);
});
