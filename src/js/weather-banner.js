import { WeatherService } from './weather-service';

const NY_LAT = 40.73061;
const NY_LON = -73.935242;

getCoordinates().then(async ({ latitude, longitude }) => {
    let weatherData = {};
    try {
        weatherData = await getWeatherData(latitude, longitude);
    } catch (error) {
        console.log(error);
        return;
    }
    renderBanner(weatherData);
});

async function getWeatherData(latitude, longitude) {
    const weatherService = new WeatherService(latitude, longitude);
    const [weather, city] = await weatherService.getCurrentWeather();
    return {
        temp: weather.data.main.temp,
        weather: weather.data.weather[0].main,
        city: city.data[0].name,
        icon: weatherService.getIconUrl(weather.data.weather[0].icon),
    };
}

function getCoordinates() {
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
            }
        );
    });
}

function renderBanner({ temp, weather, city, icon }) {
    console.log(temp, weather, city, icon);
    const today = new Date();
    console.log(getCurrentDate(today));
    console.log(getDayOfWeek(today));
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
