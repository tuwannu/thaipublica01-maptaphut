/*
 * Function Name: 	bindHideShowHoverEvent
 * Description: 	Binding of an SVG object to show another SVG object when mouse hover.
 * 					
 * ----------------
 * Function Arguments
 * ----------------
 * bindingScopeId: 	Scope of binding (uses DOM ID format e.g. "#myDiv")
 * hoverObjectSettings:		{ prefix, fadeInOpacity, fadeInDuration, fadeOutOpacity, fadeOutDuration }
 * targetObjectSettings:	{ prefix, fadeInOpacity, fadeInDuration, fadeOutOpacity, fadeOutDuration }
 * 
 */

var bindHideShowHoverEvent = function(bindingScopeId, hoverObjectSettings, targetObjectSettings) {
	var extracted = $(bindingScopeId);
	
	_.each(extracted, function(g) {
		// Match suffix of each SVG element, then add mouse events if suffix matches.
		if(g.id.match("^.*" + hoverObjectSettings['suffix'] + "$")){
			var hoverSvg = $(g);
			var targetSvg = $('#' + g.id.replace(hoverObjectSettings['suffix'], targetObjectSettings['suffix']));
			
			hoverSvg.css({'cursor': 'pointer'});
			
			hoverSvg.mouseenter(function(e){
				hoverSvg.animate({opacity: hoverObjectSettings['fadeInOpacity']}, hoverObjectSettings['fadeInDuration']);
		        targetSvg.show();
		        targetSvg.animate({opacity: targetObjectSettings['fadeInOpacity']}, targetObjectSettings['fadeInDuration']);
			});
			
			hoverSvg.mouseleave(function(e){
				hoverSvg.animate({opacity: hoverObjectSettings['fadeOutOpacity']}, hoverObjectSettings['fadeOutDuration']);
		    	targetSvg.animate({opacity: targetObjectSettings['fadeOutOpacity']}, targetObjectSettings['fadeOutDuration']);
		    	targetSvg.hide();
			});
			
		}
		
	});

};


/*
 * Function Name: 	bindClickToShowLightboxEvent
 * Description: 	Binding of an SVG object to show a lightbox with given content when clicked.
 * 					
 * ----------------
 * Function Arguments
 * ----------------
 * triggerObjectId: 	ID of the object to bind mouse click to (uses DOM ID format e.g. "#myDiv")
 * content:				Textual content to show in light box.
 * lightboxSettings:	{ opacity, width, height }
 * 
 */
var bindClickToShowLightboxEvent = function(triggerObjectId, content, lightboxSettings) {
	$(triggerObjectId).click(function(e) {
		$.colorbox({
			html        : content,
			opacity     : lightboxSettings['opacity'],
			width       : lightboxSettings['width'],
			height      : lightboxSettings['height']
		});
	});
}