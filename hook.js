window.hook = { };

hook.startup = function () {




    $('document').ready(function() {
        window.currentYear = "2553";
        window.active_bubble = [];
        $( "#slider-range-max" ).slider({
            value: 2555,
            min: 2520,
            max: 2555,
            step: 1,
            animate: false,
            slide: function( event, ui ) {
                //For debug on screen
                var val = $( "#amount" ).val( ui.value );
                window.currentYear = ui.value;
                var layer_to_show = getCurrentLayers('#map-control');
                LayerManager.show(currentYear || 2555, layer_to_show);
                showGraphGuide(ui.value, ['graphOverlay']);
                !(function(year) {
                    $.each(active_bubble, function(k, v) {
                      v.css({ 'opacity': '0.5'});
                    });

                    active_bubble = [];
                    var acc =  $('#'+year+'-accident', LayerManager2.funcs['graph-Accident'].data()).eq(0);
                    var evt =  $('#'+year+'-event_', LayerManager2.funcs['graph-Event'].data()).eq(0);
                    acc.css('opacity', 1.0);
                    evt.css('opacity', 1.0);
                    active_bubble.push(acc, evt);
                }) (ui.value);
            }
        });

        //Update #amount (first time)
        $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ));

        var counter = 0;
        var inter = setInterval(function() {
            ++counter;
            if (counter>=3) {
                clearTimeout(inter);
            }
            var layer_to_show = getCurrentLayers('#map-control');
            if (LayerManager && LayerManager2) {
                LayerManager.show(2555, layer_to_show);
                LayerManager2.show('graph', ['Factory', 'Accident', 'Event', 'GPP', 'people', 'peopleHide']);
                // guideManager.show(currentYear, ['graphOverlay']);
                showGraphGuide(currentYear);
            }
        }, 600);
    });

}
