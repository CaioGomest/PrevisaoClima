const key = "fa10062a0828ab9dc0a6cf2b82dd1ddb";

function preencherInfos(data, NameCity) {
  if (data.cod === "404") {
    document.querySelector('.cidade').innerHTML = "Cidade não encontrada";
    document.querySelector('.clima').innerHTML = "";
    document.querySelector('.tempo').innerHTML = "";
  } else {
    document.querySelector('.cidade').innerHTML = "Tempo em " + NameCity;
    document.querySelector('.clima').innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector('.tempo').innerHTML = data.weather[0].description;
  }
}

async function fetchData(NameCity) {
  var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${NameCity}&appid=${key}&lang=pt_br&units=metric`);
  var data = await response.json();
  console.log(data);
  preencherInfos(data, NameCity);
}

function successCallback(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Faça algo com as coordenadas (por exemplo, enviar para o servidor)
  console.log('Latitude: ' + latitude);
  console.log('Longitude: ' + longitude);

  // Chame a função fetchData passando as coordenadas geográficas
  fetchDataByCoordinates(latitude, longitude);
}

function errorCallback(error) {
  console.log('Erro ao obter a localização: ' + error.message);
}

function fetchDataByCoordinates(latitude, longitude) {
  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(latitude, longitude);

  geocoder.geocode({ 'location': latlng }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        var cityName = results[0].address_components[2].long_name;
        document.querySelector('.input-cidade').value = cityName;
        fetchData(cityName);
      } else {
        console.log('Não foi possível obter o nome da cidade');
      }
    } else {
      console.log('Geocoder falhou: ' + status);
    }
  });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log('Geolocalização não é suportada pelo seu navegador');
}
