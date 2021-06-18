var citySelector = document.querySelector('#city-selector');
var cityButtons = document.querySelector('#city-buttons');
var userInput = document.querySelector('#user-input');
var forecast = document.querySelector('#forecast');
var currentWeather = document.querySelector('#current-weather');
var fiveDay = document.querySelector('#five-day');

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
    var clickCity = event.target.getAttribute('city');

    if (clickCity) {
        getCurrentWeather(clickCity);

        currentWeather.textContent = '';
        userInput.value = '';
    }
}

