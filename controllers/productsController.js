const { v1: uuidv1 } = require('uuid');
const mongoose = require('../common/services/mongodb');
const productsModel = require('../models/productsModel');

const Products = mongoose.model('products', productsModel);
const productsController = {}
productsController.getProducts = async(req, res) => {
    try {
        const product = await Products.find();
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}
module.exports.products = productsController;