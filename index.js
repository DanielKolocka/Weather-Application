import * as ELEMENTS from './elements.js';

class weatherData {
    constructor(cityName, temperature, description) {
        this.cityName = cityName;
        this.temperature = temperature;
        this.description = description;
    }
    get getCityName() {
        return this.cityName;
    }
    get getTemperature() {
        return this.temperature;
    }
    get getDescription() {
        return this.description;
    }
}

ELEMENTS.SEARCH_BUTTON.addEventListener('click', searchWeather);
let openWeatherAPIKey = '796825d211ca5a47d673cf83567a52f2';

async function getLatLong(city) {
    let geoCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + openWeatherAPIKey;
    let response = await fetch(geoCodeUrl);
    let data = await response.json();
    // console.log(data);
    let { lat, lon } = data[0];
    return { lat, lon };
}
function searchWeather() {
    const cityName = ELEMENTS.SEARCHED_CITY.value.trim();
    if (cityName.length == 0) {
        return alert('Please Enter A City Name');
    }
    getLatLong(cityName)
        .then(data => {
            getWeather(data.lat, data.lon);
        })
        .catch(error => console.log(error.message));
}



async function getWeather(latitude, longitude) {
    let locationUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=' + openWeatherAPIKey;
    let response = await fetch(locationUrl);
    let data = await response.json();

    let name = data.name.toUpperCase();
    let temp = data.main.temp + '°C.';
    let desc = data.weather[0].description.toUpperCase();
    let weather = new weatherData(name, temp, desc);
    showWeather(weather);
}

function showWeather(weatherData) {
    ELEMENTS.WEATHER_CITY.textContent = weatherData.getCityName;
    ELEMENTS.WEATHER_DESCRIPTION.textContent = weatherData.getDescription;
    ELEMENTS.WEATHER_TEMPERATURE.textContent = weatherData.getTemperature;

    // By default it is set to 'none', so we need to display it
    ELEMENTS.WEATHER_BOX.style.display = 'block';
}