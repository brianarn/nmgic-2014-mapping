require([
  'esri/map',
  'dojo/domReady!'
], function(Map) {
  // Create our base map
  var map = new Map('map', {
    basemap: 'topo',
    center: [-106.06, 34.26], // longitude, latitude
    zoom: 6
  });
});
