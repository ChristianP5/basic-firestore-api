const {
    getRootHandler, postUsersHandler, getUsersHandler,
    getSpecificUserHandler, editUserHandler
} = require('./handler');

const routes = [
    {
        path: '/',
        method: 'GET',
        handler: getRootHandler
    },
    {
        path: '/users',
        method: 'POST',
        handler: postUsersHandler,
    },
    {
        path: '/users',
        method: 'GET',
        handler: getUsersHandler,
    },
    {
        path: '/users/{id}',
        method: 'GET',
        handler: getSpecificUserHandler,
    },
    {
        path: '/users/{id}',
        method: 'PUT',
        handler: editUserHandler,
    }
]

module.exports = routes;