const Mongoose     = require('mongoose');
const CommonHelper = require('../Utils/CommonHelper')
const Schema       = Mongoose.Schema;

module.exports = Mongoose.model('User', new Schema({
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
    email: {
        type: String,
        required: true,
        validate: (email) => {
            return CommonHelper.validateEmail(email);
        },
        unique: true,
    },
}, {
    timestamps: true,
    strict: true,
}));
