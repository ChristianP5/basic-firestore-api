const  crypto = require('crypto');

const uploadUser = require('../services/uploadUser');
const getUsers = require('../services/getUsers');
const getUsersById = require('../services/getUserById');
const updateUser = require('../services/updateUser');


const InvalidUserError = require('../exceptions/InvalidUserError');

const getRootHandler = (request, h)=>{
    return h.response({
        status: 'success',
        message: 'Welcome to Root!'
    })
}

const postUsersHandler = async (request, h)=>{

    // Document Name: UserID
    // Document Data:
    // - Username
    // - Password

    const userID = crypto.randomBytes(8).toString('hex');
    const { username, password } = request.payload;

    const upload = await uploadUser(userID, username, password);
    
    if(!upload){
        throw Error;
    }

    const response = h.response({
        status: 'succcess',
        message: `${username} added successfully!`,
        data: {
            userID: userID,
        }
    })

    response.code(201);

    return response;
}

const getUsersHandler = async (request, h) => {
    const users = await getUsers();

    const response = h.response({
        status: 'success',
        message: 'Get All Users Successful!',
        data: {
            users: users
        }
    })

    response.code(200);
    return response;
}

const getSpecificUserHandler = async (request, h)=>{

    try{
        const { id } = request.params;

        const user = await getUsersById(id);
        
        const response = h.response({
            status: 'success',
            message: `User with id=${id} is found!`,
            data: {
                user: user
            }
        })

        response.code(200);

        return response;
    }catch(error){
        if(error instanceof InvalidUserError){
            const response = generateUserNotFoundResponse(error, h);
            return response;
        }
    }
}

const editUserHandler = async (request, h) => {

    const { username, password } = request.payload;
    const { id } = request.params;

    try{
        await updateUser(id, username, password);
        
        const response = h.response({
            status: 'success',
            message: `user with id=${id} is updated successfully!`,
        })

        response.code(200);
        return response;
    }catch(error){
        if(error instanceof InvalidUserError){
            const response = generateUserNotFoundResponse(error, h);
            return response;
        }
    }
    
}

const generateUserNotFoundResponse = (error, h) => {
    const newResponse = h.response({
        status: 'fail',
        message: error.message,
    })

    newResponse.code(error.errorCode); 

    return newResponse;
}

module.exports = {
    getRootHandler, postUsersHandler, getUsersHandler,
    getSpecificUserHandler, editUserHandler
}