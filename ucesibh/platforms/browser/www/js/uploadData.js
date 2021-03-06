//Code adapted from: https://github.com/claireellul/cegeg077-week6formcode

//Function to upload user inputs to database table
function startDataUpload() {
	alert ("start data upload");

	var location_name = document.getElementById("location_name").value;
	var question = document.getElementById("question").value;

	
	var postString = "location_name="+location_name +"&question="+question;
	

	var answer1 = document.getElementById("answer1").value
	postString = postString + "&answer1="+answer1;

	var answer2 = document.getElementById("answer2").value;
	postString = postString + "&answer2="+answer2;
	
	var answer3 = document.getElementById("answer3").value;
	postString = postString + "&answer3="+answer3;
	var answer4 = document.getElementById("answer4").value;
	postString = postString + "&answer4="+answer4;
	
    var correct_answer = document.getElementById("correct_answer").value;
	postString = postString + "&correct_answer="+correct_answer;


	// now get the geometry values
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
	
	processData(postString);

}

var client;

//uploads data in poststring using POST functionality
function processData(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30264/uploadData',true);
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = dataUploaded;  
   client.send(postString);
}
// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
  // this function listens out for the server to say that the data is ready - i.e. has state 4
  if (client.readyState == 4) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = client.responseText;
    }
}