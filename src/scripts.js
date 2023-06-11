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

function displayTemperature(response){
  let tempDisplay= Math.round(response.data.main.temp);
  let cityDisplay = response.data.name;
  let humidityDisplay = response.data.main.humidity;
  let descriptionDisplay = response.data.weather[0].description;
  let windDisplay = Math.round(response.data.wind.speed);
  let feelsLikeDisplay = Math.round(response.data.main.feels_like);

  let temperatureElement= document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let feelLikeElement = document.querySelector("#feel-like");
  let dateElement = document.querySelector("#date");

  temperatureElement.innerHTML = `${tempDisplay}`;
  cityElement.innerHTML = `${cityDisplay}`;
  descriptionElement.innerHTML = `${descriptionDisplay}`;
  humidityElement.innerHTML = `${humidityDisplay}%`;
  windElement.innerHTML = `${windDisplay}Km/h`;
  feelLikeElement.innerHTML =`${feelsLikeDisplay}%`;
  dateElement.innerHTML = formatDate(response.data.dt*1000);

  console.log(response);
}
let apiKey="5a66dc5142bfcd987e8299c75e3b7ea3";
let city="Lagos"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&lat={lat}&lon={lon}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);
