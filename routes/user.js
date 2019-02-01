const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const requireLogin = require("../middleware/requireLogin");
const isAdmin = require("../middleware/isAdmin");
const { BusRoute, simpleValidateBusRoute } = require("../models/BusRoute");

router.get("/current_user", (req, res) => {
    res.send(req.user);
});

router.post("/bus_route", async (req, res) => {
    try {
        const { error } = simpleValidateBusRoute(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { fromCity, toCity, data } = req.body;

        const startData = new Date(data);
        let result = new Date(data);
        const endData = new Date(result.setDate(result.getDate() + 1));

        const route = await BusRoute.find({
            fromCity,
            toCity,
            data: { $gte: startData, $lt: endData }
        });

        res.send(route);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/current_user/phone_number", requireLogin, async (req, res) => {
    try {
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
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
