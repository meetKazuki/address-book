import { nanoid } from 'nanoid';
import firebaseService from '../services/firebase';

const { save, fetch } = firebaseService;

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

    await save(id, 'contacts', {
      id: nanoid(),
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

  /**
   * @description controller for retrieving all the contacts created by a user
   * @method fetchContacts
   * @async
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object}
   */
  fetchContacts: async (request, response) => {
    const { id } = request.user;
    const data = await fetch(id, 'contacts');

    return response.status(200).json({
      status: 'success',
      message: 'contacts successfully retrieved',
      data,
    });
  },
};
