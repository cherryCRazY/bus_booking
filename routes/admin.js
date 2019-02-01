const express = require("express");
const router = express.Router();
const { BusRoute, validateBusRoute } = require("../models/BusRoute");
const {
    BusTransport,
    validateBusTransport
} = require("../models/BusTransport");
const { BusBoard } = require("../models/BusBoard");
const { Seat } = require("../models/Seat");
const requireLogin = require("../middleware/requireLogin");
const isAdmin = require("../middleware/isAdmin");

router.post(
    "/bus_route",
    /*requireLogin,isAdmin, */ async (req, res) => {
        try {
            const { error } = validateBusRoute(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const { fromCity, toCity, data, price, bus } = req.body;

            const findedBus = await BusTransport.findById(bus.id);

            if (!findedBus)
                return res
                    .status(400)
                    .send("The bus_transport id is not founded");

            const places = [];

            for (let i = 1; i <= findedBus.countSeats; i++) {
                places.push(
                    new Seat({
                        price,
                        numberOfSeat: i
                    })
                );
            }
            const busBoard = new BusBoard({
                places,
                transport: bus.id
            });
            await busBoard.save();
            console.log(busBoard);

            const busRoute = new BusRoute({
                toCity,
                fromCity,
                data,
                price,
                bus: {
                    _id: busBoard.id
                }
            });
            console.log("busRoute");
            console.log(busRoute);

            await busRoute.save();

            res.send(busRoute);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

router.post(
    "/bus",
    /*requireLogin,isAdmin, */ async (req, res) => {
        try {
            const { error } = validateBusTransport(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const { countSeats, name, stateCarNumber } = req.body;
            const newBus = new BusTransport({
                countSeats,
                name,
                stateCarNumber
            });
            await newBus.save();

            res.send(newBus);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

module.exports = router;
