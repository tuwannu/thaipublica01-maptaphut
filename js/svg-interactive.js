/*
 * Function Name: 	bindHideShowHoverEvent
 * Description: 	Binding of an SVG object to show another SVG object when mouse hover.
 * 					
 * ----------------
 * Function Arguments
 * ----------------
 * bindingScope: 	Scope of binding (uses DOM ID format e.g. "#myDiv")
 * hoverObjectSettings:		{ prefix, fadeInOpacity, fadeInDuration, fadeOutOpacity, fadeOutDuration }
 * targetObjectSettings:	{ prefix, fadeInOpacity, fadeInDuration, fadeOutOpacity, fadeOutDuration }
 * 
 */

var bindHideShowHoverEvent = function(bindingScope, hoverObjectSettings, targetObjectSettings) {
	var extracted = $(bindingScope);
	
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

var bindClickToShowLightboxEvent = function(bindingScope, triggerSuffix) {
	var extracted = $(bindingScope);

	_.each(extracted, function(g) {
		// Match suffix of each SVG element, then add mouse events if suffix matches.
		if(g.id.match("^.*" + triggerSuffix + "$")){
			$(g).click(function(e) {
				var template = _.template("<div class='accident-map'> \
						<div class='acc_date'> <%= date %> </div> \
						<div class='acc_desc'> <%= incident %> </div> \
						<div class='acc_loc'><span>สถานที่: </span> <%= location %> </div>\
						<div class='acc_eff'><span>ผลกระทบ: </span> <%= effect %> </div>\
				</div>");

				var data = accident_on_graph['2555'][0];
				var html = template(data);

				// bind popup-event
				$.colorbox({
					html        : html,
					opacity     : 0.8,
					width       : '560px',
					height      : '400px'
				});
			});
		}
	});
}