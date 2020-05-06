const BaseController = require('./BaseController'),
      SettingService = require('../Services/SettingService');

class SettingController extends BaseController {
    static updateDurationPrice(req, res, next) {
        SettingService.updateDurationPrice(req.body, (durationPrice) => {
            SettingController.commonJsonResponse(res, durationPrice, "Failed to save duration price confriguation.", "price duration saved successfully.");
        });
    }

    static updateDistancePrice(req, res, next) {
        SettingService.updateDistancePrice(req.body, (distancePrice) => {
            SettingController.commonJsonResponse(res, distancePrice, "Failed to save price distance config.", "price distance saved successfully.");
        });
    }

    static addCarType(req, res, next) {
        SettingService.addCarType(req.body, (carTypeInfo) => {
            SettingController.commonJsonResponse(res, carTypeInfo, "Failed to update car type", "Car type successfully added.");
        });
    }

    static updateCarType(req, res, next) {
        SettingService.updateCarType(req.params.carTypeId, req.body, (carTypeInfo) => {
            SettingController.commonJsonResponse(res, carTypeInfo, "Failed to update car type", "Car type successfully updated.");
        });
    }

    static updatePickHour(req, res, next) {
        SettingService.updatePickHour(req.body, (pickHoursInfo) => {
            SettingController.commonJsonResponse(res, pickHoursInfo, "Failed to save pick hours.", "Pick hour setting updated successfully.");
        });
    }

    static addCarAmenity(req, res, next) {
        SettingService.addCarAmenity(req.body, (carAmenityInfo) => {
            SettingController.commonJsonResponse(res, carAmenityInfo, "Failed to save amenity.", "Car amenity successfully added.");
        });
    }

    static updateCarAmenity(req, res, next) {
        SettingService.updateCarAmenity(req.params.carAmenityId, req.body, (carAmenityInfo) => {
            SettingController.commonJsonResponse(res, carAmenityInfo, "Failed to save amenity.", "Car amenity successfully updated.");
        });
    }
}

module.exports = SettingController;
