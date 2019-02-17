function getAPOD(event) {
	event.preventDefault();

	let date = document.getElementById("date").value;
	if (date === "") {
		return;
	}
	// format date to YYYY-MM-DD

	fetch("https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=gmkr2JQnlSozUzaMAoEiS8JWdVz2RILzIAFMg0Aa") 
	.then((resp) => resp.json())
	.then((json) => {
		console.log(json);
		document.getElementById("cityForm").setAttribute("style", "border-bottom: 1px solid black;");
		let results = "";
		results += "<h2>NASAs Astronomy Picture of the Day</h2>";
		results += '<img src="' + json.hdurl + '"/>';
		results += "<p>" + json.explanation + "</p>";
		document.getElementById("apodResult").innerHTML = results;
	})
}
