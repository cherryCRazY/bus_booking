import mongoose, { SchemaType } from "mongoose";
import Joi from "joi";

const busRouteSchema = new mongoose.Schema({
    fromCity: {
        type: String,
        required: true
    },
    toCity: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus"
    }
});

const BusRoute = mongoose.model("BusRoute".busRouteSchema);

function validateBusRoute(busRoute) {
    const schema = {
        toCity: Joi.string().required(),
        fromCity: Joi.string().required(),
        data: Joi.date().required()
    };

    return Joi.validate(busRoute, schema);
}

module.exports.BusRoute = BusRoute;
module.exports.validate = validateBusRoute;
