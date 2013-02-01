/*
 * Configurations specific to ThaiPublica-Maptaphut
 */

var onClickTriggerSuffix = "-bubble";

// Settings for normal graphs
var hoverObjectSettings1 = {
		'suffix': "-bubble",
		'fadeInOpacity': 1.0,
		'fadeInDuration': 0,
		'fadeOutOpacity': 1.0,
		'fadeOutDuration': 0
};
var targetObjectSettings1 = {
		'suffix': "-description",
		'fadeInOpacity': 1.0,
		'fadeInDuration': 400,
		'fadeOutOpacity': 0.0,
		'fadeOutDuration': 200
};

// Settings for Accident and Events
var hoverObjectSettings2 = {
		'suffix': "-bubble",
		'fadeInOpacity': 1.0,
		'fadeInDuration': 200,
		'fadeOutOpacity': 0.5,
		'fadeOutDuration': 300
};
var targetObjectSettings2 = {
		'suffix': "-description",
		'fadeInOpacity': 1.0,
		'fadeInDuration': 400,
		'fadeOutOpacity': 0.0,
		'fadeOutDuration': 200
};

/*
 * End of configurations
 */

// Lightbox Settings
var lightboxSettings = {
		'opacity': 0.9,
		'width': 700,
		'height': '70%'
};

// Colorbox Template
var accidentLightboxTemplate = _.template("<li><div class='time'><%= date %></div>\
		<div class='incident'> <%= incident %> </div>\
		<div class='detail'>\
			<span>สถานที่&nbsp;:&nbsp;</span> <%= location %><br />\
            <span>ผลกระทบ&nbsp;:&nbsp;</span> <%= effect %>\
</div></li>");

var eventLightboxTemplate = _.template("<li><div class='time'><%= date %></div>\
		<div class='incident'> <%= incident %> </div>\
		<div class='detail'>\
</div></li>");

var headerLightboxTemplate = _.template("<div class='event-<%= type %>'>\
		        <div class='incident-year'> <%= incident_year %> </div>\
		        <ul id='incident-<%= type %>'>");

var footerLightboxTemplate = _.template("</ul></div>");