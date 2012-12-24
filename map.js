$(function() {
    var load_map = function(callback) {
        var svg = $('#svgload').svg({width: 300, height: 200});
        // LOAD SVG
        svg.load('map-test.svg', 'get', function(mapdata) {
            var activeLayers1 = [];
            var data = $('svg > g', $('#svgload'));
            var gr = _.groupBy(data, function(i) {
                return i.id.split('_')[0] || 'other';
            });

            // CREATE LAYER MANAGER
            var LayerManager = CreateLayerManager(gr, activeLayers1); // LAYER MANAGER
            callback(null, LayerManager);
            // window.hook['startup']();
        }); // LOAD SVG
    }

    var load_graph = function(callback) {
        var svggraph = $('#svggraph').svg();
        svggraph.load('graph.svg?'+Math.random(), 'get', function (svg) {
            var data = $('svg > g', $('#svggraph'));
            var activeLayers2 = [];

            var gr2 = _.groupBy(data, function(i) {
                return i.id.split('_')[0] || 'other';
            });

            // CREATE LAYER MANAGER
            var LayerManager2 = CreateLayerManager(gr2, activeLayers2); // LAYER MANAGER
            LayerManager2.show('graph', ['Factory', 'Accident', 'Event', 'GPP', 'people', 'peopleHide']);

            // BIND EVENT

            setTimeout(function() {
            }, 1);

            callback(null, LayerManager2);
        });
    };

    var create_guide_manager = function(callback) {
        var guideManager;
        var act_guide = [];
        var __gr2__ = _.groupBy($('#graph-overlay g'), function(i) { return i.id.split('_')[0] || 'other'; });
        guideManager = CreateLayerManager(__gr2__, act_guide);
        callback(null, guideManager);
    };

    // LOAD SVG PARALLELY.
    async.parallel([load_map, load_graph], function (err, results) {

        // Construct operatons object
        var operations = {
            make_global_variable: function(cb) {
                window.LayerManager  = results[0];
                window.LayerManager2 = results[1];

                cb(null, 'done');
            },
            hook_startup: function(cb) {
                var results = hook['startup']();

                console.log("DOING hook_startup");

                cb(null, results);
            },
            bind_bubbleEvents: function(cb) {
                bind_bubbleEvent(LayerManager2.funcs['graph-Factory'].data(), jQuery('[id$="factoryBubble"]'));
                bind_bubbleEvent(LayerManager2.funcs['graph-GPP'].data(), jQuery('[id$="gppBubble"]'));
                bind_bubbleEvent(LayerManager2.funcs['graph-Accident'].data(), jQuery('[id$="accidentBubble"]'));
                bind_bubbleEvent(LayerManager2.funcs['graph-Event'].data(), jQuery('[id$="event"]'));
                bind_bubbleEvent(LayerManager2.funcs['graph-people'].data(), jQuery('[id$="people-bubble"]'));
                bind_bubbleEvent(LayerManager2.funcs['graph-peopleHide'].data(), jQuery('[id$="peopleHide-bubble"]'));

                cb(null, 'done');
            },
            bind_graphEvents: function(cb) {
                var common_css = { 'z-index': 500, opacity: 0.0, width: '32', height: '32', background: 'red', position: 'absolute', top: '21px', float: 'left' };

                _.each(pm_face_position, function(i, k) {
                  $('#slider-range-max > div').append($('<div>').attr({id: k}).css(common_css).css(i));
                });

                // ON PRIMINISTER CLICK
                $('div[id$="primeMinister"]').
                    mouseover(function(e) {
                        $(this).css({ cursor: 'pointer'});

                        var pmId = $(this).attr('id').split('-')[0],
                            pmFullname = pmList[pmId] ? pmList[pmId]['fullname'] : '';
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
                    }); // mousedown

                cb(null, 'done');
            },
            create_graph_and_map_controller: function(cb) {
                var graph_control_labels = [{
                        "key": "Factory",
                        "class": "factory",
                        "text": "โรงงาน",
                        "tipsyGravity": "e"
                    },
                    {
                        "key": "Accident",
                        "class": "accident",
                        "text": "อุบัติเหตุ",
                        "tipsyGravity": "e"

                    },
                    {
                        "key": "Event",
                        "class": "event",
                        "text": "เหตุการณ์",
                        "tipsyGravity": "e"

                    },
                    {
                        "key": "GPP",
                        "class": "gpp",
                        "text": "จีพีพี (ผลิตภัณฑ์มวลรวมจังหวัด)",
                        "tipsyGravity": "e"
                    },
                    {
                        "key": "people",
                        "class": "people",
                        "text": "ประชากรท้องถิ่น",
                        "tipsyGravity": "e"
                    },
                    {
                        "key": "peopleHide",
                        "class": "peopleHide",
                        "text": "ประชากรแฝง",
                        "tipsyGravity": "e"
                    }
                ];

                var map_control_labels = [{
                            "key": "อาศัย",
                            "class": "home",
                            "text": "พื้นที่ที่อยู่อาศัย",
                            "tipsyGravity": "e"
                        }, {
                            "key": "อุตสาหกรรมคลังสินค้า",
                            "class": "factory",
                            "text": "พื้นที่อุตสาหกรรมคลังสินค้า",
                            "tipsyGravity": "e"
                        }, {
                            "key": "พท-เกษตรกรรม",
                            "class": "agriculture",
                            "text": "พื้นที่เกษตรกรรม",
                            "tipsyGravity": "e"
                        }, {
                            "key": "อุตสาหกรรมไม่ก่อมลพิษ",
                            "class": "green-factory",
                            "text": "พื้นที่อุตสาหกรรมที่ไม่ก่อมลพิษ",
                            "tipsyGravity": "e"
                        }, {
                            "key": "พท-อนุรักษ์",
                            "class": "environment",
                            "text": "พื้นที่อนุรักษ์",
                            "tipsyGravity": "e"
                        }, {
                            "key": "ราชการ",
                            "class": "government",
                            "text": "พื้นที่ราชการ",
                            "tipsyGravity": "e"
                        }
                ];

                // CREATE MAP CONTROL
                var lays = LayerManager.getAllLayers('#map-control');

                // TOGGLE
                createControlButton(map_control_labels, $('#map-control'), function(){
                    LayerManager.show(currentYear || 2531, getCurrentLayers('#map-control'));
                }, 'area-filter');

                createControlButton(graph_control_labels, $('#graph-control'), function(){
                    LayerManager2.show('graph', getCurrentLayers('#graph-control'));
                }, 'graph-filter');

                cb(null, 'done');
            },
            bind_click_accident_map: function(cb) {
                // Bind click on accident
                $('image[id*="accident"]').
                    mouseenter(function(e) {
                        $(this).css({cursor: 'pointer'});
                    }).
                    click(function(){
                        var $this = $(this);
                        var elmId = $this.attr('id').split('accident')[1];
                        var accId = parseInt(elmId, 10) - 1;
                        var template = _.template("<div class='accident-map'> \
                                                        <div class='acc_date'> <%= date %> </div> \
                                                        <div class='acc_desc'> <%= incedent %> </div> \
                                                        <div class='acc_loc'><span>สถานที่: </span> <%= location %> </div>\
                                                        <div class='acc_eff'><span>ผลกระทบ: </span> <%= effect %> </div>\
                                                   </div>");
                        var acc_image = {
                            "2540": [{
                                "filename": "2540-01juneAccident.png",
                                "info": "วันที่ 23 มิย. 40 เกิดปัญหามลพิษทางอากาศ นักเรียนรร.มาบตาพุดพันพิทยาคารนับร้อยถูกหามส่งรพ."
                            }],
                            "2547": [{
                                "filename": "2547-02decAccident.png",
                                "info": "วันที่ 3 ธค. 47 เพลิงไหม้โกดังเก็บวัตถุดิบสำหรับผลิตพีวีซีหรือพลาสติกแผ่นแข็ง โรงงานซีพีเจริญโภคภัณฑ์ปิโตรเคมี จำกัด กิงอำเภอนิคมพัฒนา จ. ระยอง"
                            }],
                            "2555": [{
                                "filename": "2555-03decAccident.png",
                                "info": "วันที่ 5 ธค. 55 เหตุเพลิงไหม้โรงงานบ.บีเอสที อิลาสโตเมอร์ส จำกัด"
                            }]
                        };

                        $nat = $this;
                        var year = _.first($this.parent().attr('id').split('-'));
                        var siblings = $('image[id*="accident"]', $this.parent());
                        var ids = _.filter(_.collect(siblings, function(o) { return o.id }), function(oo) {
                            return oo.indexOf("Img") === -1;
                        });

                        var myid = $this.attr('id').replace("Img-", "");
                        var my_position = _.indexOf(ids, myid);

                        data = accident_on_graph[year][my_position];


                        var html = template(data);

                        var image_template = _.template("<div class='info-item'> \
                                                        <img class='info-image' src='images/info_image/<%= filename %>'>\
                                                        <p class='info-text'><%= info %></p> \
                                                    </div>");


                        var factor = 0;
                        if (acc_image[year]) {
                            html+= "<div class='info-wrapper accident'>";
                                _.each(acc_image[year], function(oo) { html+= image_template(oo); });
                            html+= "</div>";
                            factor+= 310;
                        }
                        $.colorbox({
                            html        : html,
                            opacity     :0.8,
                            // transition  : 'fade',
                            width       : '560px',
                            height      : ((300+factor)).toString() +'px'

                            // transition: 'fade'
                        });
                });

                cb(null, 'done')
            }
        };

        // Do it serially
        if (!err) {
            async.series(operations, function series_callback(err, results) {
                console.log('results in series', results);
            });
        }
    });
});