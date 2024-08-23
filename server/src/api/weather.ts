// import { Router } from 'express';
// import weather from '../weather-ext';
// import { ensureError } from '../utils';

// const weatherRouter = Router();
// const handleError = (res: any, err: unknown) => {
//   const error = ensureError(err);
//   res.status(500).json({
//     error: error.message,
//   });
// };

// const handleWeatherData = (res: any, data: any) => {
//   res.json(data).status(200);
// };

// const handleWeatherRequest = async (req: any, res: any) => {
//   try {
//     const location = req.params.location;
//     // const method = req.params.method as keyof ["current", "forecast", "future"] as string;
//     const method = req.params.method as string;
//     const weatherData = await weather.fetchData(method, location, req.params.days ?? null);
//     handleWeatherData(res, weatherData);
//   } catch (err) {
//     handleError(res, err);
//   }
// };


// weatherRouter.get('/:method/:location', handleWeatherRequest);
// weatherRouter.get('/:method/:location/:days', handleWeatherRequest);

// export default weatherRouter;


import { Router } from 'express';
import weather from '../weather-ext';
import { ensureError } from '../utils';
import { expressCallback } from '../middlewares';

const weatherRouter = Router();

const handleWeatherRequest = async (req: any, res: any) => {
    const location = req.params.location;
    // const method = req.params.method as keyof ["current", "forecast", "future"] as string;
    const method = req.params.method as string;
    return await weather.fetchData(method, location, req.params.days ?? null);

};


weatherRouter.get('/:method/:location', expressCallback(handleWeatherRequest));
weatherRouter.get('/:method/:location/:days', expressCallback(handleWeatherRequest));

export default weatherRouter;
