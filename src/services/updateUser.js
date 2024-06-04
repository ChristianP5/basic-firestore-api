const { Firestore } = require('@google-cloud/firestore');
const InvalidUserError = require('../exceptions/InvalidUserError');


const updateUser = async (id, username, password) => {

    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    

    const userCollection = fs.collection('users');
    const userDocument = userCollection.doc(id);

    const data = {
        username: username,
        password: password,
    }

    try{
        const result = await userDocument.update(data);
        return result;
    }catch{
        throw new InvalidUserError(`User with id=${id} doesn't exist!`);
    }

    
}

module.exports = updateUser;