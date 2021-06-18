var fetchButton = document.getElementById('fetch-button');
var userInput = document.getElementById('user-input');


function getAPI() {
    var userCity = userInput.value;
    var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + openWeatherKey;
    var latitude;
    var longitude;
    var onecallQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + openWeatherKey;
    fetch(currentWeatherQueryURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayForecast()
                })
            }
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


userInput.addEventListener('submit', function(event) {
    event.preventDefault();
    getAPI();
});

fetchButton.addEventListener('click', function(event) {
    event.preventDefault();
    getAPI();

});