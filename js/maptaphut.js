/*
 * Logics specific to ThaiPublica Maptaphut project
 */

var graphManager;
var mapManager;
var currentCityPlanYear = 2546;
var currentYear = 2553;

var map_hidden_categories = [];

$(function() {

	var load_graph = function(callback) {
		// Create new SVGLayerManager for graph.svg. This also loads the SVG image into web page.
		graphManager = new SVGLayerManager('#svggraph', 'graph.svg', function() {
			
			// Callback to notify end of parallel operations
			callback(null, "ok");			
			
		});
	};

	var load_map = function(callback) {
		// Create new SVGLayerManager for map-test.svg. This also loads the SVG image into web page.	
		mapManager = new SVGLayerManager('#svgload', 'map-test.svg', function() {
			
			// Callback to notify end of parallel operations
			callback(null, "ok");
			
		});
	};

	async.parallel([load_graph, load_map], function (err, results) {
		var removePreloader = function(callback) {
			
			graphManager.setScope('svg > g');
			mapManager.setScope('svg > g');

			$('div.preloader').remove();
			$('div#slider-wrapper').show();
			
			callback(null, 'ok');
		}

		var createFilterController = function(callback) {
			
			// Prepare data for creating buttons and binding to mouse events
			// Note: createShowHideButton = function($targetDOM, buttonId, targetSVGs, cssClass, tipsyText, tipsyGravity)
			
			// Graphs
			_.each(graph_control_buttons, function(config) {
				createShowHideButton(config.targetDOM, config.buttonId, graphManager, config.cssClass, config.tipyText, config.tipsyGravity);
			});
			
			// Maps
			_.each(map_control_buttons, function(config) {
				createMapButton(config.targetDOM, config.buttonId, mapManager, config.cssClass, config.tipyText, config.tipsyGravity);
			});

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
			// Bind click event for Accident, Graph
			bindBubbleClickEvent('#graph-Accident > g', onClickTriggerSuffix, accidentLightboxTemplate, accident_on_graph);
			bindBubbleClickEvent('#graph-Event > g', onClickTriggerSuffix, eventLightboxTemplate, event_on_graph);

			callback(null, 'done');
		}

		var bindAccidentGraphEvent = function(callback) {
			//TODO
			callback(null, 'done');
		}
		
		var bindSliderEvent = function(callback) {
			$( "#slider-range-max" ).slider({
				value: currentYear,
				min: 2520,
				max: 2555,
				step: 1,
				animate: false,
				slide: onSlideListener
			});
			
			// Display map according to current slider position
			onSlideListener(null, {value: currentYear});
			
			callback(null, 'done');
		}
		
		var bindPrimeMinisterEvent = function(callback) {
			// This part is not changed from original script by Nat Weerawan
			var common_css = { 'z-index': 500, opacity: 0.0, width: '32', height: '32', background: 'red', position: 'absolute', top: '21px', 'float': 'left' };

            _.each(pm_face_position, function(i, k) {
              $('#slider-range-max > div').append($('<div>').attr({id: k}).css(common_css).css(i));
            });

            // ON PRIMINISTER CLICK
            $('div[id$="primeMinister"]').
                mouseover(function(e) {
                    $(this).css({ cursor: 'pointer'});

                    var pmId = $(this).attr('id').split('-')[0],
                        pmFullname = pmList[pmId] ? pmList[pmId]['fullname'] : '';
                    $(this).tipsy({
                        className: 'prime-minister-tipsy',
                        gravity: 'n',
                        fallback: 'รัฐบาล ' + pmFullname
                    })
                    .tipsy("show");
                }).
                mousedown(function(e){
                    e.stopPropagation();

                    var pmId = $(this).attr('id').split('-')[0],
                        information = buildPMInfo(pmId),
                        height = (information.length)/2;
                    
                    height -= 55 * (Math.log(height) - 5);

                    $.colorbox({
                        html        : information,
                        width       :"600px",
                        opacity     : 0.82,
                        height      : (height > 600 ? 600 : height) + 'px'
                    });
                }); // mousedown
            
            callback(null, 'done');
		}
		
		var bindInstruction = function(callback) {


			$('.information').
			mouseover(function(e){
				$(this).css({ cursor: 'pointer'});
			}).
			mousedown(function(e) {
				$.colorbox({
					html        : instruction_text,
					width       : '600px',
					opacity     : 0.82,
					height      : '300px'
				});
			});
			
			callback(null, 'done');
		}

		// If loading of map and graph is successful, 
		// continue process other operations in series.

		if (!err) {
			series_operations = [
			                     removePreloader, 
			                     createFilterController,
			                     bindMouseEvent,
			                     bindAccidentGraphEvent,
			                     bindSliderEvent,
			                     bindPrimeMinisterEvent,
			                     bindInstruction
			                     ];
			async.series(series_operations, function series_callback(err, results) {
				console.log("Series done.");
			});
		}
	});
});

var bindBubbleClickEvent = function(bindingScope, triggerSuffix, template, rawdata) {
	var extracted = $(bindingScope);

	_.each(extracted, function(g) {
		// Match suffix of each SVG element, then add mouse events if suffix matches.
		if(g.id.match("^.*" + triggerSuffix + "$")){
			
			// Filter data for the selected year 
			// Note: Logic is specific to ThaiPublica-Maptaphut project
			var year = g.id.split('-')[0];
			var yearlyData = rawdata[year];
			var headerData = {
				'incident_year': year,
				'type': 'graph-Accident'
			};

			var html = headerLightboxTemplate(headerData);

			_.each(yearlyData, function(d) {
				html = html + template(d);
			});
			
			html = html + "</ul></div>";

			bindClickToShowLightboxEvent(g, html, lightboxSettings);
		}
	});
}

var onSlideListener = function(event, ui) {
	var interval_years = [2531, 2534, 2546, 2555].reverse();
	// Put the value back for global reference
	if(ui.value) {
		currentYear = ui.value;
	}
		
	currentCityPlanYear = _.find(interval_years, function(value) {
		return (currentYear >= value);
	});
		
	if(!currentCityPlanYear) currentCityPlanYear = _.last(interval_years);
		
	// If city plan does not change, no need to change the map.
	mapManager.hideAll();
	mapManager.showByPrefix(currentCityPlanYear);
	mapManager.showByPrefix(currentYear);
	
	_.each(map_hidden_categories, function(category) {
		mapManager.hideByPrefix(currentCityPlanYear + "-" + category);
	});
	
}

var refreshMapDisplay = function() {
	
}

function buildPMInfo(year) {
    var pm = pmList[year];
    var events_html = "<ul>";
    var events_template = _.template("<li><div class='time'><%= date %></div> <div class='data-year'><%= incident %></div> </li>");
    _.each(pm['events'], function(data) {
        events_html += events_template(data);
    });
    events_html += "</ul>";

    var template = _.template("<div class='primebox'> \
                                    <img src='asset/primeminister/<%= year %>-primeMinister.png'/> \
                                    <div class='fullname'> \
                                        <%= fullname %> \
                                    </div> \
                                    <div class='-bubbleldyear'> <%= hold_years %> </div> \
                                    <p class='events'>  <%= events_html %> </p> \
                                </div>");
    var data = { fullname: pm.fullname, hold_years: pm.hold_years,
        year: year, events_html: events_html
    };

    return  template(data);
}

var createMapButton = function($targetDOM, buttonId, layerManager, cssClass, tipsyText, tipsyGravity) {
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
			
			map_hidden_categories.push(this.id);

			layerManager.hideByPrefix(currentCityPlanYear + "-" + this.id);
		} else {
			$this.addClass('selected');
			
			map_hidden_categories = _.without(map_hidden_categories, this.id);

			layerManager.showByPrefix(currentCityPlanYear + "-" + this.id);
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