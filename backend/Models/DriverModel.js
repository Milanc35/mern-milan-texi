const Mongoose = require('mongoose');
const Schema   = Mongoose.Schema;

module.exports = Mongoose.model('Driver', new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String
    },
}, {
    timestamps: true,
    strict: true,
}));
