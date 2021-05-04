import { nanoid } from 'nanoid';
import firebaseService from '../services/firebase';

const { save } = firebaseService;

export default {
  /**
   * @description controller for creating a new contact and saving it to firebase
   * @method createContact
   * @async
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object}
   */
  createContact: async (request, response) => {
    const { id } = request.user;
    const { first_name, last_name, phone, address } = request.body;

    await save('contacts', {
      id: nanoid(),
      user_id: id,
      first_name,
      last_name,
      phone,
      address,
    });

    return response.status(201).json({
      status: 'success',
      message: 'contact successfully saved',
    });
  },
};
