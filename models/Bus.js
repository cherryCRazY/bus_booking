import mongoose, { SchemaType } from "mongoose";
import { seatShema, validateSeat } from "./Seat";
import Joi from "joi";

const busSchema = new mongoose.Schema({
    places: {
        type: [seatShema],
        required: true
    },
    name: { type: String, required: true },
    stateCarNumber: {
        type: String,
        required: true
    }
});

const Bus = mongoose.model("Bus", busSchema);

const validateBus = bus => {
    const schema = {
        places: Joi.array().items(validateSeat),
        name: Joi.string().required(),
        stateCarNumber: Joi.string().required()
    };

    return Joi.validate(bus, schema);
};

module.exports.Bus = Bus;
module.exports.validateBus = validateBus;
