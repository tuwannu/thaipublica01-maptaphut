
window.getCurrentLayers = function() {
  var selected = _.collect($('input.chooseLayer:checked'), function(el) {
    return $(el).val()
  })
  return selected
}

// LAYER MANAGER CREATER`
window.CreateLayerManager = function(group, activeLayers) {
    var funcs = { }
    var manager = { funcs: funcs }
    activeLayers = []

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
        layerArr = _.union(layerArr, ["road", "area", "primeMinister"])
        var yearArr = [(year).toString(), "other", "all"]
        var items = _.filter(funcs, function(item, k) {
            return _.contains(yearArr, item.year) && _.contains(layerArr, item.layer)
        })

        // HIDE ACTIVE LAYER
        _.each(activeLayers, function(v) { v.hide() })

        // SET NEW ACTIVE LAYER
        activeLayers = items

        _.each(items, function(item) { item.show(); })
    }

    manager.getAllLayers = function() {
        return _.clone(["accident", "พท-เกษตรกรรม", "อาศัย", "พท-อนุรักษ์", "อุตสาหกรรมคลังสินค้า", "ราชการ", "อุตสาหกรรมไม่ก่อมลพิษ", "พท-โล่งเพื่อนันทนาการ"]);
    }

    return manager;

} // LAYER MNGR CREATER


// LAYER
$('.chooseLayer').live('click', function(e) {
	e.stopPropagation()
	LayerManager.show(currentYear, getCurrentLayers())
})