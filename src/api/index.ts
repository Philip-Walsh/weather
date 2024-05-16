import { Router } from "express";
import weather from './weather';

const api = Router();

api.get('/', (req, res) => {
    res.status(200).send('Hello, this is the api route!');
})


api.use('/weather', weather);

export default api;