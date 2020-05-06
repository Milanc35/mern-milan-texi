const Mongoose     = require('mongoose'),
      CarTypeModel = require('./CarTypeModel'),
      DriverModel  = require('./DriverModel'),
      CarAmenityModel  = require('./CarAmenityModel'),
      Schema       = Mongoose.Schema;

module.exports = Mongoose.model('Car', new Schema({
    name: {
        type: String,
        required: true,
    },
    carType: {
        type: Schema.Types.ObjectId,
        ref: CarTypeModel,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: DriverModel,
        required: true,
    },
    amenity: [{
        type: Schema.Types.ObjectId,
        ref: CarAmenityModel
    }],
}, {
    strict: true,
}));
