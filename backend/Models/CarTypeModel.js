const Mongoose    = require('mongoose'),
      Schema      = Mongoose.Schema;

module.exports = Mongoose.model('CarType', new Schema({
    name: {
        type: String,
        min: 3
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
    },
}, {
    strict: true,
}), 'car_type');
