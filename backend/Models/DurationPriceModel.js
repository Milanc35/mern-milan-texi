const Mongoose    = require('mongoose'),
      Schema      = Mongoose.Schema;

module.exports = Mongoose.model('DurationPrice', new Schema({
    name: {
        type: String,
        required: true,
    },
    duration: { // in Hours
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    }
}, {
    strict: true,
}), 'duration_price');
