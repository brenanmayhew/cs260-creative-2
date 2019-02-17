$(document).ready(function(){
  var date_input=$('input[name="date"]'); //our date input has the name "date"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
  };
  date_input.datepicker(options);
})

function getAPOD(event) {
	event.preventDefault();

	let date = document.getElementById("date").value;
	if (date === "") {
		return;
	}
	let newDate = date.split('/');
	date = newDate[2] + '-' + newDate[0] + '-' + newDate[1];
	console.log(date);

	fetch("https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=gmkr2JQnlSozUzaMAoEiS8JWdVz2RILzIAFMg0Aa") 
	.then((resp) => resp.json())
	.then((json) => {
		console.log(json);
		let results = "";
		results += "<h2>NASAs Astronomy Picture of the Day</h2>";
		results += '<img src="' + json.hdurl + '"/>';
		results += "<p>" + json.explanation + "</p>";
		document.getElementById("apodResult").innerHTML = results;
	})
}
