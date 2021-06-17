var fetchButton = document.getElementById('fetch-button');
var userInput = document.getElementById('user-input');


function getAPI() {
    var userCity = userInput.value;
    userCity = userCity.replace(/ /g, '');
    var openWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + openWeatherAPIKey;
    fetch(openWeatherQueryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
    });
}

fetchButton.addEventListener('click', function(event) {
    event.preventDefault();
    getAPI();
    
});