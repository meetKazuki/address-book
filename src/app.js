import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import errorHandler from './middleware/errorHandler';
import router from './routes';
import swaggerDoc from '../docs/swagger-doc.json';

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
if (!['test'].includes(process.env.NODE_ENV)) app.use(morgan('dev'));

app.use('/api/v1', router);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get('/api/v1', (request, response) => {
  response.status(200).json({
    status: 'success',
    message: 'welcome to "Address Book API v1"',
  });
});

app.get('*', (request, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

app.use(errorHandler);

export default app;
