import ApplicationError from '../helpers/error';
import { generateJWT } from '../helpers/auth';
import model from '../models';

const { user } = model;

export default {
  /**
   * @description controller for creating a new user
   * @method createUser
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object}
   */
  createUser: async (request, response) => {
    const existingUser = await user.getExisting(request.body.email);
    if (existingUser) throw new ApplicationError(409, 'email is already in use.');

    const newUser = await user.create(request.body);
    const token = await generateJWT(newUser);

    return response.status(201).json({
      status: 'success',
      message: 'user successfully registered',
      data: {
        token,
        user: newUser,
      },
    });
  },

  /**
   * @description controller for signing in user
   * @method signinUser
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object}
   */
  signinUser: async (request, response) => {
    const { email, password } = request.body;

    const getUser = await user.getExisting(email);
    if (!getUser) throw new ApplicationError(401, 'email/password is incorrect');

    const getPassword = await getUser.validatePassword(password);
    if (!getPassword) throw new ApplicationError(401, 'email/password is incorrect');

    const token = await generateJWT(getUser);

    return response.status(200).json({
      status: 'success',
      message: 'user successfully logged-in',
      data: {
        token,
        user: getUser,
      },
    });
  },
};
