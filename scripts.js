/**
 * @author Harry Stevens
 */

function dataLoaded() {
	google.load('visualization', '1', {
		'packages' : ['geochart'],
		callback : 'googleLoaded'
	});
}

function googleLoaded() {
	$.get('immigration2012.json', immData, 'json');
}

function immData(imm2012) {
	var dataObj = imm2012.immData;
	var dataArray = [];
	var dataHeaders = ["Country", "Green cards"];
	dataArray.push(dataHeaders);
	for (var i = 0; i < dataObj.length; i++) {
		var currObj = dataObj[i];
		var currArray = [currObj.Country, currObj.Immigrants];
		dataArray.push(currArray);
	}
	var data = google.visualization.arrayToDataTable(dataArray);
	var formatter = new google.visualization.NumberFormat({
		pattern : '###,###'
	});
	formatter.format(data, 1);
	
	//World
	var options = {
		colorAxis : {
			maxValue : 25000,
			colors : ['#fff', '#4C4646']
		},
		width : 900,
		keepAspectRatio : true,
		forceIFrame : true,
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		}
	};
	var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
	chart.draw(data, options);
	
	//Americas
	var amOptions = {
		colorAxis : {
			maxValue : 25000,
			colors : ['#fff', '#151B54']
		},
		width : 900,
		keepAspectRatio : true,
		forceIFrame : true,
		region : '019',
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		}
	}
	var amChart = new google.visualization.GeoChart(document.getElementById('am_div'));
	amChart.draw(data, amOptions);
	
	//Africa
	var afrOptions = {
		colorAxis : {
			maxValue : 15000,
			colors : ['#fff', '#330000']
		},
		width : 900,
		keepAspectRatio : true,
		forceIFrame : true,
		region : '002',
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		}
	}
	var afrChart = new google.visualization.GeoChart(document.getElementById('afr_div'));
	afrChart.draw(data, afrOptions);
	
	//Asia
	var asiaOptions = {
		colorAxis : {
			maxValue : 80000,
			colors : ['#fff', '#7F5217']
		},
		width : 900,
		keepAspectRatio : true,
		forceIFrame : true,
		region : '142',
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		}
	}
	var asiaChart = new google.visualization.GeoChart(document.getElementById('asia_div'));
	asiaChart.draw(data, asiaOptions);
	
	//Europe
	var eurOptions = {
		colorAxis : {
			maxValue : 12000,
			colors : ['#fff', '#571B7E']
		},
		width : 900,
		keepAspectRatio : true,
		forceIFrame : true,
		region : '150',
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		}
	}
	var eurChart = new google.visualization.GeoChart(document.getElementById('eur_div'));
	eurChart.draw(data, eurOptions);
	
	//Oceania
	var ocOptions = {
		colorAxis : {
			maxValue : 2500,
			colors : ['#fff', '#254117']
		},
		width : 900,
		keepAspectRatio : true,
		forceIFrame : true,
		region : '009',
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		}
	}
	var ocChart = new google.visualization.GeoChart(document.getElementById('oc_div'));
	ocChart.draw(data, ocOptions);
}

//The setNav function will enable the location nav buttons to display their respective html within the map wrapper
function setNav() {
	$(".world").on("click", function() {
		$("#mapWrapper").html("<h2>World</h2>");
		$("#chartWrapper").html("<div id='chart_div'></div>");
	});
	$(".africa").on("click", function() {
		$("#mapWrapper").html("<h2>Africa</h2><div id='afr_div'></div>");
	});
	$(".americas").on("click", function() {
		$("#mapWrapper").html("<h2>Americas</h2><div id='am_div'></div>");
	});
	$(".asia").on("click", function() {
		$("#mapWrapper").html("<h2>Asia</h2><div id='asia_div'></div>");
	});
	$(".europe").on("click", function() {
		$("#mapWrapper").html("<h2>Europe</h2><div id='eur_div'></div>");
	});
	$(".oceania").on("click", function() {
		$("#mapWrapper").html("<h2>Oceania</h2><div id='oc_div'></div>");
	});	
}

$(document).ready(function(){
	dataLoaded();
	setNav();
});