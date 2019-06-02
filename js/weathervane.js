function onAddSubmit(event) {
  let lat = $('#lat').val();
  let lon = $('#lon').val();

  $.ajax({
    type: 'GET',
    url: 'http://forecast.weather.gov/MapClick.php',
    data: { lat, lon, FcstType: 'json' },
    success: createFcst,
  });

  event.preventDefault();
}

function createFcst(fcst) {
  fcst = parseFcst(fcst);

  $('#body').append("<div class='card' id='currentCard'></div>");
  if (fcst.image) {
    $('#currentCard').append(
      '<img src="http://forecast.weather.gov/newimages/medium/' +
        fcst.image +
        '" class="card-img-top">',
    );
  }
  $('#currentCard').append(
    '<div class="card-body" id="currentCardBody"></div>',
  );
  $('#currentCardBody').append('<h5 class="card-title">' + fcst.name + '</h5>');
  $('#currentCardBody').append(
    "<div class='card-subtitle mb-2 text-muted'>" + fcst.area + '</div>',
  );

  var cardText = fcst.temp + ' degrees';
  if (fcst.weather) {
    cardText += ' and ' + fcst.weather;
  }
  $('#currentCardBody').append('<p class="card-text">' + cardText + '</p>');
  $('#currentCard').append(
    '<div class="card-footer"><small class="text-muted">' +
      fcst.date +
      '</small></div>',
  );

  $('#currentCard').removeAttr('id');
  $('#currentCardBody').removeAttr('id');
}

function parseFcst(fcst) {
  let area = fcst.location.areaDescription;
  let name = fcst.currentobservation.name;
  let date = fcst.currentobservation.Date;
  let temp = fcst.currentobservation.Temp;
  let weather =
    fcst.currentobservation.Weather !== 'NA'
      ? fcst.currentobservation.Weather
      : null;
  let image =
    fcst.currentobservation.Weatherimage !== 'NULL'
      ? fcst.currentobservation.Weatherimage
      : null;

  return {
    area,
    name,
    date,
    temp,
    weather,
    image,
  };
}
