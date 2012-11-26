$(function() {
    var svg = $('#svgload').svg({width: 300, height: 200})

    // LOAD SVG
    svg.load('map.svg', 'get', function(sth) {
        var activeLayers1 = []

        window.gr = _.groupBy($('g'), function(i) {
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
            $('body').prepend(lbl)
            $('body').prepend(elm);
        })

        $('g .accident').click(function(){
            $.colorbox({
                html        :'<b>Accident No.' + $(this).attr('id') + '</b>', 
                width       :"30%", 
                opacity     :0, 
                transition  :'none'
            });
        });

        // WORK AROUND NESTED GROUP
        $("g g").show()

        LayerManager.show(2531, lays)
    }) // LOAD SVG

    // LAYER
    $('.chooseLayer').live('click', function(e) {
      e.stopPropagation()
      LayerManager.show(currentYear, getCurrentLayers())
    });

});