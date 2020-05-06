const Router = require('express').Router();
const SettingController = require('../Controller/SettingController');

// setting/price
Router.post('/price/duration', SettingController.updateDurationPrice);
Router.post('/price/distance', SettingController.updateDistancePrice);
Router.post('/price/pick-hours', SettingController.updatePickHour);

// setting/car/type
Router.post('/car/type/add', SettingController.addCarType);
Router.post('/car/type/:carTypeId/update', SettingController.updateCarType);

// setting/car/amenity
Router.post('/car/amenity/add', SettingController.addCarAmenity);
Router.post('/car/amenity/:carAmenityId/update', SettingController.updateCarAmenity);


module.exports = Router;
