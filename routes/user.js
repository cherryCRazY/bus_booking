// API
const express = require("express");
const router = express.Router();

// Middlewares
const isAdmin = require("../middleware/isAdmin");
const requireLogin = require("../middleware/requireLogin");

// Db models
const { User, validateUser } = require("../models/user");
const { simpleValidateBusRoute } = require("../models/BusRoute");
const { validateSeat } = require("../models/Seat");

//Services
const busService = require("../services/bus");

router.get("/current_user", (req, res) => {
    res.send(req.user);
});

router.post(
    "/user_tickets",
    /**requireLogin, */ async (req, res) => {
        const { error } = req.body.tickets
            .map(seat => validateSeat(seat))
            .find(validSeat => (validateSeat(validSeat).error ? true : false));

        if (error)
            return res.status(400).json({ error: error.details[0].message });

        const result = await busService.bookingSeat(req);

        res.send(result);
    }
);

router.post("/bus_route", async (req, res) => {
    const { error } = simpleValidateBusRoute(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const route = await busService.findRoute(req);

    res.send(route);
});

router.post("/current_user/phone_number", requireLogin, async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { id, phoneNumber } = req.body;

    const user = await User.findByIdAndUpdate(
        id,
        { phoneNumber: phoneNumber },
        { new: true }
    );
    await user.save();

    res.send(user);
});

module.exports = router;
