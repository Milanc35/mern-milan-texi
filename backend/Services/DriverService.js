const BaseService = require('./BaseService');
const DriverModel = require('../Models/DriverModel');
const CarModel    = require('../Models/CarModel');
const DriverAvailabilityModel = require('../Models/DriverAvailabilityModel');

class DriverService extends BaseService{
    static driverList(callback) {
        DriverModel.find()
        .then(drivers => callback(drivers))
        //.catch(error => DriverController.errorJson(res, `Failed to get Driver, Error: ${error.message}`));
        .catch(DriverService.reportDbError);
    }

    static getDriverInfo(driverId, callback) {
        DriverModel.findById(driverId).then(driverInfo => {
            if (!driverInfo) {
                return callback(driverInfo);
            }
            DriverService.getDriverAvailability(driverInfo, (availability) => {
                driverInfo = driverInfo.toObject();
                driverInfo.availability = availability || [];
                //driverInfo.set('availability', availability, {strict: false});
                DriverService.getDriverCars(driverInfo, (driverCars) => {
                    driverInfo.car = driverCars || [];
                    callback(driverInfo);
                });

            });
        }).catch(DriverService.reportDbError);
    }

    static getDriverAvailability(driver, callback) {
        if (driver && driver._id) {
            driver = driver._id;
        }

        if (!driver) {
            return callback([]);
        }
        DriverAvailabilityModel.find({driver: driver}, '-_id -driver').then(availability => {
            callback(availability);
        }).catch(DriverService.reportDbError);
    }

    static getDriverCars(driver, callback) {
        if (driver && driver._id) {
            driver = driver._id;
        }

        if (!driver) {
            return callback([]);
        }
        CarModel.find({driver: driver}, '-driver').populate('carType').populate('amenity').then(cars => {
            callback(cars);
        }).catch(DriverService.reportDbError);
    }

    static getDriverByUserName(username, callback) {
        DriverModel.findOne({username: username})
        .then(callback)
        .catch(DriverService.reportDbError)
    }

    static deleteDriverInfo(driverId) {
        try {
            const query = DriverModel.deleteOne({_id: driverId});
            if (query.count() > 0) {
                DriverAvailabilityModel.deleteMany({driverId: driverId});

                return true;
            }
        } catch (e) {
            DriverService.reportDbError(e);
        }

        return false;
    }

    static addDriverInfo(driver, callback) {
        const newDriver = new DriverModel({
            username: driver.username || null,
            description: driver.description || null,
        });
         newDriver.save().then((driverInfo) => {
            if (driver.availability) {
                DriverService.updateDriverAvailabilty(driverInfo._id, driver.availability);
            }
            if (callback) {
                callback(driverInfo);
            } else {
                return driverInfo;
            }
        }).catch(DriverService.reportDbError);
    }

    static updateDriverAvailabilty(driverId, availabilities) {
        if (driverId && availabilities && availabilities instanceof Array) {
            const updateOption = {
                upsert : true,
            };
            availabilities.forEach(availability => {
                const availabiltiyFilter = {driver: driverId, day: availability.day};
                DriverAvailabilityModel.findOne(availabiltiyFilter, (availabilityInfo, err) => {
                    if (err) {
                        DriverService.reportDbError(err);
                        return;
                    }
                    if (!availabilityInfo) {
                        availabilityInfo = new DriverAvailabilityModel({
                            driver: driverId,
                            day: availability.day,
                        });
                    }
                    availabilityInfo.startTime = availability.startTime;
                    availabilityInfo.endTime = availability.endTime;
                    availabilityInfo.save();
                });
            });

            return true;
        }

        return false;
    }

    static addDriverCar(driverId, carParam, callback) {
        if (!driverId || !carParam || !carParam.name || !carParam.carType || !carParam.number) {
            return callback(null);
        }

        const car = new CarModel({
            name: carParam.name || null,
            carType: carParam.carType || null,
            number: carParam.number || null,
            driver: driverId || null,
            amenity: carParam.amenity || [],
        });

        car.save().then(callback).catch(DriverService.reportDbError);
    }

    static deleteDriverCar(driverId, carId, callback) {
        CarModel.deleteOne({driver: driverId, _id: carId})
        .then(res => {
            callback(res.n > 0 ? [] : false)
        })
        .catch(DriverService.reportDbError);
    }
}

module.exports = DriverService;
