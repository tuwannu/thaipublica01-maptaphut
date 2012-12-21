window.hook = { };

hook.startup = function () {

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
            }];

    // CREATE MAP CONTROL
    var lays = LayerManager.getAllLayers('#map-control');
    var createControlButton = function(data, $target, callback, prefixId) {
        _.each(data, function(item, k){
            var layerId = 'layer'+k;

            var _prefixId = prefixId || '';
            if (_prefixId.length) {
                _prefixId = prefixId + '-';
            }
            elm = $('<div></div>').
                attr({
                    id: _prefixId + layerId.toString(),
                    value: item.key,
                    'class': item['class'],
                    'selected': true,
                    'title': item['text']
                }).
                css({float: 'left', width: '76px', height: '36px'});
            elm.addClass('selected');
            elm.mouseenter(function(e) {
                $(this).css({'opacity': 1.0, 'cursor': 'pointer'});
            });
            elm.click(function(e) {
                // e.preventDefault();
                var $this = $(this);
                var $attr = $this.attr('selected');
                if ($attr) {
                    $this.removeClass('selected');
                }
                else {
                    $this.addClass('selected');
                }
                $(this).attr('selected', !$attr);
                if (_.isFunction(callback)) {
                    callback();
                }
            });

            // Initial tipsy.
            elm.tipsy({
                className: _prefixId + 'class ' + item['class'] + '-subclass',
                gravity: item['tipsyGravity']
            });

            $target.append(elm);
        });
    };

    // TOGGLE
    createControlButton(map_control_labels, $('#map-control'), function(){
        LayerManager.show(currentYear || 2531, getCurrentLayers('#map-control'));
    }, 'area-filter');

    createControlButton(graph_control_labels, $('#graph-control'), function(){
        LayerManager2.show('graph', getCurrentLayers('#graph-control'));
    }, 'graph-filter');

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
            var my_position = _.indexOf(ids, myid)
            console.log("MY POSITION = ", my_position, myid, ids);
            // a = accident_on_graph[year];
            // b = ids;
            // _.each(a, function(i, k) {
            //   var obj = { }
            //   obj[b[k]] = i; console.log(obj)
            //   _.extend(v, obj)
            // })
            // console.log(accident_on_graph[year], ids);

            // var data = {
            //         date: accidentList[accId][0],
            //         desc: accidentList[accId][1],
            //         location: accidentList[accId][2],
            //         effect: accidentList[accId][3]
            //     };


            data = accident_on_graph[year][my_position];


            var html = template(data);

            var image_template = _.template("<div class='info-item'> \
                                            <img class='info-image' src='images/info_image/<%= filename %>'>\
                                            <p class='info-text'><%= info %></p> \
                                        </div>");


            if (acc_image[year]) {
                html+= "<div class='info-wrapper accident'>";
                    _.each(acc_image[year], function(oo) { html+= image_template(oo); });
                html+= "</div>";
            }
            $.colorbox({
                html        : html,
                opacity     :0.8,
                // transition  : 'fade',
                width       : '560px',
                height      : '600px'

                // transition: 'fade'
            });

            //$(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});
    });

    $('document').ready(function() {
        window.currentYear = "2553"
        $( "#slider-range-max" ).slider({
            value: 2555,
            min: 2520,
            max: 2555,
            step: 1,
            animate: false,
            slide: function( event, ui ) {
                //For debug on screen
                var val = $( "#amount" ).val( ui.value );
                window.currentYear = ui.value
                var layer_to_show = getCurrentLayers('#map-control');
                LayerManager.show(currentYear || 2555, layer_to_show);
                showGraphGuide(ui.value, ['graphOverlay']);
            }
        });

        //Update #amount (first time)
        $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ));

        var counter = 0;
        var inter = setInterval(function() {
            ++counter;
            if (counter>=3) {
                clearTimeout(inter)
            }
            var layer_to_show = getCurrentLayers('#map-control');
            if (LayerManager && LayerManager2) {
                LayerManager.show(2555, layer_to_show);
                LayerManager2.show('graph', ['Factory', 'Accident', 'Event', 'GPP', 'people', 'peopleHide']);
                // guideManager.show(currentYear, ['graphOverlay']);
                showGraphGuide(currentYear)
            }
        }, 400);
    });

}
