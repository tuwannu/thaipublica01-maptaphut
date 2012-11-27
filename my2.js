$(function() {
    var svg = $('#svgload').svg({width: 300, height: 200})

    // LOAD SVG
    svg.load('map.svg', 'get', function(mapdata) {
        var activeLayers1 = []

        var data = $('svg > g', $('#svgload'))
        window.gr = _.groupBy(data, function(i) {
            return i.id.split('_')[0] || 'other'
        })

        // CREATE LAYER MANAGER
        window.LayerManager = CreateLayerManager(gr, activeLayers1) // LAYER MANAGER

        var lays = LayerManager.getAllLayers()

        _.each(lays, function(v, k){
            var layerId = 'layer'+k
            window.elm = $('<input checked type="checkbox" name="myCheckbox" class="chooseLayer" value="'+ v +'" />'+v);
            var lbl = $('<label for="' + layerId +'">'+ v +'</label>')
            elm.attr({id: layerId })
            $('#map-layer').prepend(lbl)
            $('#map-layer').prepend(elm);
        })

        // WORK AROUND NESTED GROUP
        // $("g g").show()

        LayerManager.show(2531, lays)
    }) // LOAD SVG





});