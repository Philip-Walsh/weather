import express from 'express';
import api from './api';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const server = express();
server.use(cors());

server.listen(PORT, () => {
  console.log(`☀️ 🌧️ Server is running on port: ${PORT} 🌩️ 🌤️`);
});

server.use('/', api);

export { server as default };
