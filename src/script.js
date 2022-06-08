let now = new Date();
let p = document.querySelector("p");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
p.innerHTML = `${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("#city");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  } else {
    alert(`Please enter a city`);
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
//with above instruction I can chose a city, press search and have the city name changed plus day and time and alert in case no text is written

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let actualTemperature = document.querySelector("#temperature");
  actualTemperature.innerHTML = `${temperature}`;
}

function showHumidity(response) {
  let humidity = response.data.main.humidity;
  let actualHumidity = document.querySelector("#humidity");
  actualHumidity.innerHTML = `${humidity}`;
}

function showWind(response) {
  let wind = Math.round(response.data.wind.speed);
  let actualWind = document.querySelector("#wind");
  actualWind.innerHTML = `${wind}`;
}

function describeWeather(response) {
  let weather = response.data.weather[0].main;
  let actualWeather = document.querySelector("#wx-description");
  actualWeather.innerHTML = `${weather}`;
}

let units = "metric";
let apiKey = "18587a413f83472ff5f95d93ae688338";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Milan&appid=18587a413f83472ff5f95d93ae688338&units=metric`;

axios.get(apiUrl).then(showTemperature);
axios.get(apiUrl).then(showHumidity);
axios.get(apiUrl).then(showWind);
axios.get(apiUrl).then(describeWeather);

//with all above instructions I got the current temperature of Milan because I selected this city in the URL message, in additional I set current weather description, current humidity and current wind

//next step is to verify how can I get the accesso to the wx forecast for any city typed in the search form.
//-when I type a City the name is catch and replace into H2 but still don't know how to recognize as "city name" to complete the update of other values (Temeprature/Humidity/Wind(describeWeather) - CAN YOU HELP?

//next step is to verify how can I optain the wx forecast for the current city (in HTML the Button has been created)
//-here something is not recognize as "name" or "latitude", I don't know where is the issue - CAN YOU  HELP?

function showPosition(position) {
  let latitude = position.data.coord.latitude;
  let longitude = position.data.coord.longitude;
  let h2 = document.querySelector("#city");
  h2.innerHTML = `${position.data.coord.type.name}`;
  let units = "metric";
  let apiKey = "18587a413f83472ff5f95d93ae688338";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
}

axios.get(apiUrl).then(showPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
