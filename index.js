function routeSearch(event){
    event.preventDefault();
    let inputElement = document.querySelector("#input");
    let locationElement = document.querySelector("#location");
    locationElement.innerHTML = inputElement.value;
}

let searchInputElement = document.querySelector("#search-input");
searchInputElement.addEventListener("submit",routeSearch);