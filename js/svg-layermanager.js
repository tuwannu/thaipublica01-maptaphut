/*!
 * SVG Layer Manager
 * Allows ability to show/hide SVG layers within a SVG file
 * 
 * Unnawut Leepaisalsuwanna (tuwannu@gmail.com)
 * Based on code by Nat Weerawan (nat.wrw@gmail.com)
 * 
 * Opendream.co.th
 */


// Constructor
// Receives a DOM ID, then loads file into given DOM ID.
var SVGLayerManager = function(svgDomId, svgFilePath, cb) {		
	this.svgDomId = svgDomId;
	this.scopedLayers = $(svgDomId).svg();
	
	this.scopedLayers.load(svgFilePath, 'get', function(svg) {
		cb();
		return this;
	});
	
};

// Set scope for layers that will be managed.
SVGLayerManager.prototype.setScope = function(scope) {
	this.scopedLayers = $(scope, this.scopedLayers);
}

// Show by DOM IDs
SVGLayerManager.prototype.showByIds = function(domId) {
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id==domId);
	})

	_.each(filtered, function(i){
		$(i).show();
	});
}

// Hide by DOM IDs
SVGLayerManager.prototype.hideByIds = function(domId) {
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id==domId);
	})
	
	console.log(this.scopedLayers);

	_.each(filtered, function(i){
		$(i).hide();
	});
}

// Show by prefix
SVGLayerManager.prototype.showByPrefix = function(prefixes) {
		
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id.match("^" + prefixes + ".*$"));
	})

	_.each(filtered, function(i){
		$(i).show();
	});
}

// Hide by prefix
SVGLayerManager.prototype.hideByPrefix = function(prefixes) {
	
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id.match("^" + prefixes + ".*$"));
	})

	_.each(filtered, function(i){
		$(i).hide();
	});
}

SVGLayerManager.prototype.hideAll = function() {
	this.scopedLayers.hide();
}

SVGLayerManager.prototype.groupBy = function(groupcondition) {
	console.log("Grouping by: " + groupcondition);
	
	var svglayergroups = $('svg > g', $(this.selector));
	
	var groupings = _.groupBy(svglayergroups, function(i) {
		return i.id.split(groupcondition)[0] || 'other';
	});

	return groupings;
};

SVGLayerManager.prototype.show = function(year, layerArr, callback) {
    var layer_to_show = _.union(base_layer, layerArr);

    // YEAR FOR ACCIDENT & SNAPPED YEAR FOR MAP-LAYOUT
    prefix_to_show = _.union(base_prefix, (year).toString(), fallback_prefix_fn([], year));

    var items_to_show = _.filter(funcs, function(item, k) {
        return _(alwaysShowPrefixes).contains(item.year) && _.contains(alwaysShowPrefixes, item.layer);
    });


    // HIDE ACTIVE LAYER
    _.each(activeLayers, function(v) {
        v.hide();
    });

    // SET NEW ACTIVE LAYER
    activeLayers = items_to_show;

    _.each(items_to_show, function(item) { item.show(); });

    return manager;
};