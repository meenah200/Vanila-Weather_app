function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  let minutes =date.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }
  let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day =days[date.getDay()];
  return`${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
  forecastHTML = forecastHTML + 
  `<div class="col-2 cast">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="50px" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
      </div>
    `;
    }});
    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  let apiKey = "bc2cd97eaa209e7d22d8f3c84081655f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){ 
  let cityDisplay = response.data.name;
  let humidityDisplay = response.data.main.humidity;
  let descriptionDisplay = response.data.weather[0].description;
  let windDisplay = Math.round(response.data.wind.speed);
  let feelsLikeDisplay = Math.round(response.data.main.feels_like);

  getForecast(response.data.coord);

  let temperatureElement= document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let feelLikeElement = document.querySelector("#feel-like");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = `${cityDisplay}`;
  descriptionElement.innerHTML = `${descriptionDisplay}`;
  humidityElement.innerHTML = `${humidityDisplay}%`;
  windElement.innerHTML = `${windDisplay}Km/h`;
  feelLikeElement.innerHTML =`${feelsLikeDisplay}%`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute(
    "alt", response.data.weather[0].description
  );
  }

function searchCity(city){
let apiKey = "ca018bb33ce911695826269ac51ced9c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  searchCity(city.value);
}

function searchLocation(position) {
  let apiKey = "ca018bb33ce911695826269ac51ced9c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


function displayCelciusTemp(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celciusTemperature); 
}

let celciusTemperature = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celciusLink = document.querySelector("#celcius-link")
celciusLink.addEventListener("click", displayCelciusTemp);

searchCity("Victoria Island");