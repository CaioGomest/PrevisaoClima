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
  
async function cityName() {
    var NameCity = document.querySelector(".input-cidade").value;
    await fetchData(NameCity);
    var data = await fetchData(NameCity);
    
  }

async function fetchData(NameCity) {
 
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${NameCity}&appid=${key}&lang=pt_br&units=metric`);
    var data = await response.json();
    console.log(data);
    preencherInfos(data, NameCity);
}


