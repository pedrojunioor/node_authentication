const express = require('express');
const userController = require('./controllers/userController');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello World')
})

routes.post('/create-user', userController.createUser)
routes.get('/user/:id', userController.getUser)
routes.get('/users', userController.getUsers )
routes.put('/user/:id', userController.editUser)
routes.delete('/user/:id', userController.deleteUser)

module.exports = routes 