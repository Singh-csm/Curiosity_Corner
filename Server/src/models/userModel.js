const mongoose = require('mongoose');

const userSehema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        emum: ['Male', 'Female'],
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSehema);