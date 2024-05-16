import { Router } from "express";

const weather = Router();

weather.get("/", (req, res) => {
    res.status(200).send("Hello, this is the weather route!");
});

export default weather;