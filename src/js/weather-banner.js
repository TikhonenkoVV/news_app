import { WeatherService } from './weather-service';

const NY_LAT = 40.73061;
const NY_LON = -73.935242;

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
    console.log(temp, weather, city, icon, date, description);
    console.log(getDayOfWeek(date));
    console.log(getCurrentDate(date));
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
    const currentMonth = months[date.getMonth()];
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();
    return `${currentDay} ${currentMonth} ${currentYear}`;
}

function getDayOfWeek(date) {
    const weekday = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    return weekday[date.getDay()];
}
