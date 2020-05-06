const Mongoose    = require('mongoose'),
      Constants   = require('../Utils/Constants'),
      Schema      = Mongoose.Schema;

module.exports = Mongoose.model('PickHour', new Schema({
    day: {
        type: String,
        enum: Constants.DAY_LIST,
        required: true,
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    }
}, {
    strict: true,
}), 'pick_hours');
