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
   * @method saveContact
   * @async
   *
   * @param {String} location
   * @param {Object} data
   */
  save: async (location, data) => {
    await admin.database().ref(`/${location}`).push(data);
  },
};
