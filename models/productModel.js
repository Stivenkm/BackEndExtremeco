const mongoose = require('../common/services/mongodb');
const { v1: uuidv1 } = require('uuid');
const Schema = mongoose.Schema;
const productModel = {}

const UserSchema = new Schema({
    name: {require: true, type: String},
    value:{require: true, type: String},
    place:{require: true, type: String}
});
const Mymodel = mongoose.model('product',UserSchema)

productModel.get = async(req, res) => {
    try {
        const products = await Mymodel.find();
        res({state:true,info:products})
    } catch (error) {
        res({state:false})
    }
}
productModel.add = async(req, res) => {
    try {
        //req.body.fecha = new Date();
        const products = new Mymodel(req.body)
        await products.save()
        res({ state:true, infor:products})
        console.log("userModelAdd ok")
    } catch (error) {
        res({state:false, message: error})
    }
}
productModel.remove = async(req, res) => {
    try {
        const response = await Mymodel.findByIdAndDelete(req.id)
        res({state: true})
    } catch (error) {
        res({state:false,mensaje:"Producto no existente"})
    }
}
module.exports.product = productModel