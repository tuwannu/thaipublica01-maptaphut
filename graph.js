$(document).ready(function() {
    var svggraph = $('#svggraph').svg()
    svggraph.load('graph.svg?'+Math.random(), 'get', function (svg) {
        var data = $('svg > g', $('#svggraph'))
        window.activeLayers2 = []

        window.gr2 = _.groupBy(data, function(i) {
            return i.id.split('_')[0] || 'other'
        })

        // CREATE LAYER MANAGER
        window.LayerManager2 = CreateLayerManager(gr2, activeLayers2) // LAYER MANAGER
        LayerManager2.show('graph', ['Factory', 'Accident', 'Event', 'GPP'])
        bindEvent()
    })


    function bindEvent() {
        var graph_factory_data = LayerManager2.funcs['graph-Factory'].data();

        var bubble = jQuery('[id$="factoryBubble"]')
        _.each($('line', graph_factory_data), function(v, idx) {
            $(v).hover(function(e) {
                var $this = $(this);
                bubble.hide()
                e.stopPropagation()
                bubble.eq(idx).show()
            })
        })

        _.each($('circle', graph_factory_data), function(v, idx) {
            $(v).hover(function(e) {
                var $this = $(this);
                $this.css({'opacity': 1.0, 'cursor': 'pointer'});
                bubble.hide()
                e.stopPropagation()
                bubble.eq(idx).show()
            })
        })
    }


})