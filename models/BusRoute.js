const mongoose = require("mongoose");
const Joi = require("joi");

const busRouteSchema = new mongoose.Schema({
    fromCity: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    toCity: {
        type: String,
        minlength: 3,
        maxlength: 50,

        required: true
    },
    data: {
        type: Date,
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusBoard"
    },
    price: {
        type: Number,
        min: 0,
        required: true
    }
});

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

function validateBusRoute(busRoute) {
    const schema = {
        toCity: Joi.string()
            .min(3)
            .max(50)
            .required(),
        fromCity: Joi.string()
            .min(3)
            .max(50)
            .required(),
        data: Joi.date().required(),
        bus: Joi.object(),
        price: Joi.number()
            .min(0)
            .required()
    };

    return Joi.validate(busRoute, schema);
}
function simpleValidateBusRoute(busRoute) {
    const schema = {
        toCity: Joi.string()
            .min(3)
            .max(50)
            .required(),
        fromCity: Joi.string()
            .min(3)
            .max(50)
            .required(),
        data: Joi.date().required()
    };

    return Joi.validate(busRoute, schema);
}

module.exports.BusRoute = BusRoute;
module.exports.validateBusRoute = validateBusRoute;
module.exports.simpleValidateBusRoute = simpleValidateBusRoute;
