function updateTemp(response) {
    let tempElement = document.querySelector("#location-temp");
    let locationElement = document.querySelector("#location");
    let descriptionElement = document.querySelector("#description");
 let humidityElement = document.querySelector("#humidity");
let speedElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);


    let locationTemp = response.data.temperature.current;
    let correctCity = response.data.city;

    // Update city 
    locationElement.innerHTML = `<h1>${correctCity}</h1>`;
    descriptionElement.innerHTML = response.data.condition.description;
    timeElement.innerHTML = formatDate(date);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    speedElement.innerHTML = `${response.data.wind.speed}mph`;
    tempElement.innerHTML = `${Math.round(locationTemp)}°F`;
}
function formatDate(date){
    
    let hours = date.getHours();
    let minutes = date.getMinutes();

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


let day = days[ date.getDay()];


    return `${day} ${hours}:${minutes}`;
}


function searchLocation(city) {
    let apiKey = "863ce73t1a62a502d4b0fda01094bo6c";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    
    axios.get(apiUrl).then(updateTemp);
}

function routeSearch(event) {
    event.preventDefault();

    let inputElement = document.querySelector("#input");
    let city = inputElement.value;

    searchLocation(city);
}

let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", routeSearch);

// Load default
searchLocation("Paris");