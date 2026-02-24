let apiKey = "863ce73t1a62a502d4b0fda01094bo6c";

function updateTemp(response) {
    let tempElement = document.querySelector("#temp-value");
    let locationElement = document.querySelector("#location");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#temp-icon img");

    let locationTemp = response.data.temperature.current;
    let correctCity = response.data.city;
    let description = response.data.condition.description;
    let humidity = response.data.temperature.humidity;
    let windSpeed = response.data.wind.speed;
    let iconUrl = response.data.condition.icon_url;

    // Update city
    locationElement.innerHTML = `<h1>${correctCity}</h1>`;
    // Update weather details
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = `${humidity}%`;
    speedElement.innerHTML = `${windSpeed} mph`;
    tempElement.innerHTML = `${Math.round(locationTemp)}°F`;

    // Update weather icon
    iconElement.src = iconUrl;
    iconElement.alt = description;

    // Update time
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[now.getDay()];
    timeElement.innerHTML = `${day} ${hours}:${minutes}`;
}

function searchLocation(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateTemp);
}

function routeSearch(event) {
    event.preventDefault();
    let inputElement = document.querySelector("#input");
    let city = inputElement.value;
    searchLocation(city);
}

// Add event listener for the search form
let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", routeSearch);

// Load default city on page load
searchLocation("Paris");