const { forStatement, forInStatement } = require("@babel/types");

var openWeatherKey = "b630f221bd1295ec02183f26749a279c";
var openWeatherURL = "https://api.openweathermap.org/data/2.5/";

var citySearchEl = $('#citySearch');
var searchedCitiesEl = $('#searchedCities');
var weatherEl = $('#weather');

var cityQuery;

function citySearchRender() {
    citySearchEl.append(`
    <input type="search" class="form-control" id="cityQuery">
    <button type="submit" class ="btn" id="searchButton">Search</button>
    `)
}

function weatherRender() {
    weatherEl.append(`
    <div id="current">
        <h3>${cityQuery}</h3>
        <p>Temp:</p>
        <p>Wind:</p>
        <p>Humidity:</p>
        <p>UV Index:</p>
    </div>
    <div id="forecast">
        <h3>Five day forecast:</h3>

    </div>
    `);
}

function errorRender() {
    weatherEl.empty();
    weatherEl.append(`
    <h3>Location not found, please try again.</h3>
    `);
    
function searchByCoords(lat, lon) {
    var queryURL = `${openWeatherURL}onecall?${lat}&${lon}&appid=${openWeatherKey}`

    fetch(queryURL)
        .then(function (response) {
            if(!response.ok) {
                errorRender();
                throw response.json();
            }
            return response.json();
        })
        .then(function (city) {
            weatherRender(city);

        })
        .catch(function (error) {
            return error;
        });
}

function searchByCity() {
    var queryURL = `${openWeatherURL}weather?q=${cityQuery}&appid=${openWeatherKey}`;
    
    fetch(queryURL)
        .then(function (response) {
            if(!response.ok) {
                errorRender();
                throw response.json();
            }
            return response.json();
        })
        .then(function (city) {
            cityQuery = city.name;
            var cityLat = `lat=${city.coord.lat}`;
            var cityLon = `lon=${city.coord.lon}`;
            searchByCoords(cityLat, cityLon);
        })
        .catch(function (error) {
            return error;
        });
}

function citySearchSubmit(event) {
    event.preventDefault();
    cityQuery = $('#cityQuery').val();
    searchByCity();
}

citySearchEl.on("submit", citySearchSubmit)

citySearchRender();