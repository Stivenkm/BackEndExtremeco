const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {require: true, type: String},
    place: {require: true, type: String},
    description: {require: true, type: String},
});