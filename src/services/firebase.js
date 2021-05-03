import admin from 'firebase-admin';
import firebaseCredential from '../config/firebase-credentials.json';

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential),
  databaseURL: 'https://strv-addressbook-4ba23-default-rtdb.firebaseio.com',
  projectId: 'strv-addressbook-4ba23',
});

export default {
  saveContact: async (location, data) => {
    await admin.database().ref(`/${location}`).set(data);
  },
};
