$(document).ready(main);

function main() {
  getLocation();
  $('#unit').click(function() {
    var unit = $('#unit').text();
    var degrees = +$('#degrees').text();

    if (unit === 'C') {
      $('#unit').text('F');
      $('#degrees').text(((degrees*(9 / 5)) + 32).toFixed(1));
    }
    else {
      $('#unit').text('C');
      $('#degrees').text(((degrees - 32) * (5 / 9)).toFixed(1));
    };
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
       getWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
         units:'metric',
        appid:'22ce49999b8559ddd85b06458810a87e'
      });
  });
  }
  else {
    alert('Aww, you wouldn\'t let me geolocate. That makes me sad.');
  }
}

function getWeather(dataObj) {

    $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    type:'GET',
    dataType:'json',
    data: dataObj
   })

  .done(function(json) {
      $('#city').text(json.name);
      $('#country').text(json.sys.country);
      $('#degrees').text(json.main.temp.toFixed(1));
      $('#description').text(json.weather[0].main);
$('#description2').text(json.weather[0].description);
$('#icon').html('<img src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png">');
 $('.transbox').removeClass('hidden');
  })

  .fail(function(xhr, status, errorThrown) {
    $('#city').text('Sorry, there was a problem!' + ' ' + errorThrown + ' ' + status + ' ' + xhr);
    $('.transbox').removeClass('hidden');
  });
}
