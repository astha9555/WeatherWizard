const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => response.json())
    .then((weatherData) => displayResults(weatherData));
}

function displayResults(weatherData) {
  console.log(weatherData);
  let city = document.querySelector(".location .city");
  city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weatherData.main.temp)}<span>°C</span>`;

  let weather = document.querySelector(".current .weather");
  weather.innerText = weatherData.weather[0].main;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${weatherData.main.temp_min}°C / ${weatherData.main.temp_max}°C`;
}

function dateBuilder(date) {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return `${day} ${dayNumber} ${month} ${year}`;
}
