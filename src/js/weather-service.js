import axios from 'axios';
import { WEATHER_API_KEY } from './key';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/reverse';

export class WeatherService {
    constructor(lat, lon) {
        this.latitude = lat;
        this.longitude = lon;
    }

    async getCurrentWeather() {
        const requests = [
            axios.get(BASE_URL, {
                params: {
                    lat: this.latitude,
                    lon: this.longitude,
                    units: 'metric',
                    appid: WEATHER_API_KEY,
                },
            }),
            axios.get(GEO_API_URL, {
                params: {
                    lat: this.latitude,
                    lon: this.longitude,
                    limit: 1,
                    appid: WEATHER_API_KEY,
                },
            }),
        ];
        const [weather, city] = await axios.all(requests);

        return {
            temp: weather.data.main.temp,
            weather: weather.data.weather[0].main,
            city: city.data[0].local_names['en'],
            icon: this.getIconUrl(weather.data.weather[0].icon),
            date: new Date(weather.data.dt * 1000),
            description: weather.data.weather[0].description,
            stationId: weather.data.id,
        };
    }

    getIconUrl(icon) {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
}
