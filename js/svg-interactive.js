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


/*
 * Function Name: 	createShowHideButton
 * Description: 	Create and bind button to show/hide a layer on SVG (where button ID = SVG ayer name).
 * 					
 * ----------------
 * Function Arguments
 * ----------------
 * targetDOM: 		Target DOM to add the button to.
 * buttonId:		ID of button (button ID needs to be the same as SVG layer name.
 * cssClass:		Additional CSS class to apply to the button.
 * tipsyText:		Tooltip text to show when hover.
 * tipsyGravity:	Position of the tooltip relative to the button.
 * 
 */
var createShowHideButton = function($targetDOM, buttonId, layerManager, cssClass, tipsyText, tipsyGravity) {
	button = $('<div></div>').
	attr({
		id: buttonId,
		value: buttonId,
		'class': cssClass + ' selected',
		'title': tipsyText
	})

	// Change mouse pointer when hover.
	button.mouseenter(function(e) {
		$(this).css({'opacity': 1.0, 'cursor': 'pointer'});
	});

	// Add on-click event listener
	button.click(function(e) {
		var $this = $(this);
		var is_selected = $this.hasClass('selected');
		
		// If already selected, remove tick + remove graph, and vice versa.
		if (is_selected) {
			$this.removeClass('selected');
			layerManager.hideByIds(this.id);
		} else {
			$this.addClass('selected');
			layerManager.showByIds(this.id);
		}
	});

	// Initiate tipsy.
	button.tipsy({
		className: cssClass + '-subclass',
		gravity: tipsyGravity
	});

	// Finally add the buttons to the document.
	$($targetDOM).append(button);
}