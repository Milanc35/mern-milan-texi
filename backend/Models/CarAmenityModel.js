const Mongoose    = require('mongoose'),
      Schema      = Mongoose.Schema;

const CarAmenity = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
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
});

module.exports = Mongoose.model('CarAmenity', CarAmenity, 'car_amenity');
