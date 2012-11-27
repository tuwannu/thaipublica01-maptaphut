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

        // BIND EVENT
        bindEvent(LayerManager2.funcs['graph-Factory'].data(), jQuery('[id$="factoryBubble"]'))
        bindEvent(LayerManager2.funcs['graph-GPP'].data(), jQuery('[id$="gppBubble"]'))
    })


    function bindEvent(data, bubble) {
        var bindBubble = function(v, idx) {
            var t1;
            $(v).mouseenter(function(e) {
                t1 = new Date();
                console.log('enter')
                var $this = $(this);
                bubble.hide()
                e.stopPropagation()
                bubble.eq(idx).show()
            })
            .mouseleave(function(e){
                var t2 = new Date();
                var diff = t2 - t1;
                console.log(diff)
                if (diff>80) {
                    bubble.eq(idx).fadeOut()
                }
                else {
                   setTimeout(function() {
                        bubble.eq(idx).fadeOut()
                    }, 300)
                }
            })
        }
        // _.each($('line', data), function(v, idx) {
        //         bindBubble(v, idx)
        // })

        _.each($('circle', data), function(v, idx) {
                bindBubble(v, idx)
        })
    }


})