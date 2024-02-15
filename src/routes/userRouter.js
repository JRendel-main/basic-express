const express = require('express')
const userController = require('../controller/userController')
const { validateId } = require('../middleware/validateId')
const userRouter = express.Router()


userRouter.get('/users', userController.getUserData)

userRouter.get('/users/:id', validateId, userController.getUserbyId)

userRouter.patch('/users/:id', userController.updateUser)

userRouter.post('/users', userController.createUser)

userRouter.delete('/users/:id', validateId, userController.deleteUser)

module.exports = userRouter