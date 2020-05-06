const Router = require('express').Router();
const DriverController = require('../Controller/DriverController');

// Driver APIs
Router.route('/').get(DriverController.listDriver);
Router.route('/add').post(DriverController.addDriver);
Router.route('/:id').get(DriverController.getDriverInfo)
                    .delete(DriverController.deleteDriver)
                    .post(DriverController.updateDriver);

// Driver availability
Router.route('/:id/availability').post(DriverController.updateAvailability);

// Driver Car
Router.route('/:id/car/add').post(DriverController.addCar);
Router.route('/:id/car/:carId').post(DriverController.updateCar)
                               .delete(DriverController.deleteCar);

module.exports = Router;
