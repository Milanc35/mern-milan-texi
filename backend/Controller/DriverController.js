const BaseController = require('./BaseController');
const DriverModel = require('../Models/DriverModel');
const DriverService = require('../Services/DriverService');

class DriverController extends BaseController {
    static listDriver(req, res, next) {
        /*
        DriverModel.find()
        .then(drivers => DriverController.successJson(res, {drivers: drivers}))
        //.catch(error => DriverController.errorJson(res, `Failed to get Driver, Error: ${error.message}`));
        .catch(error => console.log(error));
        DriverController.errorJson(res, "Failed to load data");
        */
       DriverService.driverList(drivers => {
           DriverController.commonJsonResponse(res, drivers, "No drivers found");
       });
    }

    static addDriver(req, res) {
        if (!req.body.username) {
            DriverController.errorJson(res, "Please enter username");
        }
        DriverService.getDriverByUserName(req.body.username, driver => {
            if (driver) {
                return DriverController.errorJson(res, "Driver already exist");
            }

            DriverService.addDriverInfo(req.body, driverInfo => {
                DriverController.commonJsonResponse(res, driverInfo, "Failed to save driver Info.", "Driver successfully saved.");
            });
        });
    }

    static getDriverInfo(req, res) {
        DriverService.getDriverInfo(req.params.id, (driverInfo) => {
            DriverController.commonJsonResponse(res, driverInfo, "Driver Info not found.");
        });
    }

    static deleteDriver(req, res) {
        /*
        DriverModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('Driver deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
        */
        if (DriverService.deleteDriverInfo(req.params.id)) {
            DriverController.successJson(res, null, "Driver Info deleted.");
        }
        DriverController.errorJson(res, "Driver Info not found.");
    }

    static updateDriver(req, res, next) {
        next(new Error('Method not allowed', 403));
    }

    static updateAvailability(req, res, next) {
        next(new Error('Method not allowed', 403));
    }

    static addCar(req, res, next) {
        DriverService.addDriverCar(req.params.id, req.body, (carInfo) => {
            DriverController.commonJsonResponse(res, carInfo, "failed to save car info.");
        });
    }

    static updateCar(req, res, next) {
        next(new Error('Method not allowed', 403));
    }

    static deleteCar(req, res, next) {
        DriverService.deleteDriverCar(req.params.id, req.params.carId, (carInfo) => {
            DriverController.commonJsonResponse(res, carInfo, "failed to delete car");
        });
    }
}

module.exports = DriverController;
