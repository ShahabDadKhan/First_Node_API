const express = require('express')
// Creating the route
const router = express.Router()

// Importing tour handlers here
const tourController = require('../contoller/tourController')

router.param('id', tourController.checkTourId)

// Routes related to Tours
router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.addTour)
// Get A Specific Tour By Id // Changes the methods
router.route('/:id').get(tourController.getTour).patch(tourController.editTour).delete(tourController.deleteTour) 

module.exports = router