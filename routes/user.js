const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const requireLogin = require("../middleware/requireLogin");
const isAdmin = require("../middleware/isAdmin");

router.get("/current_user", (req, res) => {
    res.send(req.user);
});

router.post(
    "/current_user/phone_number",
    requireLogin,
    isAdmin,
    async (req, res) => {
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
    }
);

module.exports = router;
