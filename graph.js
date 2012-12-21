window.build_with_image = function (type, year, date) {
    var html = "";
    var image_template = _.template("<div class='info-item'> \
                                        <img class='info-image' src='images/info_image/<%= filename %>'>\
                                        <p class='info-text'><%= info %></p> \
                                    </div>");

    var outcome = _.find(graph_bubble_info[year], function(oo) {
        return oo['date'] == date;
    })

    if (outcome && type === 'graph-Event') {
        html+= "<div class='info-wrapper'>";
        html+= image_template(outcome);
        html+= "</div>";
        return html;
    }
    else {
        return '';
    }
}

window.buildincidentHTML = function(idx, type) {
    var splitterMap = { 'graph-Event' : ' ', 'graph-Accident': '/' };
    var html = _.template("<div class='event-<%= type %>'>\
        <div class='incident-year'> <%= incident_year %> </div>\
        <ul id='incident-<%= type %>'>");
    var make_li = _.template(" <li>\
                                    <div class='time'><%= date %></div>\
                                    <div class='incident'> <%= incedent %> </div>\
                                    <div class='detail'>\
                                    <% if (type=='graph-Accident') { %> \
                                        <span>สถานที่&nbsp;:&nbsp;</span> <%= location %><br />\
                                        <span>ผลกระทบ&nbsp;:&nbsp;</span> <%= effect %>\
                                    <% } %>\
                                    </div>\
                                </li>");
    var obj = window[type + 'List'];
    var html_bef;
    var html_body = "";
    var year = obj[idx].year;
    var html_image = "";

    if (!_.isUndefined(obj)) {
        _.each(obj[idx], function(v, k) {
            _.extend(v, {type: type, incident_year: year });
            html_bef = html(v);
            html_body += make_li(v);
            html_body += build_with_image(type, year, v['date']);
        });
    }

    html = html_bef + html_body + "</ul></div>";

    return  html;
}

$(document).ready(function() {
    !function construct_pm_box() {
        var common_css = { 'z-index': 500, opacity: 0, width: '32', height: '32', background: 'red', position: 'absolute', top: '23px', float: 'left' };
        var e = {
            "2523-primeMinister": { left: '100px' },
            "2531-primeMinister": { left: '295px' },
            "2534-primeMinister": { left: '340px' },
            "2535-primeMinister": { left: '390px' },
            "2538-primeMinister": { left: '435px' },
            "2539-primeMinister": { left: '465px' },
            "2540-primeMinister": { left: '510px' },
            "2544-primeMinister": { left: '605px' },
            "2551-primeMinister": { left: '775px' },
            "2549-primeMinister": { left: '723px' },
            "2553-primeMinister": { left: '822px' }
        };

        _.each(e, function(i, k) {
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
                    $.colorbox({
                        html        :buildPMInfo(pmId),
                        width       :"600px",
                        opacity     :0.82,
                        height      : "75%"
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
        bindEvent(LayerManager2.funcs['graph-Factory'].data(), jQuery('[id$="factoryBubble"]'));
        bindEvent(LayerManager2.funcs['graph-GPP'].data(), jQuery('[id$="gppBubble"]'));
        bindEvent(LayerManager2.funcs['graph-Accident'].data(), jQuery('[id$="accidentBubble"]'));
        bindEvent(LayerManager2.funcs['graph-Event'].data(), jQuery('[id$="event"]'));
        bindEvent(LayerManager2.funcs['graph-people'].data(), jQuery('[id$="people-bubble"]'));
        bindEvent(LayerManager2.funcs['graph-peopleHide'].data(), jQuery('[id$="peopleHide-bubble"]'));
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

    function bindEvent(data, bubble) {
        var bindBubble = function(v, idx) {
            var t1, type, $opa;


            $(v).mouseenter(function(e) {
                var $this = $(this)
                  , $parent = $this.parent();

                t1 = new Date();
                e.stopPropagation();

                if (_.isUndefined($parent.attr('id'))) {
                    $this.css({'opacity': 1.0, 'cursor': 'pointer'});
                    type = $this.parent().parent().parent().attr('id');
                    $opa = $this.parent().parent();
                    $opa.animate({opacity: 1.0}, 0);
                }
                else {
                    $opa = undefined;
                }

                bubble.hide();
                // console.log($opa, $opa.attr('id'))

                bubble.eq(idx).fadeIn();

            })
            .click(function(e) {
                var obj = window[type + 'List'];

                var $parent = $(this).parent()
                  , id = $parent.attr('id');

                if (_.isUndefined(id)) {
                    $.colorbox({
                        html        : buildincidentHTML(idx, type),
                        width       : "600px",
                        opacity     : 0.82,
                        height      : "75%"
                    });
                }

            })
            .mouseleave(function(e){
                var t2 = new Date()
                  , diff = t2 - t1;
                var $this = $(this);

                // $this.attr({opacity: 0.5})
                // $this.parent().attr({opacity: 0.5})
                // $this.parent().parent().attr({opacity: 0.5})
                if (diff>80) {
                    setTimeout(function delayFadeOut() {
                        if ($opa) {
                            $opa.animate({opacity: 0.5});
                        }
                        bubble.eq(idx).fadeOut();
                    }, 200);
                }
                else {
                    setTimeout(function muchDelayFadeOut() {
                        if ($opa) {
                            $opa.animate({opacity: 0.5});
                        }
                        bubble.eq(idx).fadeOut();
                    }, 300);
                }
            });
        };

        var circle = $('circle', data);
        _.each(circle, function(v, idx) {
            bindBubble(v, idx);
        });
    }
})