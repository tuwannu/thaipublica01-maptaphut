var graphManager;
var mapManager;
var currentYear = 2553;

$(function() {

	// Load SVG graph into the document, and setup SVGLayerManager for this graph.
	var load_graph = function(callback) {
		var svggraph = $('#svggraph').svg();

		// Load the SVG file into <div> and setup SVGLayerManager ready for manipulation.
		svggraph.load('graph.svg', 'get', function (svg) {
			graphManager = new SVGLayerManager('#svggraph');
			graphManager.setScope('svg > g');		// Set scope so layer manager knows what elements to look at.
			
			callback(null, "ok");
		});
		
	};

	// Load Maptaphut SVG map into the document, and setup SVGLayerManager for this map.
	var load_map = function(callback) {
		var svggraph = $('#svgload').svg();

		// Load the SVG file into <div> and setup SVGLayerManager ready for manipulation.
		svggraph.load('map-test.svg', 'get', function (svg) {
			mapManager = new SVGLayerManager('#svgload');
			mapManager.setScope('svg > g');		// Set scope so layer manager knows what elements to look at.
			
			callback(null, "ok");
		});

	};

	async.parallel([load_graph, load_map], function (err, results) {
		var removePreloader = function(callback) {
			console.log("Removing preloader.");
			$('div.preloader').remove();
			$('div#slider-wrapper').show();
			
			callback(null, 'ok');
		}

		var createFilterController = function(callback) {

			// Prepare data for creating buttons and binding to mouse events
			// Graphs
			createShowHideButton($('#graph-control'), "graph-Factory", $("#graph-Factory"), "factory", "โรงงาน", "e");
			createShowHideButton($('#graph-control'), "graph-Accident", $("#graph-Accident"), "accident", "อุบัติเหตุ", "e");
			createShowHideButton($('#graph-control'), "graph-Event", $("#graph-Event"), "event", "เหตุการณ์", "e");
			createShowHideButton($('#graph-control'), "graph-GPP", $("#graph-GPP"), "gpp", "จีพีพี (ผลิตภัณฑ์มวลรวมจังหวัด)", "e");
			createShowHideButton($('#graph-control'), "graph-people", $("#graph-people"), "people", "ประชากรท้องถิ่น", "e");
			createShowHideButton($('#graph-control'), "graph-peopleHide", $("#graph-peopleHide"), "peopleHide", "ประชากรแฝง", "e");
			
			// Maps
			createShowHideButton($('#map-control'), "อาศัย", "map-Factory", "home", "พื้นที่ที่อยู่อาศัย", "e");
			createShowHideButton($('#map-control'), "อุตสาหกรรมคลังสินค้า", "map-Factory", "factory", "อุตสาหกรรมคลังสินค้า", "e");
			createShowHideButton($('#map-control'), "พท-เกษตรกรรม", "map-Factory", "agriculture", "พื้นที่เกษตรกรรม", "e");
			createShowHideButton($('#map-control'), "อุตสาหกรรมไม่ก่อมลพิษ", "map-Factory", "green-factory", "พื้นที่อุตสาหกรรมไม่ก่อมลพิษ", "e");
			createShowHideButton($('#map-control'), "พท-อนุรักษ์", "map-Factory", "environment", "พื้นที่อนุรักษ์", "e");
			createShowHideButton($('#map-control'), "ราชการ", "map-Factory", "government", "พื้นที่ราชการ", "e");

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
                        height      :  (height > 600 ? 600 : height) + 'px'
                    });
                }); // mousedown
            
            callback(null, 'done');
		}
		
		var bindInstruction = function(callback) {
			var text = '<div class="howtouse">\
				<h3> วิธีการใช้: </h3> \
					<ol>\
						<li>เลื่อนกรอบเวลาสีฟ้าในแกน X เพื่อดูผังเมืองและจุดเกิดอุบัติภัยในปีต่างๆ</li>\
						<li>คลิกสัญลักษณ์ต่างๆ ทางด้านขวามือ เพื่อ toggle ปิดหรือเปิดชุดข้อมูล</li>\
						<li>วางเมาส์และคลิกจุดต่างๆ ในกราฟและผังเมือง เพื่อดูรายละเอียดของเหตุการณ์</li>\
						<li>คลิกรูปนายกรัฐมนตรี เพื่ออ่านนโยบายสำคัญๆ ที่เกี่ยวข้องกับมาบตาพุด</li>\
					</ol>\
				</div>';

			$('.information').
			mouseover(function(e){
				$(this).css({ cursor: 'pointer'});
			}).
			mousedown(function(e) {
				$.colorbox({
					html        : text,
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

var createShowHideButton = function($targetDOM, buttonId, targetSVGs, cssClass, tipsyText, tipsyGravity) {
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

var bindBubbleClickEvent = function(bindingScope, triggerSuffix, template, rawdata) {
	var extracted = $(bindingScope);

	_.each(extracted, function(g) {
		// Match suffix of each SVG element, then add mouse events if suffix matches.
		if(g.id.match("^.*" + triggerSuffix + "$")){
			
			// Filter data for the selected year 
			// Note: This logic is specific to ThaiPublica-Maptaphut project
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
		
	index = _.find(interval_years, function(value) {
		return (currentYear >= value);
	});
		
	if(!index) index = _.last(interval_years);
		
	// If city plan does not change, no need to change the map.
	mapManager.hideAll();
	mapManager.showByPrefix(index);
	mapManager.showByPrefix(currentYear);	
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