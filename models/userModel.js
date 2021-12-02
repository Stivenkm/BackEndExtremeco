const mongoose = require('../common/services/mongodb');
const { v1: uuidv1 } = require('uuid');
const Schema = mongoose.Schema;
const userModel = {}

const UserSchema = new Schema({
    name: {require: true, type: String},
    surname: {require: true, type: String},
    email: {require: true, type: String},
    password: {require: true, type: String},
    confirm: {require: true, type: String},
    //role:{default: user,type: String}

});
const Mymodel = mongoose.model('user',UserSchema)

userModel.get = async(req, res) => {
    try {
        const users = await Mymodel.find();
        res({state:true,info:users})
    } catch (e) {
        res({state:false})
    }
}

userModel.add = async(req, res) => {
    try {
        //req.body.fecha = new Date();
        const user = new Mymodel(req.body)
        await user.save()
        res({ state:true, infor:user})
        console.log("userModelAdd ok")
    } catch (e) {
        res({state:false, message: error})
    }
}

userModel.editAll = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: mongoose.Types.ObjectId(req.params.id) };
        const update = body;

        const doc = await Mymodel.findOneAndUpdate(filter, update, { new: true });

        if (!doc)
            return res.status(404).json({ message: `_id ${req.params.id} doesn't exists` })
        res(doc)
        //res.status(200).json(doc)
    } catch (error) {
        res({ state:false, message: error })
    }
}

userModel.editSomeone = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: mongoose.Types.ObjectId(req.params.id) };
        const update = body;
        delete body._id
        console.log(body)
        const doc = await Mymodel.findOneAndUpdate(filter, update, { new: true });
        
        if (!doc)
            res({state:false, message: `_id ${req.params.id} doesn't exists` })
            //return res.status(404).json({ message: `_id ${req.params.id} doesn't exists` })
        res({state:true,doc})
    } catch (error) {
        res({state:false, message: error })
    }
}

userModel.remove = async(req, res) => {
    try {
        const response = await Mymodel.findByIdAndDelete(req.id)
        res({state: true})
    } catch (error) {
        res({state:false,mensaje:"Usuario no existente"})
    }
}
userModel.login = async(req, res) => {
        try {
            const filter = { _id: mongoose.Types.ObjectId(req.params.id),email:req.email };
            let response = await Mymodel.find(filter)      
            console.log(error)
            res({documentos})
        } catch (e) {
            res({error: e})
        }
}
module.exports.user = userModel