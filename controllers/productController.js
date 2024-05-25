const Product = require('../models/productModel');
const Location = require('../models/locationModel');

exports.getProducts = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login');
    }
    try {
        const products = await Product.find({ user: req.session.user._id }).populate('location');
        const locations = await Location.find({ user: req.session.user._id });
        res.render('products', { products, locations });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.addProduct = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login');
    }
    const { name, description, quantity, location } = req.body;
    try {
        const product = new Product({
            name,
            description,
            quantity,
            location,
            user: req.session.user._id
        });
        await product.save();

        // Update the location to include this product
        await Location.updateOne(
            { _id: location, user: req.session.user._id },
            { $push: { products: product._id } }
        );

        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.deleteProduct = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login');
    }
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.session.user._id });
        if (product && product.location) {
            await Location.findByIdAndUpdate(product.location, { $pull: { products: product._id } });
        }
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.updateProduct = async (req, res) => {
    const { id, name, description, location, quantity } = req.body;

    try {
        // Find the product by its ID
        const product = await Product.findById(id).populate('location');
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const originalLocationId = product.location ? product.location._id.toString() : null;

        // Update product information
        product.name = name;
        product.description = description;
        product.quantity = quantity;
        product.location = location;

        // Save the updated product
        await product.save();

        // If the location has changed, update the locations' product lists
        if (originalLocationId && originalLocationId !== location) {
            await Location.findByIdAndUpdate(originalLocationId, { $pull: { products: id } });
        }
        if (location && originalLocationId !== location) {
            await Location.findByIdAndUpdate(location, { $push: { products: id } });
        }

        res.redirect('/products');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Server error');
    }
};
