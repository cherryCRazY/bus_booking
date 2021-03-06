const { seatShema, validateSeat } = require("./Seat");
const mongoose = require("mongoose");
const Joi = require("joi");

const busBoardSchema = new mongoose.Schema({
    places: {
        type: [seatShema]
    },
    transport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusTransport",
        required: true
    }
});

busBoardSchema.index({ places: 1 }, { unique: true, sparse: true });

const BusBoard = mongoose.model("BusBoard", busBoardSchema);

const validateBus = bus => {
    const schema = {
        places: Joi.array().items(validateSeat),
        transport: Joi.ObjectId().required()
    };

    return Joi.validate(bus, schema);
};

module.exports.BusBoard = BusBoard;
module.exports.busBoardSchema = busBoardSchema;
module.exports.validateBusBoard = validateBus;
