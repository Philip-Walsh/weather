import express from 'express';
import api from './api';


const PORT = Number(process.env.PORT) || 3000;
const server = express();

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

server.use('/', api);


// export { server };
export { server as default };