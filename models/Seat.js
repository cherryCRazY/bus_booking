import mongoose from "mongoose";
import Joi from "joi";

const seatShema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    seatTaken: {
        type: Boolean,
        default: false
    },
    numberOfSeat: {
        type: Number,
        required: true
    }
});

const Seat = mongoose.model("Seat", seatShema);

const validateSeat = seat => {
    const schema = {
        price: Joi.number().required(),
        numberOfSeat: Joi.number().required()
    };
    return Joi.validate(seat, schema);
};

module.exports.Seat = Seat;
module.exports.seatShema = seatShema;
module.exports.validateSeat = validateSeat;
