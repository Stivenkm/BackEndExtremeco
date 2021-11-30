const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: {require: true, type: String},
    place: {require: true, type: String},
    location: {require: true, type: String},
});