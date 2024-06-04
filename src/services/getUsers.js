const { Firestore } = require('@google-cloud/firestore');
const InvalidUserError = require('../exceptions/InvalidUserError');
const getUsers = async () => {

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    });

    const usersCollection = fs.collection('users');

    let users = [];
    const result = await usersCollection.get();
    result.forEach(doc => users.push(doc.data()));

    return users;
}

module.exports = getUsers;