const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {require: true, type: String},
    surname: {require: true, type: String},
    mail: {require: true, type: String},
    password: {require: true, type: String},
    seguidores: {default: 0, type: Number}
});