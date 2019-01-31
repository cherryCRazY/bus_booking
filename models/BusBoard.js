import mongoose from "mongoose";
import { seatShema, validateSeat } from "./Seat";
import { validateBusTransport } from "./BusTransport";
import Joi from "joi";

const busBoardSchema = new mongoose.Schema({
    places: {
        type: [seatShema],
        required: true
    },
    transport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusBoard",
        required: true
    }
});

const BusBoard = mongoose.model("BusBoard", busBoardSchema);

const validateBus = bus => {
    const schema = {
        places: Joi.array().items(validateSeat),
        transport: Joi.ObjectId().required()
    };

    return Joi.validate(bus, schema);
};

module.exports.BusBoard = BusBoard;
module.exports.validateBus = validateBus;
