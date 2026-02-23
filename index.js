function updateTemp(response) {
    let tempElement = document.querySelector("#location-temp");
    let locationTemp = response.data.temperature.current;

    tempElement.innerHTML = `${Math.round(locationTemp)}°F`;
}

function searchLocation(location) {
    let apiKey = "863ce73t1a62a502d4b0fda01094bo6c";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${location}&key=${apiKey}&units=imperial`;
    
    axios.get(apiUrl).then(updateTemp);
}

function routeSearch(event) {
    event.preventDefault();

    // THIS is your actual input field (not the form)
    let inputElement = document.querySelector("#input");
    
    // This matches your HTML id="location"
    let locationElement = document.querySelector("#location");

    let city = inputElement.value;

    locationElement.innerHTML = `<h1>${city}</h1>`;
    searchLocation(city);
}

// Your form ID is "search-input" in HTML, so we match it here
let searchForm = document.querySelector("#search-input");
searchForm.addEventListener("submit", routeSearch);