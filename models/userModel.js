const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }]
});

module.exports = mongoose.model('User', userSchema);
