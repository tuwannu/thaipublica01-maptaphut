
window.getCurrentLayers = function(id) {
    return _.pluck($(id+' div.selected'), 'value');
};

// LAYER MANAGER CREATER`
window.CreateLayerManager = function(group, activeLayers) {
    var funcs = { };
    var manager = { funcs: funcs };
    activeLayers = [];

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
                };
            ret.hide();
            return ret;
        })();

        _.extend(funcs, obj);
    });

    manager.show = function(year, layerArr, callback) {
        var yearArr = [2531, 2534, 2546, 2555];
        var yearInvertArr = yearArr.reverse();
        var current_map_year = _.find(yearInvertArr, function(y){
            return y <= year;
        });

        layerArr = _.union(layerArr, ["road", "area", "primeMinister", "accident", "cityPlan"]);
        yearArr = [(year).toString(), "other", "all", (current_map_year || 2531).toString()];
        var items = _.filter(funcs, function(item, k) {
            return _.contains(yearArr, item.year) && _.contains(layerArr, item.layer);
        });

        // HIDE ACTIVE LAYER
        _.each(activeLayers, function(v) {
            v.hide();
        });

        // SET NEW ACTIVE LAYER
        activeLayers = items;

        _.each(items, function(item) { item.show(); });
    };

    manager.getAllLayers = function() {
        return _.clone(["accident", "พท-เกษตรกรรม", "อาศัย", "พท-อนุรักษ์", "อุตสาหกรรมคลังสินค้า", "ราชการ", "อุตสาหกรรมไม่ก่อมลพิษ", "พท-โล่งเพื่อนันทนาการ"]);
    };

    return manager;

}; // LAYER MNGR CREATER