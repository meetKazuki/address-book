import { matchedData, validationResult } from 'express-validator';
import ApplicationError from '../helpers/error';

export default (schemas, status = 400) => {
  const validationCheck = async (request, response, next) => {
    const errors = validationResult(request);
    request = { ...request, ...matchedData(request) };

    if (!errors.isEmpty()) {
      const mappedErrors = Object.entries(errors.mapped()).reduce(
        (acc, [key, value]) => {
          acc[key] = value.msg;
          return acc;
        }, {},
      );
      const validationErrors = new ApplicationError(
        status,
        'validation error',
        mappedErrors,
      );

      return next(validationErrors);
    }

    return next();
  };

  return [...(schemas.length && [schemas]), validationCheck];
};
