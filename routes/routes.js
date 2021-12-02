const express = require('express')
const user  = require('../controllers/userController').user
const publication = require('../controllers/publicationController').publication
const product = require('../controllers/productController').product
const { middlewareValidateId, middlewareValidateModel } = require('../middleware')
const router = express.Router()

router.route('/users')
    .get(user.get)
    .post(user.add)
    .delete(user.remove)
    .patch(user.editSomeone)
router.route('/publications') 
    .get(publication.get)
    .post(publication.add)
    .delete(publication.remove)
router.route('/products')
    .get(product.get)
    // .post(product.add)
    // .delete(product.remove)
router.route('/users/login')
    .post(user.login)
router.route('/users/:id')
    .all([middlewareValidateId, middlewareValidateModel])
    //.put(user.editAll)
module.exports = router