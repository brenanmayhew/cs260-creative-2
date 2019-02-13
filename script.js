function test(event) {
	event.preventDefault();

	let city = document.getElementById("city").value;
	if (city === "") {
		return;
	}

	fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&APPID=b0184e6fbb04e1d5345298b370d5ca05") 
	.then((resp) => resp.json())
	.then(function(json) {
		console.log(json);
		document.getElementById("cityForm").setAttribute("style", "border-bottom: 1px solid black;");
		let results = "";
		results += '<h2>Current Weather in ' + json.name + "</h2>";
		for (let i=0; i < json.weather.length; i++) {
			results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
		}
		results += '<h2>' + json.main.temp + " &deg;F</h2>";
		results += "<p>";
		for (let i=0; i < json.weather.length; i++) {
			results += json.weather[i].description;
			if (i !== json.weather.length - 1) {
				results += ", ";
			}
		}
		results += "</p>";
		document.getElementById("weatherResults").innerHTML = results;
	})

	fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&APPID=b0184e6fbb04e1d5345298b370d5ca05") 
	.then((resp) => resp.json())
	.then(function(json) {
		console.log(json);
		let forecast = "";
		forecast += "<div class=\"col-md-12 forecastItem\">";
		forecast += "<h2 style=\"text-align: center\">5 Day, 3 Hour Forecast for " + json.city.name + "</h2>"
		forecast += "</div>"
		for (let i=0; i < json.list.length; i++) {
			forecast += "<div class=\"col-md-4 forecastItem\">";
			forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h3>";
			forecast += "<p>Temperature: " + json.list[i].main.temp + "&deg;F</p>";
			forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
			forecast += "</div>"
		}
		document.getElementById("forecastResults").innerHTML = forecast;
		document.getElementById("weather").setAttribute("style", "margin-bottom: 200px;");
	})
}
