$(function() {
    var svg = $('#svgload').svg({width: 300, height: 200});

    // LOAD SVG
    svg.load('map-test.svg', 'get', function(mapdata) {
        var activeLayers1 = [];
        var data = $('svg > g', $('#svgload'));
        window.gr = _.groupBy(data, function(i) {
            return i.id.split('_')[0] || 'other';
        });

        // CREATE LAYER MANAGER
        window.LayerManager = CreateLayerManager(gr, activeLayers1); // LAYER MANAGER
        window.hook['startup']();
    }); // LOAD SVG

});