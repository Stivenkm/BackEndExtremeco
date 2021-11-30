const mongoose = require('mongoose');
const userModel = require('../models/usersModel');

const middlewareValidateId = async(req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).json({ message: `MIDDLEWARE: invalid Format _id ${req.params.id}` })
        next()
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const middlewareValidateModel = async(req, res, next) => {
    try {
        const { body } = req;
        const newBody = {}

        // Validamos si tiene todas las propiedades del modelo userModel y hacemos reasignacion
        for (key in body) {
            console.log('key', key);
            if (userModel.hasOwnProperty(key)) {
                return res.status(404).json({ message: `MIDDLEWARE: Your body properties doesn't allowed` })
            }
            newBody[key] = body[key]
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports = { middlewareValidateId, middlewareValidateModel }