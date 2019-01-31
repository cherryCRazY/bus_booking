const express = require("express");
const router = express.Router();
const { BusRoute, validateBusRoute } = require("../models/BusRoute");
const { Bus } = require("../models/BusTransport");
const { Seat } = require("../models/Seat");
const requireLogin = require("../middleware/requireLogin");
const isAdmin = require("../middleware/isAdmin");

router.post(
    "/api/bus_route",
    /*requireLogin,isAdmin, */ async (req, res) => {
        try {
            const { error } = validateBusRoute(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const { fromCity, toCity, data, price } = req.body;

            const bus = await Bus.findById(req.body.bus.id);

            if (!bus) return;
            const places = [];
            for (let i = 1; i < bus.countSeats; i++) {
                places.push(
                    new Seat({
                        price: price * Math.floor(Math.random() * 1.5),
                        numberOfSeat: i
                    })
                );
            }
            

            const busRoute = new BusRoute({
                toCity,
                fromCity,
                data,
                bus
            });
        } catch {}
    }
);

module.exports = router;
