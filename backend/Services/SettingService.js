const BaseService = require('./BaseService'),
      DurationPriceModel = require('../Models/DurationPriceModel'),
      DistancePriceModel = require('../Models/DistancePriceModel'),
      CarTypeModel       = require('../Models/CarTypeModel'),
      CarAmenityModel    = require('../Models/CarAmenityModel'),
      PickHourModel      = require('../Models/PickHourModel');

class SettingService extends BaseService {
    static updateDurationPrice(params, callback) {
        if (!params instanceof Array) {
            return callback(null);
        }

        let durationPriceInfo = [];
        params.forEach((dutationInfo, i) => {
            const durationPrice = {
                name : dutationInfo.name || null,
                duration: dutationInfo.duration || null,
                price: dutationInfo.price || null,
            };
            durationPriceInfo.push(durationPrice);
        });
        DurationPriceModel.deleteMany({}).then(deleteResult => {
            if (deleteResult) {
                DurationPriceModel.create(durationPriceInfo).then(callback)
                .catch(SettingService.reportDbError);
            }
        }).catch(SettingService.reportDbError);
    }

    static updateDistancePrice(params, callback) {
        if (!params instanceof Array) {
            return callback(null);
        }

        let distancePriceInfo = [];
        params.forEach((distanceInfo, i) => {
            distancePriceInfo.push({
                start : distanceInfo.start,
                end: distanceInfo.end || null,
                price: distanceInfo.price || null,
            });
        });

        DistancePriceModel.deleteMany({}).then(deleteResult => {
            if (deleteResult) {
                DistancePriceModel.create(distancePriceInfo).then(callback)
                .catch(SettingService.reportDbError);
            }
        }).catch(SettingService.reportDbError);
    }

    static addCarType(carTypeParam, callback) {
        // CarTypeModel
        if (!carTypeParam || !carTypeParam.name || !carTypeParam.basePrice) {
            return callback(null);
        }

        const carType = new CarTypeModel({
            name : carTypeParam.name || null,
            basePrice : carTypeParam.basePrice || null,
            description : carTypeParam.description || null,
        });
        carType.save()
            .then(callback)
            .catch(SettingService.reportDbError);
    }

    static updateCarType(carTypeId, carTypeParam, callback) {
        if (!carTypeParam) {
            return callback(null);
        }

        CarTypeModel.updateOne({_id: carTypeId}, carTypeParam)
            .then(res => { callback(res.n > 0 ? [] : false) })
            .catch(SettingService.reportDbError);
    }

    static updatePickHour(params, callback) {
        if (!params instanceof Array) {
            return callback(null);
        }

        let pickHours = [];
        params.forEach((pickHourParam, i) => {
            pickHours.push({
                day : pickHourParam.day || null,
                startTime: pickHourParam.startTime || null,
                endTime: pickHourParam.endTime || null,
                price: pickHourParam.price || null,
            });
        });
        PickHourModel.deleteMany({}).then(deleteResult => {
            if (deleteResult) {
                PickHourModel.create(pickHours).then(callback)
                .catch(SettingService.reportDbError);
            }
        }).catch(SettingService.reportDbError);
    }

    static addCarAmenity(carAmenityParam, callback) {
        if (!carAmenityParam || !carAmenityParam.name || !carAmenityParam.basePrice) {
            return callback(null);
        }

        const carType = new CarAmenityModel({
            name : carAmenityParam.name || null,
            basePrice : carAmenityParam.basePrice || null,
            description : carAmenityParam.description || null,
        });
        carType.save()
            .then(callback)
            .catch(SettingService.reportDbError);
    }

    static updateCarAmenity(carAmenityId, carAmenityParam, callback) {
        if (!carAmenityParam) {
            return callback(null);
        }

        CarAmenityModel.updateOne({_id: carAmenityId}, carAmenityParam)
            .then(res => {
                callback(res.n > 0 ? [] : false);
            })
            .catch(SettingService.reportDbError);
    }
}

module.exports = SettingService;
