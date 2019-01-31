const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    googleID: { type: String, required: true },
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 6,
        maxlength: 50,
        validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phoneNumber: {
        type: String,
        minlength: 10,
        maxlength: 10,
        default: "0000000000"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const shema = {
        googleID: Joi.string().required(),
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        email: Joi.string()
            .min(6)
            .max(50)
            .required()
            .email(),
        phoneNumber: Joi.string()
            .min(10)
            .max(10)
            .required(),
        isAdmin: Joi.boolean(),
        id: Joi.string()
    };

    return Joi.validate(user, shema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
