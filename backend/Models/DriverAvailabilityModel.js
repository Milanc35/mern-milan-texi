const Mongoose    = require('mongoose'),
      Constants   = require('../Utils/Constants'),
      DriverModel = require('./DriverModel'),
      Schema      = Mongoose.Schema;

const DriverAvailabilitySchema = new Schema({
    day: {
        type: String,
        enum: Constants.DAY_LIST,
        required: true,
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: DriverModel,
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
}, {
    strict: true,
});

DriverAvailabilitySchema.index({day: 1, driverId: 1}, {unique: true});

module.exports = Mongoose.model('DriverAvailability', DriverAvailabilitySchema, 'driver_availability');
