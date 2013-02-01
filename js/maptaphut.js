	var graphManager;
	var mapManager;

$(function() {
	
	// Load SVG graph into the document, and setup SVGLayerManager for this graph.
	var load_graph = function(callback) {
		var svggraph = $('#svggraph').svg();
		
		// Load the SVG file into <div> and setup SVGLayerManager ready for manipulation.
		svggraph.load('graph.svg', 'get', function (svg) {
			graphManager = new SVGLayerManager('#svggraph');
			graphManager.setScope('svg > g');		// Set scope so layer manager knows what elements to look at.
				
			callback(null, null);
		});
	};
	
	// Load Maptaphut SVG map into the document, and setup SVGLayerManager for this map.
	var load_map = function(callback) {
		// TODO
		
		callback(null, null);
	};

	async.parallel([load_graph, load_map], function (err, results) {
		var removePreloader = function(callback) {
			console.log("Removing preloader.");
			$('div.preloader').remove();
			$('div#slider-wrapper').show();
			callback(null, 'ok');
		}
		
		var createGraphFilter = function(callback) {
			
			// Prepare data for creating buttons and binding to mouse events
			createShowHideButton($('#graph-control'), "graph-Factory", "graph-Factory", "factory", "โรงงาน", "e");
			createShowHideButton($('#graph-control'), "graph-Accident", "graph-Accident", "accident", "อุบัติเหตุ", "e");
			createShowHideButton($('#graph-control'), "graph-Event", "graph-Event", "event", "เหตุการณ์", "e");
			createShowHideButton($('#graph-control'), "graph-GPP", "graph-GPP", "gpp", "จีพีพี (ผลิตภัณฑ์มวลรวมจังหวัด)", "e");
			createShowHideButton($('#graph-control'), "graph-people", "graph-people", "people", "ประชากรท้องถิ่น", "e");
			createShowHideButton($('#graph-control'), "graph-peopleHide", "graph-peopleHide", "peopleHide", "ประชากรแฝง", "e");
			
			callback(null, "ok");
		}
		
		var bindMouseEvent = function(callback) {
			
			// Bind hover event for Factory, GPP, People, PeopleHide
			bindHideShowHoverEvent('#graph-Factory > circle', hoverObjectSettings1, targetObjectSettings1);
			bindHideShowHoverEvent('#graph-GPP > circle', hoverObjectSettings1, targetObjectSettings1);
			bindHideShowHoverEvent('#graph-people > circle', hoverObjectSettings1, targetObjectSettings1);
			bindHideShowHoverEvent('#graph-peopleHide > circle', hoverObjectSettings1, targetObjectSettings1);
			// Bind hover event for Accident, Graph
			bindHideShowHoverEvent('#graph-Accident > g', hoverObjectSettings2, targetObjectSettings2);
			bindHideShowHoverEvent('#graph-Event > g', hoverObjectSettings2, targetObjectSettings2);
			
			bindClickToShowLightboxEvent('#graph-Accident > g', onClickTriggerSuffix);
						
			callback(null, 'done');
		}
		
		var bindAccidentGraphEvent = function(callback) {
			//TODO
			callback(null, 'done');
		}
		
		// If loading of map and graph is successful, 
		// continue process other operations in series.
		
		if (!err) {
			series_operations = [
			                     removePreloader, 
			                     createGraphFilter,
			                     bindMouseEvent,
			                     bindAccidentGraphEvent
			                     ];
			async.series(series_operations, function series_callback(err, results) {
				console.log("Series done.");
				//console.log('results in series', results);
			});
		}
	});
});

var createShowHideButton = function($targetDOM, buttonId, targetSvgId, cssClass, tipsyText, tipsyGravity) {
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
        	graphManager.hideByIds(this.id);
        } else {
        	$this.addClass('selected');
            graphManager.showByIds(this.id);
        }
    });

    // Initiate tipsy.
    button.tipsy({
        className: cssClass + '-subclass',
        gravity: tipsyGravity
    });
                
    // Finally add the buttons to the document.
    $targetDOM.append(button);
}