var openWeatherKey = "b630f221bd1295ec02183f26749a279c";
var openWeatherURL = "https://api.openweathermap.org/data/2.5/";

var citySearchEl = $('#citySearch');
var searchedCitiesEl = $('#searchedCities');
var currentForecastEl = $('#currentForecast');

var cityQuery;

function citySearchRender() {
    citySearchEl.append(`
    <input type="search" class="form-control" id="cityQuery">
    <button type="submit" class ="btn" id="searchButton">Search</button>
    `)
}

function currentForecastRender() {
    currentForecastEl.append(`
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
    `)
}

citySearchRender();