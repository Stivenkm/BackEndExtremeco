const productsModel = require('../models/productModel').product;
const productController = {}

productController.get = (req, res) => {
    userModel.get(null, (respuesta) => {
        try {
            res.status(200).json({
                info: respuesta.info
            })
        } catch (error) {
            res.status(500).json(respuesta)
        }

    })
}
module.exports.product = productController;