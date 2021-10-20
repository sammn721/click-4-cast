var openWeatherKey = "b630f221bd1295ec02183f26749a279c";
var openWeatherURL = "https://api.openweathermap.org/data/2.5/";

var citySearchEl = $('#citySearch');
var savedCitiesEl = $('#savedCities');
var weatherEl = $('#weather');

var cityQuery;
var isCity = false;
var savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

function errorRender() {
    weatherEl.empty();
    weatherEl.append(`
    <h3>Location not found, please try again.</h3>
    `);
}

function fiveDayRender(data) {
    var fiveDay = [];
    for(var i = 1; i < 6; i++) {
        fiveDay.push(`
        <div class="col p-2 mx-3 forecast">
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
    var UVIndex = data.current.uvi;
    var UVColor;
    if (UVIndex < 3 ) {
        UVColor = "low"
    } else if (UVIndex >= 3 && UVIndex < 6) {
        UVColor = "moderate"
    } else if (UVIndex >= 6 && UVIndex < 8) {
        UVColor = "high"
    } else if (UVIndex >= 8 && UVIndex < 11) {
        UVColor = "veryhigh"
    } else {
        UVColor = "extreme"
    }
    weatherEl.empty();
    weatherEl.append(`
        <div class="col border border-dark" id="current">
            <p class="fs-3 fw-bold">${cityQuery} (${moment().format("M/D/YYYY")})</p>
            <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png">
            <p>Temp: ${data.current.temp}&deg;F</p>
            <p>Wind: ${data.current.wind_speed} MPH</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>UV Index: <span class="${UVColor}">${UVIndex}</span></p>
        </div>
        <p class="fs-4 fw-bold">5-Day Forecast:</p>
        <div class="col">
            <div class="d-flex row justify-content-between flex-nowrap overflow-auto">
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
    var newList = [];

    newList.unshift(cityQuery);
    console.log(cityQuery)
    console.log(newList)

    if (!newList.includes(cityQuery)) {
        newList.unshift(cityQuery);
    }

    localStorage.setItem('savedCities', JSON.stringify(newList));

    savedCitiesRender(newList);
}

function savedCitiesRender(array) {
    for (var i = 0; i < array.length; i++) {
        savedCitiesEl.append(`<button type="button" class="btn btn-secondary" data-saved-city="${array[i]}">${array[i]}</button>`);
    }
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
        .then(function (response) {
            weatherRender(response);
            isCity = true;
            saveCities(response);
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
            console.log(cityQuery)
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

savedCitiesEl.click(function (event) {
    var target = event.target.getAttribute("data-saved-city");

    if (target === null) {
        return
    } else {
        cityQuery = target;
        searchByCity(target);
    }
})

citySearchEl.on("submit", citySearchSubmit)

citySearchRender();