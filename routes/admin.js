// API
const express = require("express");
const router = express.Router();

//DB models
const { BusRoute, validateBusRoute } = require("../models/BusRoute");
const {
    BusTransport,
    validateBusTransport
} = require("../models/BusTransport");
const { User, validateUser } = require("../models/user");

//Middleware
const requireLogin = require("../middleware/requireLogin");
const isAdmin = require("../middleware/isAdmin");

//Services
const busService = require("../services/bus");

router.post(
    "/bus_route",
    /*requireLogin,isAdmin, */ async (req, res) => {
        const { error } = validateBusRoute(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const busRoute = busService.setNewRoute(req);

        if (!busRoute)
            return res.status(400).json("The bus_transport id is not founded");

        res.json(busRoute);
    }
);

router.post(
    "/bus",
    /*requireLogin,isAdmin, */ async (req, res) => {
        const { error } = validateBusTransport(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { countSeats, name, stateCarNumber } = req.body;

        const newBus = new BusTransport({
            countSeats,
            name,
            stateCarNumber
        });
        await newBus.save();

        res.json(newBus);
    }
);

router.get(
    "/users",
    /*requireLogin,isAdmin, */ async (req, res) => {
        const users = await User.find({})
            .select("-__v")
            .sort({ name: 1 });
        res.send(users);
    }
);

router.delete(
    "/user",
    /*requireLogin,isAdmin, */ async (req, res) => {
        // try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findByIdAndRemove(req.body._id);

        if (!user) res.status(404).send("User not found");

        res.send(req.body);
    }
);
router.get(
    "/routes",
    /*requireLogin,isAdmin, */ async (req, res) => {
        const routes = await BusRoute.find({})
            .populate("bus")
            .sort("dateStart")
            .where({ dateStart: { $gte: new Date() } })
            .select("-__v");

        res.send(routes);
    }
);

router.delete(
    "/routes",
    /*requireLogin,isAdmin, */ async (req, res) => {
        const { error } = validateBusRoute(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const route = await BusRoute.findByIdAndDelete(req.body._id);

        if (!route) res.status(404).json("Route not found");

        res.send(route);
    }
);
router.get(
    "/buses",
    /*requireLogin,isAdmin, */ async (req, res) => {
        const route = await BusTransport.find({}).select("-__v");

        res.send(route);
    }
);

module.exports = router;
