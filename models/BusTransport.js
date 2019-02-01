const mongoose = require("mongoose");
const Joi = require("joi");

const busTransportSchema = new mongoose.Schema({
    countSeats: { type: Number, required: true },
    name: { type: String, minlength: 5, maxlength: 50, required: true },
    stateCarNumber: {
        type: String,
        required: true
    }
});

const BusTransport = mongoose.model("BusTransport", busTransportSchema);

const validateBusTransport = bus => {
    const schema = {
        countSeats: Joi.number().required(),
        name: Joi.string()
            .min(5)
            .max(50)
            .required(),
        stateCarNumber: Joi.string().required()
    };

    return Joi.validate(bus, schema);
};

module.exports.BusTransport = BusTransport;
module.exports.busTransportSchema = busTransportSchema;
module.exports.validateBusTransport = validateBusTransport;
