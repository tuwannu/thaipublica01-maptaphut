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
	this.scopedLayers = $(svgDomId).svg();
	this.originalScopedLayers = this.scopedLayers;
	
	// Once SVG is loaded, callback to the caller.
	this.scopedLayers.load(svgFilePath, 'get', function(svg) {
		cb();
		return this;
	});
	
};

// Set scope of layers that will be managed.
SVGLayerManager.prototype.setScope = function(scope) {
	this.scopedLayers = $(scope, this.originalScopedLayers);
}

// Narrow the scope of layers that will be managed.
SVGLayerManager.prototype.narrowScope = function(scope) {
	this.scopedLayers = $(scope, this.scopedLayers);
}

// Show by DOM ID
SVGLayerManager.prototype.showByIds = function(domId) {
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id==domId);
	})

	$(filtered).show();
}

// Hide by DOM ID
SVGLayerManager.prototype.hideByIds = function(domId) {
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id==domId);
	})
	
	$(filtered).hide();
}

// Show by prefix
SVGLayerManager.prototype.showByPrefix = function(prefixes) {
		
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id.match("^" + prefixes + ".*$"));
	})

	$(filtered).show();
}

// Hide by prefix
SVGLayerManager.prototype.hideByPrefix = function(prefixes) {
	
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id.match("^" + prefixes + ".*$"));
	});

	$(filtered).hide();
}

//Show by containing
SVGLayerManager.prototype.showByContaining = function(prefixes) {
		
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id.match("^.*" + prefixes + ".*$"));
	})

	$(filtered).show();
}

// Hide by containing
SVGLayerManager.prototype.hideByContaining = function(prefixes) {
	
	var filtered = _.filter(this.scopedLayers, function(i) {
		return (i.id.match("^.*" + prefixes + ".*$"));
	});

	$(filtered).hide();
}

//Hide all layers within scope
SVGLayerManager.prototype.hideAll = function() {
	this.scopedLayers.hide();
}