
$(document).ready(function() {
    !function construct_pm_box() {
        var common_css = { 'z-index': 500, opacity: 0.0, width: '32', height: '32', background: 'red', position: 'absolute', top: '21px', float: 'left' };

        _.each(pm_face_position, function(i, k) {
          $('#slider-range-max > div').append($('<div>').attr({id: k}).css(common_css).css(i));
        });
    }();

    // ON PRIMINISTER CLICK
    $('div[id$="primeMinister"]').
        mouseover(function(e) {
            $(this).css({ cursor: 'pointer'});

            var pmId = $(this).attr('id').split('-')[0],
                pmFullname = pmList[pmId] ? pmList[pmId]['fullname'] : ''
            ;
            $(this).tipsy({
                className: 'prime-minister-tipsy',
                gravity: 'n',
                fallback: 'รัฐบาล ' + pmFullname
            })
            .tipsy("show");
        }).
        mousedown(function(e){
            e.stopPropagation();

            var pmId = $(this).attr('id').split('-')[0];
            var information = buildPMInfo(pmId);
            var height = (information.length)/2;

            $.colorbox({
                html        : information,
                width       :"600px",
                opacity     : 0.82,
                height      :  (height > 600 ? 600 : height) + 'px'
            });
        });

    var svggraph = $('#svggraph').svg();
    svggraph.load('graph.svg?'+Math.random(), 'get', function (svg) {
        var data = $('svg > g', $('#svggraph'));
        window.activeLayers2 = [];

        window.gr2 = _.groupBy(data, function(i) {
            return i.id.split('_')[0] || 'other';
        });

        // CREATE LAYER MANAGER
        window.LayerManager2 = CreateLayerManager(gr2, activeLayers2); // LAYER MANAGER
        LayerManager2.show('graph', ['Factory', 'Accident', 'Event', 'GPP', 'people', 'peopleHide']);

        // BIND EVENT

        setTimeout(function() {
            bind_bubbleEvent(LayerManager2.funcs['graph-Factory'].data(), jQuery('[id$="factoryBubble"]'));
            bind_bubbleEvent(LayerManager2.funcs['graph-GPP'].data(), jQuery('[id$="gppBubble"]'));
            bind_bubbleEvent(LayerManager2.funcs['graph-Accident'].data(), jQuery('[id$="accidentBubble"]'));
            bind_bubbleEvent(LayerManager2.funcs['graph-Event'].data(), jQuery('[id$="event"]'));
            bind_bubbleEvent(LayerManager2.funcs['graph-people'].data(), jQuery('[id$="people-bubble"]'));
            bind_bubbleEvent(LayerManager2.funcs['graph-peopleHide'].data(), jQuery('[id$="peopleHide-bubble"]'));
        }, 1);

        window.guideManager;

        var act_guide = [];
        var __gr2__ = _.groupBy($('#graph-overlay g'), function(i) { return i.id.split('_')[0] || 'other'; });
        guideManager = CreateLayerManager(__gr2__, act_guide);
    });
    function buildPMInfo(year) {
        var pm = pmList[year];
        var events_html = "<ul>";
        var events_template = _.template("<li><div class='time'><%= date %></div> <div class='data-year'><%= incident %></div> </li>");
        _.each(pm['events'], function(data) {
            events_html += events_template(data);
        });
        events_html += "</ul>";

        var template = _.template("<div class='primebox'> \
                                        <img src='asset/primeminister/<%= year %>-primeMinister.png'/> \
                                        <div class='fullname'> \
                                            <%= fullname %> \
                                        </div> \
                                        <div class='-bubbleldyear'> <%= hold_years %> </div> \
                                        <p class='events'>  <%= events_html %> </p> \
                                    </div>");
        var data = { fullname: pm.fullname, hold_years: pm.hold_years,
            year: year, events_html: events_html
        };

        return  template(data);
    }

});