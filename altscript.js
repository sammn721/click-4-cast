var cityInput = document.querySelector('#city-input');
var cityButtons = document.querySelector('#city-buttons');
var userInput = document.querySelector('#user-input');
var forecast = document.querySelector('#forecast');
var currentWeather = document.querySelector('#current-weather');
var fiveDay = document.querySelector('#five-day');
var selectedCity = document.querySelector('#selected-city');

var formSubmitHandler = function (event) {
    event.preventDefault();

    var typeCity = userInput.value.trim();

    if (typeCity) {
        getCurrentWeather(typeCity);

        currentWeather.textContent = '';
        userInput.value = '';
    } else {
        alert('Please enter a major city')
    }
};

var buttonClickHandler = function (event) {
    var clickCity = event.target.getAttribute('selectable-city');

    if (clickCity) {
        getCurrentWeather(clickCity);

        currentWeather.textContent = '';
        userInput.value = '';
    }
}

var getCurrentWeather = function (userCity) {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + openWeatherKey;

    fetch(currentWeatherURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayForecast(data, userCity);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeatherMap');
        });
};

var getFiveDay = function (userCity) {
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + openWeatherKey;

    fetch(currentWeatherURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayForecast(data, userCity);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeatherMap');
        });
};



var displayForecast = function (days, city) {
    
    selectedCity.textContent = city;

    for (let i = 0; i < days.length; i++) {
        var mmddyyyy = days[i].

        var dayCard = document.createElement('div');
        dayCard.classList = 'list-item flex-row justify-space-between align-center';

        var date = document.createElement('span');
        date.textContent = 
    }

}

cityInput.addEventListener('submit', formSubmitHandler);
cityButtons.addEventListener('click', buttonClickHandler);