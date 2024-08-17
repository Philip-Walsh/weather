import { Router } from "express";
import weather from "../weather-ext";

const weatherRouter = Router();

function ensureError(error:unknown){
    if(error instanceof Error){
        return error;
    }
    return new Error("Unknown error");
}
const handleError = (res: any, err: unknown) => {
    const error = ensureError(err);
    res.status(500).json({
        error: error.message
    });
};

const handleWeatherData = (res: any, data: any) => {
    res.json(data).status(200);
};

const handleWeatherRequest = async (req: any, res: any) => {
    try {
        const location = req.params.location;
        // const method = req.params.method as keyof ["current", "forecast", "future"] as string;
        const method = req.params.method as string;
        const weatherData = await weather.fetchData(method, location);
        handleWeatherData(res, weatherData);
    } catch (err) {
        handleError(res, err);
    }
};

weatherRouter.get("/:method/:location", handleWeatherRequest);


export default weatherRouter;

