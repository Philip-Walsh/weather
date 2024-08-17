import { Router } from "express";
import weather from "../weather-ext";

const weatherRouter = Router();

weatherRouter.get("/", async (req, res) => {
    try {
        const weatherData = await weather.getCurrentWeather('Galway');
        console.log(weatherData);
        res.json(weatherData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                error: error.message
            });
        }
        else {
            // TODO: anonymous error remove api key
            res.status(500).json({
                error: "Unknown error"
            });
        }
    }
});

export default weatherRouter;