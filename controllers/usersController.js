const { v1: uuidv1 } = require('uuid');
const mongoose = require('../common/services/mongodb');
const userModel = require('../models/usersModel');

const User = mongoose.model('users', userModel);
const usersController = {}

usersController.getUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

usersController.addUser = async(req, res) => {
    try {
        req.body.fecha = new Date();
        const user = new User(req.body)
        await user.save()

        res.status(200).json({ ok: true })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

usersController.editAll = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: mongoose.Types.ObjectId(req.params.id) };
        const update = body;

        const doc = await User.findOneAndUpdate(filter, update, { new: true });

        if (!doc)
            return res.status(404).json({ message: `_id ${req.params.id} doesn't exists` })

        res.status(200).json(doc)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

usersController.editSomeone = async(req, res) => {
    try {
        const { body } = req;
        const filter = { _id: mongoose.Types.ObjectId(req.params.id) };
        const update = body;
        delete body._id
        console.log(body)
        const doc = await User.findOneAndUpdate(filter, update, { new: true });

        if (!doc)
            return res.status(404).json({ message: `_id ${req.params.id} doesn't exists` })

        res.status(200).json(doc)
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

usersController.remove = async(req, res) => {
    try {
        const filter = { _id: mongoose.Types.ObjectId(req.params.id) };
        let response = await User.remove(filter)
        res.status(200).json({ OK: true, deletedCount: response.deletedCount })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

module.exports.users = usersController;