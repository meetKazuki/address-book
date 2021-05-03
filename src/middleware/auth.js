import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import ApplicationError from '../helpers/error';
import model from '../models';

config();

const { user } = model;

export default {
  verifyToken: (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new ApplicationError(401, 'authorization header not set');

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
      if (error) return next(new ApplicationError(401, `${error.message}`));

      const { id } = decodedToken;
      const getUser = await user.findByPk(id);
      if (!getUser) return next(new ApplicationError(401, 'invalid credentials'));

      request.user = getUser;

      return next();
    });
  },
};
