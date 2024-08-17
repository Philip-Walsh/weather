import { Weather } from "./weather";

const weather = new Weather(process.env.WEATHER_API_KEY);

export default weather;