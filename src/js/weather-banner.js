import { WeatherService } from './weather-service';

const NY_LAT = 40.73061;
const NY_LON = -73.935242;

const refs = {
    weatherBanner: document.querySelector('[data-weather-banner]'),
};

onBannerLoad();

async function onBannerLoad() {
    const { latitude, longitude } = await getCoordinates();
    let weatherData = {};
    const weatherService = new WeatherService(latitude, longitude);
    try {
        weatherData = await weatherService.getCurrentWeather();
    } catch (error) {
        console.log(error);
        return;
    }
    renderBanner(weatherData);
}

function getCoordinates() {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            },
            error => {
                resolve({ latitude: NY_LAT, longitude: NY_LON });
            },
            options
        );
    });
}

function renderBanner({ temp, weather, city, icon, date, description }) {
    // console.log(temp, weather, city, icon, date, description);
    // console.log(getCurrentDate(date));
    const markup = `<div class="weather__wripper">
                <p class="weather__temperature">${Math.round(temp)} &deg;</p>
                <p class="weather__type">${weather}</p>
                <p class="weather__location">${city}</p>
              </div>
                <img class="weather__image"
                  src="${icon}"
                  alt="${description}"
                  width="128"
                  height="121"
                />
              <div class="weather__date">
                <p>${getCurrentDate(date)}</p>
              </div>`;
    refs.weatherBanner.innerHTML = markup;
}

function getCurrentDate(date) {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
    ];
    const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const dayOfWeek = weekday[date.getDay()];
    const currentMonth = months[date.getMonth()];
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();
    return `${dayOfWeek}<br>${currentDay} ${currentMonth} ${currentYear}`;
}
