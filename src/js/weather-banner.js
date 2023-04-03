import { WeatherService } from './weather-service.js';
import { WEATHER_API_KEY } from './key';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const NY_LAT = 40.73061;
const NY_LON = -73.935242;

const refs = {
    weatherBanner: document.querySelector('[data-weather-banner]'),
    weatherBackdrop: document.querySelector('[data-weather-modal]'),
    weatherBackdropCloseButton: document.querySelector(
        '[data-weather-modal-close]'
    ),
};

export async function onBannerLoad() {
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
    initializeComponents(weatherData);
}

function initializeComponents(weatherData) {
    const weatherWeekButton = document.querySelector('[data-weather-button]');
    weatherWeekButton.addEventListener('click', () =>
        showWeekWeather(weatherData)
    );
    refs.weatherBackdropCloseButton.addEventListener('click', closeWeekWeather);
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

async function showWeekWeather(weatherData) {
    const ready = hasWidget();

    if (!ready) {
        window.myWidgetParam
            ? window.myWidgetParam
            : (window.myWidgetParam = []);
        window.myWidgetParam.push({
            id: 11,
            cityid: weatherData.stationId,
            appid: WEATHER_API_KEY,
            units: 'metric',
            containerid: 'openweathermap-widget-11',
        });
        (function () {
            var script = document.createElement('script');
            script.async = true;
            //script.charset = 'utf-8';
            script.src =
                '//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(script, s);
        })();
    }

    if (!ready) {
        await isHtmlElementReady('#container-openweathermap-widget-11');
    }
    const widgetHeader = document.querySelector('.widget-left-menu__header');
    widgetHeader.textContent = weatherData.city;
    refs.weatherBackdrop.classList.remove('is-hidden');
    disableBodyScroll(document.body);
    window.addEventListener('keydown', onEscKeyPress);
}

function closeWeekWeather() {
    refs.weatherBackdrop.classList.add('is-hidden');
    enableBodyScroll(document.body);
    window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
    const ESC_KEY_CODE = 'Escape';
    if (e.code === ESC_KEY_CODE) {
        closeWeekWeather();
    }
}

async function isHtmlElementReady(selector) {
    return new Promise(resolve => {
        const intervalId = setInterval(() => {
            let element = document.querySelector(selector);
            if (element != null) {
                clearInterval(intervalId);
                resolve(true);
            }
        }, 300);
    });
}

function hasWidget() {
    const container = document.querySelector(
        '#container-openweathermap-widget-11'
    );

    return container != null;
}

function renderBanner({ temp, weather, city, icon, date, description }) {
    if (!refs.weatherBanner) {
        return;
    }
    refs.weatherBanner.innerHTML = `<div class="weather__wripper">
            <p class="weather__temperature">
                <span class="weather__number">
                ${Math.round(temp)}
                </span>
                <span>&deg;</span>
            </p>
            <div class="weather__info">
                <p class="weather__type">${weather}</p>
                <p class="weather__location">
                    <svg class="weather__icon" width="18" height="18">
                        <use href="#icon-location"></use>
                    </svg>
                    <span class="weather__city">${city}</span>
                </p>
            </div>
        </div>
        <img class="weather__image" src="${icon}" alt="${description}" width="128" height="128"/>
        <p class="weather__date">${getCurrentDate(date)}</p>
        <button type="button" class="weather__button" data-weather-button>weather for week</button>`;
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

export function displayBanner() {
    const gridBox = document.querySelector('.grid-box');
    gridBox.classList.remove('banner-hidden');
}
