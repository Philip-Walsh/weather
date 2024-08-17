// import { WeatherApi, WeatherApiError } from './weather';

// describe('WeatherApi', () => {
//     const mockFetch = jest.fn();

//     beforeEach(() => {
//         (global as any).fetch = mockFetch;
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

//     it('should throw an error if the API key is not a string', () => {
//         expect(() => {
//             new WeatherApi(123 as any);
//         }).toThrow('Invalid API key');
//     });

//     it('should fetch weather data from the API', async () => {
//         const mockResponse = {
//             ok: true,
//             json: jest.fn().mockResolvedValue({ weather: 'sunny' }),
//         };
//         mockFetch.mockResolvedValue(mockResponse);

//         const weatherApi = new WeatherApi('abc123');
//         const result = await weatherApi.getCurrent('New York');

//         expect(mockFetch).toHaveBeenCalledWith('https://api.weatherapi.com/v1/current.json?key=abc123&q=New%20York');
//         expect(mockResponse.json).toHaveBeenCalled();
//         expect(result).toEqual({ weather: 'sunny' });
//     });

//     it('should throw an error if the API request fails', async () => {
//         const mockResponse = {
//             ok: false,
//             status: 404,
//         };
//         mockFetch.mockResolvedValue(mockResponse);

//         const weatherApi = new WeatherApi('abc123');

//         await expect(weatherApi.getCurrent('New York')).rejects.toThrow(WeatherApiError);
//         expect(mockFetch).toHaveBeenCalledWith('https://api.weatherapi.com/v1/current.json?key=abc123&q=New%20York');
//     });
// });