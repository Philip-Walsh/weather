// API_KEY = process.env.WEATHER_API_KEY;

export class Weather {
    
    API_URL = 'https://api.weatherapi.com/v1/'
    constructor(private apiKey: unknown) {
        if (typeof apiKey !== 'string') {
            throw new Error('Invalid API key');
        }
     }

    async getCurrentWeather(location: string) {
        const response = await fetch(`${this.API_URL}/current.json?key=${this.apiKey}&q=${location}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error fetching weather: ${response.status}`);
        }
    }

    async getForecast(location: string) {
        const response = await fetch(`${process.env.WEATHER_API_URL}/forecast.json?key=${this.apiKey}&q=${location}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Error fetching weather: ${response.status}`);
        }
    }

}
