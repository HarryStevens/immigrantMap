/**
 * @author Harry Stevens
 */

//This javascript file uses Google's geochart visualizaiton library and jQuery to draw maps with data from a json file
//and display certain maps based on certain click events from the user. It will accomplish this with the following functions:
//1. dataLoaded: Loads the Google Visualization library to make a geochart and calls the function "googleLoaded"
//2. googleLoaded: Loads the data from the json file and calls the function "immData," which is the largest function in the code
//3. immData: Formats the json data; runs it through the Google Visualization library; displays certain elements of that data on certain click events

//dataLoaded: Loads the Google Visualization library to make a geochart and calls the function googleLoaded
function dataLoaded() {
	google.load('visualization', '1', {
		'packages' : ['geochart'],
		callback : 'googleLoaded'
	});
}

//googleLoaded: Loads the immigration data from the json file and calls the function immData
function googleLoaded() {
	$.get('immigration2012.json', immData, 'json');
}

//immData: This is the main function. It:
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

	//Each section of code displays a different map (defined in the several options vars) and is activated when the corresponding button div is clicked (done mostly with jQuery).
	//A class of CSS called "active" will also be applied to indicate to the user that the button has been activated and the map is showing.
	//That CSS class will be removed when a different button is clicked and becomes active.

/*WORK IN PROGRESS... TRYING TO DO CONVENTION OVER CONFIGURATION WITH OPTIONS...
	//Options
	$(".button").on("click", function() {
		var options = {};
		var parClass = $(this).attr("class");
		var contName = parClass.split(" ")[1];
		if (contName == "world") {
			options = {
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
			}
		}//end world options if
		if (contName == "africa") {
			options = {
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
		}
	});
*/

	//World
	var worldOptions = {
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
	chart.draw(data, worldOptions);

	$(".world").on("click", function() {
		if ($(this).hasClass("active")) {
		} else {
			var parClass = $(this).attr("class");
			var contName = parClass.split(" ")[1];
			$("#mapHead").html("<h2>" + contName + "</h2>");
			$("#nav .button").removeClass("active");
			$(this).addClass("active");
			var chart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			chart.draw(data, worldOptions);
		}
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
	};

	$(".africa").on("click", function() {
		if ($(this).hasClass("active")) {
		} else {
			var parClass = $(this).attr("class");
			var contName = parClass.split(" ")[1];
			$("#mapHead").html("<h2>" + contName + "</h2>");
			$("#nav .button").removeClass("active");
			$(this).addClass("active");
			var afrChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			afrChart.draw(data, afrOptions);
		}
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
		if ($(this).hasClass("active")) {
		} else {
			var parClass = $(this).attr("class");
			var contName = parClass.split(" ")[1];
			$("#mapHead").html("<h2>" + contName + "</h2>");
			$("#nav .button").removeClass("active");
			$(this).addClass("active");
			var amChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			amChart.draw(data, amOptions);
		}
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
		if ($(this).hasClass("active")) {
		} else {
			var parClass = $(this).attr("class");
			var contName = parClass.split(" ")[1];
			$("#mapHead").html("<h2>" + contName + "</h2>");
			$("#nav .button").removeClass("active");
			$(this).addClass("active");
			var asiaChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			asiaChart.draw(data, asiaOptions);
		}
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
		if ($(this).hasClass("active")) {
		} else {
			var parClass = $(this).attr("class");
			var contName = parClass.split(" ")[1];
			$("#mapHead").html("<h2>" + contName + "</h2>");
			$("#nav .button").removeClass("active");
			$(this).addClass("active");
			var eurChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			eurChart.draw(data, eurOptions);
		}
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
		if ($(this).hasClass("active")) {
		} else {
			var parClass = $(this).attr("class");
			var contName = parClass.split(" ")[1];
			$("#mapHead").html("<h2>" + contName + "</h2>");
			$("#nav .button").removeClass("active");
			$(this).addClass("active");
			var ocChart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			ocChart.draw(data, ocOptions);
		}
	});
}

//When everything is loaded, this little bit of jQuery sets the javascript in motion by calling dataLoaded (see top of this file)
$(document).ready(function() {
	dataLoaded();
});
