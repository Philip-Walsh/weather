import express from 'express';
import api from './api';
import cors from 'cors';
import dotenv from 'dotenv';


import {
validateRequest,
errorHandler,
notFound } from './middlewares';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const server = express();
server.use(cors());

server.listen(PORT, () => {
  console.log(`☀️ 🌧️ Server is running on port: ${PORT} 🌩️ 🌤️`);
});

server.use('/', api);
server.use(validateRequest)
server.use(errorHandler)
server.use(notFound)

export { server as default };
