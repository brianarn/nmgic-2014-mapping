require([
  'esri/map',
  'dojo/domReady!'
], function(Map) {
  // Create our base map
  var map = new Map('map', {
    basemap: 'topo'
  });
});
