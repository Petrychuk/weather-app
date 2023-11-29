let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let showCurrentDay = document.querySelector("#currentDay");
showCurrentDay.textContent = days[date.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let showCurrentMonth = document.querySelector("#currentMonth");
showCurrentMonth.textContent = months[date.getMonth()];

let showCurrentYear = document.querySelector("#currentYear");
showCurrentYear.textContent = date.getFullYear();

let showCurrentDate = document.querySelector("#currentDate");
showCurrentDate.textContent = date.getDate();

let hours = date.getHours();
let minutes = date.getMinutes();
let formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
let currentTime = `${hours}:${formattedMinutes}`;
let showCurrentTime = document.querySelector("#currentTime");
showCurrentTime.textContent = currentTime;

let formattedDay =
  (showCurrentDate.textContent < 10 ? "0" : "") + showCurrentDate.textContent;
let formattedMonth =
  (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
let formattedYear = date.getFullYear();
let formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;
let showFormattedDate = document.querySelector("#formattedDay");
showFormattedDate.textContent = formattedDate;

let currentLocationButton = document.getElementById("currentLocationButton");

currentLocationButton.addEventListener("click", async () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      let apiKey = "a20a1e741e425790fda43f119987f4da";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        let response = await axios.get(apiUrl);
        let weatherData = response.data;

        updateCurrentCity(weatherData.name, true);
        updateTemperature(weatherData.main.temp);
        fetchWeatherData(weatherData.name);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
  } else {
    console.error("Geolocation is not available.");
  }
});

function updateCurrentCity(city, fromLocation) {
  let currentCityDisplay = document.querySelector("#currentCitySearch");
  currentCityDisplay.textContent = city;

  if (!fromLocation) {
    fetchWeatherData(city);
  }
}

async function fetchWeatherData(city) {
  let apiKey = "a20a1e741e425790fda43f119987f4da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    let response = await axios.get(apiUrl);
    let weatherData = response.data;

    updateTemperature(weatherData.main.temp);
    let weatherDescription = weatherData.weather[0].main;
    let weatherDescriptionElement = document.querySelector("#currentWeather");
    weatherDescriptionElement.textContent = weatherDescription;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function updateTemperature(temp) {
  let temperatureElement = document.querySelector("#currentTemperature");
  let roundedTemp = Math.round(temp);
  temperatureElement.textContent = `${roundedTemp}°C`;
}

let isCelsius = true;
let temperatureElement = document.querySelector("#currentTemperature");

temperatureElement.addEventListener("click", () => {
  let currentTemperature = parseFloat(temperatureElement.textContent);
  if (isCelsius) {
    let fahrenheitTemperature = (currentTemperature * 9) / 5 + 32;
    temperatureElement.textContent = `${Math.round(fahrenheitTemperature)}°F`;
  } else {
    let celsiusTemperature = ((currentTemperature - 32) * 5) / 9;
    temperatureElement.textContent = `${Math.round(celsiusTemperature)}°C`;
  }

  isCelsius = !isCelsius;
});

let searchForm = document.querySelector(".search_block");
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let searchInput = document.querySelector(".search");
  let searchQuery = searchInput.value;
  let apiKey = "a20a1e741e425790fda43f119987f4da";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`;

  try {
    let response = await axios.get(apiUrl);
    let weatherData = response.data;

    updateCurrentCity(weatherData.name, false);
    updateTemperature(weatherData.main.temp);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

// click button
// var gitRepoButton = document.getElementById("gitRepoButton");
// gitRepoButton.addEventListener("click", function () {
//   window.open("https://github.com/Petrychuk/weather-app", "_blank");
// });
// Измененная функция updateCurrentCity
function updateCurrentCity(city, fromLocation) {
  let currentCityDisplay = document.querySelector("#currentCitySearch");
  currentCityDisplay.textContent = city;

  if (!fromLocation) {
    fetchWeatherData(city);
  }
  getForecast(city); // Добавить вызов getForecast здесь
}

function getForecast(city) {
    let apiKey = "63c3f23c125bto3e4bea128c9007791d";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast)
    console.log(apiUrl);

}

async function displayForecast(response) {
    console.log(response.data);

    let forecastHtml = "";

    // Массив с названиями дней недели
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Получение текущего дня недели и добавление 1 для начала с завтрашнего дня
    let currentDayIndex = (new Date()).getDay();

    response.data.daily.slice(0, 6).forEach(function (day, index) {
        // Вычисление индекса следующего дня
        let dayOfWeekIndex = (currentDayIndex + index + 1) % 7;
        let dayOfWeek = days[dayOfWeekIndex];

        // Создание HTML для каждого дня
        forecastHtml += 
        `   <div class="col-day">
            <div class="weather-forecast-day">
                <div class="weather-forecast-date" style="color:#70f5e8">${dayOfWeek}</div>
                <div class="weather-forecast-icon">
                    <img src="${day.condition.icon_url}"/>
                </div>
                <div class="weather-forecast-temperatures">
                    <div class="weather-forecast-temperature" style="color:#70f5e8">
                    <strong>${Math.round(day.temperature.maximum)}°</strong>
                    </div>
                    <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
                </div>
            </div>
            </div>
        `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

// Вызовите getForecast с нужным городом для получения данных
getForecast("Paris");
