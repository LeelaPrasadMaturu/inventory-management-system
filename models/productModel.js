// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     location: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Location',
//         required: true
//     },
//     icon: {
//         type: String,
//         required: false
//     },
//     quantity: {
//         type: Number,
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     }
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', // Reference to the Location model
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;

