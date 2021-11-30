const express = require('express')
const usersController = require('../controllers/usersController').users
const productsController = require('../controllers/productsController')
const { middlewareValidateId, middlewareValidateModel } = require('../middleware')
const router = express.Router()

router.route('/users')
    .get(usersController.getUsers)
    .post(usersController.addUser)

router.route('/users/:id')
    .all([middlewareValidateId, middlewareValidateModel])
    .put(usersController.editAll)
    .patch(usersController.editSomeone)
    .delete(usersController.remove)
module.exports = router