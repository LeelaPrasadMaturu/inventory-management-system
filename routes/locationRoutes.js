const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getLocations);
router.post('/add', locationController.addLocation);
router.post('/:id/delete', locationController.deleteLocation);

module.exports = router;
