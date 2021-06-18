var fetchButton = document.getElementById('fetch-button');
var cityInput = document.getElementById('city-input');


function getAPI() {
    var userCity = userInput.value;
    var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + openWeatherKey;
    var latitude;
    var longitude;
    var onecallQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + openWeatherKey;
    fetch(currentWeatherQueryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    });
    fetch(onecallQueryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    });
    
}

// function forecast() {
    
// }

cityInput.addEventListener('submit', function(event) {
    event.preventDefault();
    getAPI();
    // forecast();
});

fetchButton.addEventListener('click', function(event) {
    event.preventDefault();
    getAPI();
    // forecast();
});

cityButtons.addEventListener("click", function(event) {
    
    
    if (event.target.matches("button")) {
        var clickedCity = JSON.stringify(event.target.id);
        getAPI()
    }
});