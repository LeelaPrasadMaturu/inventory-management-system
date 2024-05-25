const Location = require('../models/locationModel');

exports.getLocations = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login');
    }
    try {
        const locations = await Location.find({ user: req.session.user._id }).populate('products');
        res.render('locations', { locations });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


exports.addLocation = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login');
    }
    const { name } = req.body;
    try {
        const location = new Location({ name, user: req.session.user._id });
        await location.save();
        res.redirect('/locations');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const Product = require('../models/productModel');

exports.deleteLocation = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect('/login');
    }

    try {
        // Delete the location
        const location = await Location.findOneAndDelete({ _id: req.params.id, user: req.session.user._id });

        if (!location) {
            return res.status(404).send('Location not found');
        }

        // Delete all products that reference this location
        await Product.deleteMany({ location: req.params.id });

        res.redirect('/locations');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
