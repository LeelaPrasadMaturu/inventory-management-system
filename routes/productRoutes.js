const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.post('/add', productController.addProduct);
router.post('/:id/delete', productController.deleteProduct);
// // Import the product controller
// const productController = require('./controllers/productController');

// Define the route for updating a product
router.post('/:id/update', productController.updateProduct);




module.exports = router;
