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
    console.log("forecast start")
    
    for(var i = 0; i < 5; i++) {
        fiveDay.push(`
        <p>Temp: ${data.daily[i].temp.day}</p>
        <p>Wind: ${data.daily[i].wind_speed}</p>
        <p>Humidity: ${data.daily[i].humidity}</p>
        <p>UV Index: ${data.daily[i].uvi}</p>
        `)
        console.log("forecast complete");
    }
    return fiveDay.join("");
}

function weatherRender(data) {
    weatherEl.empty();
    weatherEl.append(`
    <div id="current">
        <h3>${cityQuery}</h3>
        <p>Temp:${data.current.temp}</p>
        <p>Wind:${data.current.wind_speed}</p>
        <p>Humidity:${data.current.humidity}</p>
        <p>UV Index:${data.current.uvi}</p>
    </div>
    <div id="forecast">
    <h3>Five day forecast:</h3>
        ${fiveDayRender(data)}
    </div>
    `);
}

function citySearchRender() {
    citySearchEl.empty();
    citySearchEl.append(`
    <input type="search" class="form-control" id="cityQuery">
    <button type="submit" class ="btn" id="searchButton">Search</button>
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