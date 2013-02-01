/*!
 * SVG Layer Manager
 * Allows ability to show/hide individual SVG layers within a SVG file
 * 
 * Unnawut Leepaisalsuwanna (tuwannu@gmail.com)
 * Based on code by Nat Weerawan (nat.wrw@gmail.com)
 * 
 * Opendream.co.th
 */


// Constructor of SVGLayerManager
// Receives a SVG selector as input so that it knows which SVG to manage.
var SVGLayerManager = function(svgSelector) {
	var alwaysShowPrefixes = [];
	var scopeSelector = [];
	var scopedLayers = [];
	
	this.svg = svgSelector;
	
	scopedLayers = this.svg;
	
	console.log("SVGLayerManager for " + this.svg + " created.");
	return this;
};

// Set scope for layers that will be managed.
SVGLayerManager.prototype.setScope = function(scope) {
	this.scope = scope;
	this.scopedLayers = $(this.scope, $(this.svg));
	
	window.scopedLayers = this.scopedLayers;		// For debugging purposes
}

// Show by DOM IDs
SVGLayerManager.prototype.showByIds = function(domId) {
	var filtered = _.filter(scopedLayers, function(i) {
		return (i.id==domId);
	})

	_.each(filtered, function(i){
		$(i).show();
	});
}

// Hide by DOM IDs
SVGLayerManager.prototype.hideByIds = function(domId) {
	var filtered = _.filter(scopedLayers, function(i) {
		return (i.id==domId);
	})

	_.each(filtered, function(i){
		$(i).hide();
	});
}

// Show by prefix
SVGLayerManager.prototype.showByPrefix = function(prefixes) {
	
}

// Hide by prefix
SVGLayerManager.prototype.hideByPrefix = function(prefixes) {
	
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