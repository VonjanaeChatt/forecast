function updateTemp(response) {
    let tempElement = document.querySelector("#location-temp");
    let locationElement = document.querySelector("#location");

    let locationTemp = response.data.temperature.current;
    let correctCity = response.data.city;

    // Update city from API response
    locationElement.innerHTML = `<h1>${correctCity}</h1>`;
    tempElement.innerHTML = `${Math.round(locationTemp)}°F`;
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

// Load default city on page load
searchLocation("Paris");