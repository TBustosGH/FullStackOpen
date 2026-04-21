const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    phone: {
        type: String,
        minlength: 5
    },
    street: {
        type: String,
        required: false,
        minlength: 5
    },
    city: {
        type: String,
        required: false,
        minlength: 3
    }
})

module.exports = mongoose.model('Person', schema)