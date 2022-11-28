const express = require('express')

// Creating the route here
const router = express.Router()

// Importing User handler function here
const userCotroller = require('../contoller/userController')

// Routes related to User
router.route('/').get(userCotroller.getAllUsers).post(userCotroller.createUser)
router.route('/:id').get(userCotroller.getUser).patch(userCotroller.UpdateUser).delete(userCotroller.deleteUser)

module.exports = router
