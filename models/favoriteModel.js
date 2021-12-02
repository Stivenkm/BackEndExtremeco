const mongoose = require('../common/services/mongodb');
const { v1: uuidv1 } = require('uuid');
const Schema = mongoose.Schema;
const publicationModel = {}

const UserSchema = new Schema({
    description: {require: true, type: String},
});
const Mymodel = mongoose.model('publication',UserSchema)

publicationModel.get = async(req, res) => {
    try {
        const publication = await Mymodel.find();
        res({state:true,info:publication})
    } catch (error) {
        res({state:false})
    }
}
publicationModel.add = async(req, res) => {
    try {
        //req.body.fecha = new Date();
        const publication = new Mymodel(req.body)
        await publication.save()
        res({ state:true, infor:publication})
        console.log("userModelAdd ok")
    } catch (error) {
        res({state:false, message: error})
    }
}
publicationModel.remove = async(req, res) => {
    try {
        const response = await Mymodel.findByIdAndDelete(req.id)
        res({state: true})
    } catch (error) {
        res({state:false,mensaje:"Publicacion no existente"})
    }
}
module.exports.publication = publicationModel