// Code adapted from: https://github.com/claireellul/cegeg077-week5app/blob/master/ucfscde/www/js/appActivity.js



// a global variable to hold the http request
var client;

// store the map
var mymap;

var testMarkerRed = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'red'
});

var testMarkerPink = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'pink'
});

// this is the code that runs when the App starts

	loadMap();

// the functions

//Load map



function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
		alert("geolocation is not supported by this browser");
    }
}
function showPosition(position) {
	// draw a point on the map
	L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("<b>You were at "+ position.coords.longitude + " "+position.coords.latitude+"!</b>");mymap.setView([position.coords.latitude, position.coords.longitude], 13);
	}

//loads leaflet map
function loadMap(){
		mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(mymap);

}

var popup = L.popup();

//shows coordinates of point when leaflet map is clicked
function onMapClick(e) {
	popup
	.setLatLng(e.latlng)
	.setContent("You clicked the map at " + e.latlng.toString())
	.openOn(mymap);
	}
	// now add the click event detector to the map
	mymap.on('click', onMapClick);

//global variable
var questionslayer;

// gets the question data
function getQues() {
   // set up the request
   client = new XMLHttpRequest();
   // make the request to the URL
   client.open('GET','http://developer.cege.ucl.ac.uk:30264/getquestionData');
   // tell the request what method to run that will listen for the response
   client.onreadystatechange = quesResponse;  // note don't use earthquakeResponse() with brackets as that doesn't work
   // activate the request
   client.send();
}
// receive the response from server & processes it
function quesResponse() {
  // wait for a response - if readyState is not 4 then keep waiting 
  if (client.readyState == 4) {
    // get the data from the response
    var QuesData = client.responseText;
    // call a function that does something with the data
    loadquestionslayer(QuesData);
  }
}

//converts recieved data to JSON and adds to leaflet map
function loadquestionslayer(QuesData) {
      // convert the text received from the server to JSON 
      var Quesjson = JSON.parse(QuesData );

      // load the geoJSON layer
      var questionslayer = L.geoJson(Quesjson).addTo(mymap);
    mymap.fitBounds(questionslayer.getBounds());
	}
    