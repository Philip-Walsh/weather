import { Router } from "express";
import weather from "../weather-ext";

const weatherRouter = Router();
// TODO:add controllers and cache
weatherRouter.get("/current/:location", async (req, res) => {
    try {
        const location = req.params.location;
        const weatherData = await weather.getCurrent(location);
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
weatherRouter.get("/forecast/:location", async (req, res) => {
    try {
        const location = req.params.location;
        const weatherData = await weather.getForecast(location);
        console.log(weatherData);
        res.json(weatherData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                error: error.message
            });
        }
        else {
            // TODO: anonymize error remove api key
            res.status(500).json({
                error: "Unknown error"
            });
        }
    }
});

export default weatherRouter;