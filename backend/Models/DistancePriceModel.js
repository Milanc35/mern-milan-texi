const Mongoose    = require('mongoose'),
      Schema      = Mongoose.Schema;

module.exports = Mongoose.model('DistancePrice', new Schema({
    start: {
        type: Number,
        required: true,
        min: 0,
        max: 30000
    },
    end: {
        type: Number,
        required: true,
        min: 1, //() => { return ((this.start || 0) + 1) },
        max: 30000,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    }
}, {
    strict: true,
}), 'distance_price');
