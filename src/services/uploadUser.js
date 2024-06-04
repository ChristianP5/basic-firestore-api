const {Firestore} = require('@google-cloud/firestore');

const uploadUser = async (userID, username, password) => {

    // Connect to Firestore Client at Project
    const fs = new Firestore({
        projectId: process.env.PROJECT_ID,
        databaseId: process.env.FIRESTORE_ID,
    })

    // Create the Document

    const collection = fs.collection('users');
    const userDocument = collection.doc(userID);

    const data = {
        username: username,
        password: password
    }

    return await userDocument.set(data);



}

module.exports = uploadUser;