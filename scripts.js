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

	//Default options
	var options = {
		colorAxis : {
			maxValue : 25000,
			colors : ['#edecec', '#4C4646']
		},
		width : 900,
		keepAspectRatio : true,
		forceIFrame : true,
		backgroundColor : {
			stroke : '#000',
			strokeWidth : 4
		}
	};

	//Options on click
	$(".button").on("click", function() {
		var parClass = $(this).attr("class");
		var contName = parClass.split(" ")[1];
		//World Options
		if (contName == "world") {
			options = {
				colorAxis : {
					maxValue : 25000,
					colors : ['#edecec', '#4C4646']
				},
				width : 900,
				keepAspectRatio : true,
				forceIFrame : true,
				backgroundColor : {
					stroke : '#000',
					strokeWidth : 4
				}
			}
		}
		//Africa Options
		if (contName == "africa") {
			options = {
				colorAxis : {
					maxValue : 15000,
					colors : ['#eae5e5', '#330000']
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
		//Americas Options
		if (contName == "americas") {
			options = {
				colorAxis : {
					maxValue : 25000,
					colors : ['#d0d1dc', '#151B54']
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
		}
		//Asia Options
		if (contName == "asia") {
			options = {
				colorAxis : {
					maxValue : 80000,
					colors : ['#e5dcd0', '#7F5217']
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
		}
		//Europe Options
		if (contName == "europe") {
			options = {
				colorAxis : {
					maxValue : 12000,
					colors : ['#ddd1e5', '#451564']
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
		}
		//Oceania Options
		if (contName == "oceania") {
			options = {
				colorAxis : {
					maxValue : 2500,
					colors : ['#bdc6b9', '#254117']
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
		}
		//End Options

		//When a given button is clicked, its options will be displayed in the mapWrapper.
		//A class of CSS called "active" will also be applied to indicate to the user that the button has been activated and the map is showing.
		//That CSS class will be removed when a different button is clicked and becomes active.
		if ($(this).hasClass("active")) {
		} else {
			$("#mapHead").html("<h2>" + contName + "</h2>");
			$("#nav .button").removeClass("active");
			$(this).addClass("active");
			//History.js for custom URLs
			History.pushState({
				state : 1
			}, "Who Wants to be an American?", "?view=" + contName);
			var chart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			chart.draw(data, options);

			//Need these vars to update share buttons based on custom URL
			var urlData = History.getState().cleanUrl;
			var queryString = urlData.split("?")[1];

			var fbStart = '<a class="facebook" href="JavaScript:window.open(';
			var fbURLStart = "'http://www.facebook.com/sharer.php?u=http://www.columbia.edu/~hjs2136/immigrant-map/index.html";
			var fbURLEnd = "','','width=657,height=400,scrollbars=1')";
			var fbEnd = '">FACEBOOK</a>';

			var twStart = '<a class="twitter" href="JavaScript:window.open(';
			var twURLStart = "'https://twitter.com/share?url=http://www.columbia.edu/~hjs2136/immigrant-map/index.html";
			var twURLEnd = "&text=This data visualization shows which nationalities received the most green cards in 2012&hashtags=immigration,dataviz&related=Harry_Stevens','','width=450,height=350')";
			var twEnd = '">TWITTER</a>';

			var goStart = '<a class="google" href="JavaScript:window.open(';
			var goURLStart = "'https://plus.google.com/share?url=http://www.columbia.edu/~hjs2136/immigrant-map/index.html";
			var goURLEnd = "','','width=657,height=400,scrollbars=1')";
			var goEnd = '">GOOGLE +</a>';

			var liStart = '<a class="linkedin" href="JavaScript:window.open(';
			var liURLStart = "'https://linkedin.com/cws/share?url=http://www.columbia.edu/~hjs2136/immigrant-map/index.html";
			var liURLEnd = "','','width=657,height=400,scrollbars=1')";
			var liEnd = '">LINKEDIN</a>';

			$("#sharebuttons").html(fbStart + fbURLStart + "?" + queryString + fbURLEnd + fbEnd + "<br />" + twStart + twURLStart + "?" + queryString + twURLEnd + twEnd + "<br />" + goStart + goURLStart + "?" + queryString + goURLEnd + goEnd + "<br />" + liStart + liURLStart + "?" + queryString + liURLEnd + liEnd);

		}//end active if

	});
	//end click handler

	//History.js to handle default states and reloads
	var urlData = History.getState().cleanUrl;
	var queryString = urlData.split("?")[1];
	if (!queryString) {
		var chart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
		chart.draw(data, options);
	} else {
		var viewName = queryString.split("=")[1];		
		if (viewName == 'world'){
			var chart = new google.visualization.GeoChart(document.getElementById('mapWrapper'));
			chart.draw(data, options);
		} else {
			$("." + viewName).click();
			$("#sharebuttons").html(fbStart + fbURLStart + "?" + queryString + fbURLEnd + fbEnd + "<br />" + twStart + twURLStart + "?" + queryString + twURLEnd + twEnd + "<br />" + goStart + goURLStart + "?" + queryString + goURLEnd + goEnd + "<br />" + liStart + liURLStart + "?" + queryString + liURLEnd + liEnd);		
		}
	}
}//end immdata

//When everything is loaded, this little bit of jQuery sets the javascript in motion by calling dataLoaded (see top of this file)
$(document).ready(function() {
	dataLoaded();
});
