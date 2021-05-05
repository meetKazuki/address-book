import admin from 'firebase-admin';
import firebaseCredential from '../config/firebase-credentials.json';

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential),
  databaseURL: 'https://strv-addressbook-4ba23-default-rtdb.firebaseio.com',
  projectId: 'strv-addressbook-4ba23',
});

export default {
  /**
   * @description method responsible for adding data to firebase
   * @method save
   * @async
   *
   * @param {String} location
   * @param {Object} data
   *
   * @returns {Promise}
   */
  save: async (userId, location, data) => {
    await admin.database().ref(`${userId}/${location}`).push(data);
  },

  /**
   * @description method responsible for fetching all the collections belonging to
   * a userId
   * @method fetch
   * @async
   *
   * @param {String} userId
   * @param {String} location
   *
   * @returns {Object}
   */
  fetch: async (userId, location) => {
    const dataRef = admin.database().ref(`${userId}/${location}`).get();
    const data = (await dataRef).val();
    return Object.values(data);
  },
};
