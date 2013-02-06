
/*
 * Configurations for graph control buttons
 */
var graph_control_buttons = [
	 {
		 'targetDOM': '#graph-control',
		 'buttonId': "graph-Factory",
		 'targetSVGs': '#graph-Factory',
		 'cssClass': "factory",
		 'tipsyText': "โรงงาน",
		 'tipsyGravity': "e"
	 },{
		 'targetDOM': '#graph-control',
		 'buttonId': "graph-Accident",
		 'targetSVGs': '#graph-Accident',
		 'cssClass': "accident",
		 'tipsyText': "อุบัติเหตุ",
		 'tipsyGravity': "e"
	 },{
		 'targetDOM': '#graph-control',
		 'buttonId': "graph-Event",
		 'targetSVGs': '#graph-Event',
		 'cssClass': "event",
		 'tipsyText': "เหตุการณ์",
		 'tipsyGravity': "e"
	 },{
		 'targetDOM': '#graph-control',
		 'buttonId': "graph-GPP",
		 'targetSVGs': '#graph-GPP',
		 'cssClass': "gpp",
		 'tipsyText': "จีพีพี (ผลิตภัณฑ์มวลรวมจังหวัด)",
		 'tipsyGravity': "e"
	 },{
		 'targetDOM': '#graph-control',
		 'buttonId': "graph-people",
		 'targetSVGs': '#graph-people',
		 'cssClass': "people",
		 'tipsyText': "ประชากรท้องถิ่น",
		 'tipsyGravity': "e"
	 },{
		 'targetDOM': '#graph-control',
		 'buttonId': "graph-peopleHide",
		 'targetSVGs': '#graph-peopleHide',
		 'cssClass': "peopleHide",
		 'tipsyText': "ประชากรแฝง",
		 'tipsyGravity': "e"
	 }];

/*
 * Configurations for map control buttons
 */

map_control_buttons = [
	{
		'targetDOM': '#map-control',
		'buttonId': "อาศัย",
		'targetSVGs': '#map-Factory',
		'cssClass': "home",
		'tipsyText': "พื้นที่ที่อยู่อาศัย",
		'tipsyGravity': "e"
	},{
		'targetDOM': '#map-control',
		'buttonId': "อุตสาหกรรมคลังสินค้า",
		'targetSVGs': '#map-Accident',
		'cssClass': "factory",
		'tipsyText': "อุตสาหกรรมคลังสินค้า",
		'tipsyGravity': "e"
	},{
		'targetDOM': '#map-control',
		'buttonId': "พท-เกษตรกรรม",
		'targetSVGs': '#map-Event',
		'cssClass': "agriculture",
		'tipsyText': "พื้นที่เกษตรกรรม",
		'tipsyGravity': "e"
	},{
		'targetDOM': '#map-control',
		'buttonId': "อุตสาหกรรมไม่ก่อมลพิษ",
		'targetSVGs': '#map-GPP',
		'cssClass': "green-factory",
		'tipsyText': "พื้นที่อุตสาหกรรมไม่ก่อมลพิษ",
		'tipsyGravity': "e"
	},{
		'targetDOM': '#map-control',
		'buttonId': "พท-อนุรักษ์",
		'targetSVGs': '#map-people',
		'cssClass': "environment",
		'tipsyText': "พื้นที่อนุรักษ์",
		'tipsyGravity': "e"
	},{
		'targetDOM': '#map-control',
		'buttonId': "ราชการ",
		'targetSVGs': '#map-peopleHide',
		'cssClass': "government",
		'tipsyText': "พื้นที่ราชการ",
		'tipsyGravity': "e"
	}];

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

// Slider range
var sliderConfig = {
	'min': 2520,
	'max': 2555,
	'step': 1
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

// Instruction Text

var instruction_text = '<div class="howtouse">\
	<h3> วิธีการใช้: </h3> \
		<ol>\
			<li>เลื่อนกรอบเวลาสีฟ้าในแกน X เพื่อดูผังเมืองและจุดเกิดอุบัติภัยในปีต่างๆ</li>\
			<li>คลิกสัญลักษณ์ต่างๆ ทางด้านขวามือ เพื่อ toggle ปิดหรือเปิดชุดข้อมูล</li>\
			<li>วางเมาส์และคลิกจุดต่างๆ ในกราฟและผังเมือง เพื่อดูรายละเอียดของเหตุการณ์</li>\
			<li>คลิกรูปนายกรัฐมนตรี เพื่ออ่านนโยบายสำคัญๆ ที่เกี่ยวข้องกับมาบตาพุด</li>\
		</ol>\
	</div>';