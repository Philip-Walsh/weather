export class WeatherApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
    }
}

export class Weather {
    private apiKey: string;

    constructor(apiKey: unknown) {
        if (typeof apiKey !== 'string') {
            throw new Error('Invalid API key');
        }
        this.apiKey = apiKey;
    }

    /**
     * Fetches weather data from the API.
     *
     * @param {string} endpoint - the API endpoint to fetch data from
     * @param {string} location - the location to fetch weather data for
     * @return {Promise<object>} - a Promise that resolves to the weather data
     * @throws {WeatherApiError} - if there is an error fetching the weather data
     */
    async fetchData(endpoint: string, location: string) {
        const response = await fetch(`https://api.weatherapi.com/v1/${endpoint}.json?key=${this.apiKey}&q=${location}`);

        if (response.ok) {
            return response.json();
        } else {
            const errorText = await response.text();
            console.error(endpoint, response.status, errorText);
            throw new WeatherApiError(`Error fetching weather: ${response.status}`, response.status);
        }
    }
}

// Future add parameters:
// future 400 {"error":{"code":1009,"message":"dt parameter should be in yyyy-MM-dd format and between 14 days and 300 days from today in the future."}}
