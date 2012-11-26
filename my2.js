
window.getCurrentLayers = function() {
  var selected = _.collect($('input.chooseLayer:checked'), function(el) {
    return $(el).val()
  })
  return selected
}



$(function() {
    var svg = $('#svgload').svg({width: 300, height: 200})

    // LOAD SVG
    svg.load('map.svg', 'get', function(sth) {

        window.gr = _.groupBy($('g'), function(i) {
            return i.id.split('_')[0] || 'other'
        })

        // LAYER MANAGER
        window.LayerManager = (function(group) {
            var funcs = { }
            var manager = { funcs: funcs }
            window.activeLayer = []

            // CREATE FUNCTION WITH CAPTURED-VARIABLE
            _.each(group, function(v, k) {
                var year = k.split('-')[0];
                var obj = {};
                obj[k] = (function() {
                    var captured_obj = v
                      , ret = {
                            layer: k.split('-').slice(1).join('-') || 'no',
                            year: year,
                            hide: function() {
                                $(captured_obj).hide();
                            },
                            show: function() {
                                $(captured_obj).show();
                            },
                            data: function() {
                                return captured_obj;
                            }
                        }
                    ret.hide();
                    return ret
                })()
                _.extend(funcs, obj)
            })

            manager.show = function(year, layerArr, callback) {
                layerArr = _.union(layerArr, ["road", "area"])
                var yearArr = [(year).toString(), "other"]
                var items = _.filter(funcs, function(item, k) {
                    return _.contains(yearArr, item.year) && _.contains(layerArr, item.layer)
                })

                // HIDE ACTIVE LAYER
                _.each(window.activeLayer, function(v) { v.hide() })

                // SET NEW ACTIVE LAYER
                window.activeLayer = items

                _.each(items, function(item) { item.show(); })
            }

            manager.getAllLayers = function() {
                return _.clone(["accident", "พท-เกษตรกรรม", "อาศัย", "พท-อนุรักษ์", "อุตสาหกรรมคลังสินค้า", "ราชการ", "อุตสาหกรรมไม่ก่อมลพิษ", "พท-โล่งเพื่อนันทนาการ"]);
            }

            return manager;

        }(gr)) // LAYER MANAGER

        var lays = LayerManager.getAllLayers()
        _.each(lays, function(v, k){
            var layerId = 'layer'+k
            window.elm = $('<input checked type="checkbox" name="myCheckbox" class="chooseLayer" value="'+ v +'" />'+v);
            var lbl = $('<label for="' + layerId +'">'+ v +'</label>')
            elm.attr({id: layerId })
            $('body').prepend(lbl)
            $('body').prepend(elm);
        })

        LayerManager.show(2531, lays)
    }) // LOAD SVG

    // LAYER
    $('.chooseLayer').live('click', function(e) {
      e.stopPropagation()
      LayerManager.show(currentYear, getCurrentLayers())
    })
});