import * as ELEMENTS from './elements.js';

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
    console.log(data.main.temp);
}