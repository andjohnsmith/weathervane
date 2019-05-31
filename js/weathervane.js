function addForecast() {
	var lat = $("#lat").val();
	var lon = $("#lon").val();
	
	$.ajax({
		type: "GET",
		url: "http://forecast.weather.gov/MapClick.php",
		data: {lat: lat, lon: lon, FcstType: "json"},
		success: makeFcst
	});
}

function makeFcst(fcst) {
	var f = parseFcst(fcst);
	
	$("#container").append("<div class='forecast' id='cur-fcst'></div>");
	$("#cur-fcst").append("<input type='button' class='remove-btn' "
						+ "id='cur-btn' onClick='removeForecast(this)'/>");
	$("#cur-fcst").append("<h2>" + f.area + "</h2>");
	$("#cur-fcst").append("<div class='fcst-content' id='cur-content'></div>");
	$("#cur-content").append("<div class='name'>" + f.name + "</div>");
	$("#cur-content").append("<div>" + f.date + "</div>");
	$("#cur-content").append("<div>" + f.temp + " degrees</div>");
	$("#cur-content").append("<div>" + f.weather + "</div>");
	$("#cur-content").append(
	"<img src='http://forecast.weather.gov/newimages/medium/" + f.img + "'>");
	$("#cur-fcst").removeAttr("id");
	$("#cur-btn").removeAttr("id");
	$("#cur-content").removeAttr("id");
}

function removeForecast(btn) {
	var fcst = btn.parentNode;
	fcst.parentNode.removeChild(fcst);
}

function parseFcst(fcst) {
	var area = fcst.location.areaDescription;
	var name = fcst.currentobservation.name;
	var date = fcst.currentobservation.Date;
	var temp = fcst.currentobservation.Temp;
	var weather = fcst.currentobservation.Weather;
	var img = fcst.currentobservation.Weatherimage;
	
	return {
		area: area, 
		name: name, 
		date: date, 
		temp: temp, 
		weather: weather, 
		img: img
	};
}