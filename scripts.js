/**
 * @author Harry Stevens
 */

//Loads the Google Visualization library to make a geochart and calls the function googleLoaded
function dataLoaded() {
	google.load('visualization', '1', {
		'packages' : ['geochart'],
		callback : 'googleLoaded'
	});
}

//Loads the immigration data from the json file
function googleLoaded() {
	$.get('immigration2012.json', immData, 'json');
}

//This is the main function. It:
// A. Formats the json data;
// B. Runs it through the Google Visualization library
// C. Displays certain elements of that data on certain click events (see below)
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

	//Each section of code displays a different map and is activated when the corresponding button div is clicked

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
	var chart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
	chart.draw(data, options);

	$(".world").on("click", function() {
		$("#mapHead").html("<h2>World</h2>");
		$(".world").addClass("active");
		$(".africa").removeClass("active");
		$(".americas").removeClass("active");
		$(".asia").removeClass("active");
		$(".europe").removeClass("active");
		$(".oceania").removeClass("active");
		var chart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
		chart.draw(data, options);
	});

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

	$(".africa").on("click", function() {
		$("#mapHead").html("<h2>Africa</h2>");
		$(".world").removeClass("active");
		$(".africa").addClass("active");
		$(".americas").removeClass("active");
		$(".asia").removeClass("active");
		$(".europe").removeClass("active");
		$(".oceania").removeClass("active");
		var afrChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
		afrChart.draw(data, afrOptions);
	});

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

	$(".americas").on("click", function() {
		$("#mapHead").html("<h2>Americas</h2>");
		$(".world").removeClass("active");
		$(".africa").removeClass("active");
		$(".americas").addClass("active");
		$(".asia").removeClass("active");
		$(".europe").removeClass("active");
		$(".oceania").removeClass("active");
		var amChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
		amChart.draw(data, amOptions);
	});

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
	$(".asia").on("click", function() {
		$("#mapHead").html("<h2>Asia</h2>");
		$(".world").removeClass("active");
		$(".africa").removeClass("active");
		$(".americas").removeClass("active");
		$(".asia").addClass("active");
		$(".europe").removeClass("active");
		$(".oceania").removeClass("active");
		var asiaChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
		asiaChart.draw(data, asiaOptions);
	});

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

	$(".europe").on("click", function() {
		$("#mapHead").html("<h2>Europe</h2>");
		$(".world").removeClass("active");
		$(".africa").removeClass("active");
		$(".americas").removeClass("active");
		$(".asia").removeClass("active");
		$(".europe").addClass("active");
		$(".oceania").removeClass("active");
		var eurChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
		eurChart.draw(data, eurOptions);
	});

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

	$(".oceania").on("click", function() {
		$("#mapHead").html("<h2>Oceania</h2>");
		$(".world").removeClass("active");
		$(".africa").removeClass("active");
		$(".americas").removeClass("active");
		$(".asia").removeClass("active");
		$(".europe").removeClass("active");
		$(".oceania").addClass("active");
		var ocChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
		ocChart.draw(data, ocOptions);
	});

}

//When everything is loaded, this little bit of jQuery sets the javascript in motion by calling dataLoaded (see top of this file)
$(document).ready(function() {
	dataLoaded();
}); 