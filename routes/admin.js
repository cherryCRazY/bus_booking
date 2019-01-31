const express = require("express");
const router = express.Router();
const { BusRoute, validateBusRoute } = require("../models/BusPath");
const { BusTransport } = require("../models/BusTransport");
const { BusBoard } = require("../models/BusBoard");
const { Seat } = require("../models/Seat");
const requireLogin = require("../middleware/requireLogin");
const isAdmin = require("../middleware/isAdmin");

router.post(
    "/api/bus_route",
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

            for (let i = 1; i < findedBus.countSeats; i++) {
                places.push(
                    new Seat({
                        price: price * Math.floor(Math.random() * 1.5),
                        numberOfSeat: i
                    })
                );
            }
            const busBoard = new BusBoard({
                places,
                transport: bus.id
            });

            const busRoute = new BusRoute({
                toCity,
                fromCity,
                data,
                bus: {
                    ...busBoard
                }
            });
            await busRoute.save();

            res.send(busRoute);
        } catch (error) {
            res.status(400).send(error);
        }
    }
);

router.post("/api/bus", /*requireLogin,isAdmin, */ async (req, res) => {});

module.exports = router;
