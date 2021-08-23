var openWeatherKey = "b630f221bd1295ec02183f26749a279c";
var openWeatherURL = "https://api.openweathermap.org/data/2.5/";

var citySearchEl = $('#citySearch');
var searchedCitiesEl = $('#searchedCities');
var weatherEl = $('#weather');

var cityQuery;
var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

function errorRender() {
    weatherEl.empty();
    weatherEl.append(`
    <h3>Location not found, please try again.</h3>
    `);
}

function fiveDayRender(data) {
    var fiveDay = [];
    for(var i = 0; i < 5; i++) {
        fiveDay.push(`
        <div class="col-auto forecast">
            <p class="fs-5 fw-bold">${moment(data.daily[i].dt, "X").format("M/D/YYYY")}</p>
            <img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png">
            <div id="dailyStats">
                <p>Temp: ${data.daily[i].temp.day}&deg;F</p>
                <p>Wind: ${data.daily[i].wind_speed} MPH</p>
                <p>Humidity: ${data.daily[i].humidity}%</p>
            </div>
        </div>
        `)
    }
    return fiveDay.join("");
}

function weatherRender(data) {
    weatherEl.empty();
    weatherEl.append(`
        <div class="col border border-dark" id="current">
            <h3>${cityQuery}</h3>
            <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png">
            <p>Temp: ${data.current.temp}&deg;F</p>
            <p>Wind: ${data.current.wind_speed} MPH</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>UV Index: ${data.current.uvi}</p>
        </div>
        <h3>Five day forecast:</h3>
        <div class="col">
            <div class="row justify-content-between" id="forecast">
                ${fiveDayRender(data)}
            </div>
        </div>
    `);
}

function citySearchRender() {
    citySearchEl.empty();
    citySearchEl.append(`
    <input type="search" class="form-control" id="cityQuery">
    <button type="submit" class ="btn btn-primary" id="searchButton">Search</button>
    `);
}

function saveCities() {
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
}

// INCOMPLETE
function searchedCitiesRender() {
    citySearchRender();
    for(var i = 0; i < searchedCities.length; i++) {
        searchedCitiesEl.append(`
        <button type="button" class="btn" value="${searchedCities[i]}">${searchedCities[i]}</button>
        `);
    }
    saveCities();
}
    
function searchByCoords(lat, lon) {
    var queryURL = `${openWeatherURL}onecall?${lat}&${lon}&units=imperial&appid=${openWeatherKey}`

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
            // saveCities();
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