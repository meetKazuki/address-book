import { config } from 'dotenv';
import logger from '../config/logger';

config();

export default (error, request, response, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  let errorMessages = {};

  if (response.headersSent) return next(error);
  if (!isProduction && process.env.NODE !== 'test') {
    // logger.info(error.stack);
    errorMessages = error;
  }

  return response.status(error.status || 500).json({
    status: 'error',
    error: {
      message: error.message,
      ...(error.errors && { errors: error.errors }),
      ...(!isProduction && { trace: errorMessages }),
    },
  });
};
