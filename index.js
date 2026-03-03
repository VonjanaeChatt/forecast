let apiKey = "863ce73t1a62a502d4b0fda01094bo6c";

function updateTemp(response) {
    let tempElement = document.querySelector("#temp-value");
    let locationElement = document.querySelector("#location");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#temp-icon img");
    let timeElement = document.querySelector("#time");

    let locationTemp = response.data.temperature.current;
    let correctCity = response.data.city;
    let country = response.data.country;
    let description = response.data.condition.description;
    let humidity = response.data.temperature.humidity;
    let windSpeed = response.data.wind.speed;
    let iconUrl = response.data.condition.icon_url;

    locationElement.innerHTML = `<h1>${correctCity}, ${country}</h1>`;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = `${humidity}%`;
    speedElement.innerHTML = `${windSpeed} mph`;
    tempElement.innerHTML = `${Math.round(locationTemp)}°F`;

    iconElement.src = iconUrl;
    iconElement.alt = description;

    let now = new Date();
    timeElement.innerHTML = formatDate(now);

    getForecast(`${correctCity}, ${country}`);
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function searchLocation(city) {
    let formattedCity = encodeURIComponent(city);
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${formattedCity}&key=${apiKey}&units=imperial`;

    axios.get(apiUrl)
        .then(updateTemp)
        .catch(function () {
            alert("City not found. Please enter City, State or City, Country.");
        });
}

function routeSearch(event) {
    event.preventDefault();
    let inputElement = document.querySelector("#input");
    let city = inputElement.value.trim();

    if (city.length > 0) {
        searchLocation(city);
    }
}

function getForecast(city) {
    let formattedCity = encodeURIComponent(city);
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${formattedCity}&key=${apiKey}&units=imperial`;

    axios.get(apiUrl)
        .then(displayForecast);
}

function displayForecast(response) {
    let forecastElement = document.querySelector(".weather-forecast");
    let forecast = response.data.daily;
    let forecastHTML = "";

    forecast.forEach(function (day, index) {
        if (index < 5) {
            forecastHTML += `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">
                        ${formatDay(day.time)}
                    </div>
                    <div class="weather-forecast-icon">
                        <img src="${day.condition.icon_url}" alt="${day.condition.description}" />
                    </div>
                    <div class="weather-forecast-temps">
                        <strong class="weather-forecast-temp">
                            ${Math.round(day.temperature.maximum)}°
                        </strong>
                        <div class="weather-forecast-temp">
                            ${Math.round(day.temperature.minimum)}°
                        </div>
                    </div>
                </div>
            `;
        }
    });

    forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", routeSearch);

searchLocation("Paris, FR");
