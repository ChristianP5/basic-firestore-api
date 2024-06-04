const { Firestore } = require('@google-cloud/firestore');
const InvalidUserError = require('../exceptions/InvalidUserError');

const getUsersById = async (id) => {

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    const usersCollection = fs.collection('users');
    const userDocument = usersCollection.doc(id);

    const result = await userDocument.get();
    const user = result.data();

    if(!user){
        throw new InvalidUserError(`User with id=${id} not found!`);
    }

    return { user: user };

}

module.exports = getUsersById;