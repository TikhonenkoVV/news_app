import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/reverse';
const API_KEY = '5a21f5498e56154d1b701d9d37670e49';

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
                    appid: API_KEY,
                },
            }),
            axios.get(GEO_API_URL, {
                params: {
                    lat: this.latitude,
                    lon: this.longitude,
                    limit: 1,
                    appid: API_KEY,
                },
            }),
        ];
        return await axios.all(requests);
    }

    getIconUrl(icon) {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    }
}
