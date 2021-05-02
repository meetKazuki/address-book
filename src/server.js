import { config } from 'dotenv';
import http from 'http';
import app from './app';
import logger from './config/logger';

config();

const PORT = process.env.NODE_ENV === 'test' ? 6378 : process.env.PORT || 7000;

const server = http.createServer(app);

server.listen(PORT, () => logger.info(`server running on http://localhost:${PORT}`));
