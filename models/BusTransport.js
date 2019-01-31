import mongoose from "mongoose";
import Joi from "joi";

const busTransportSchema = new mongoose.Schema({
    countSeats: { type: Number, required: true },
    name: { type: String, required: true },
    stateCarNumber: {
        type: String,
        required: true
    }
});

const BusTransport = mongoose.model("BusTransport", busSchema);

const validateBus = bus => {
    const schema = {
        countSeats: Joi.number().required(),
        name: Joi.string().required(),
        stateCarNumber: Joi.string().required()
    };

    return Joi.validate(bus, schema);
};

module.exports.BusTransport = BusTransport;
module.exports.busTransportSchema = busTransportSchema;
module.exports.validateBusTransport = validateBus;
