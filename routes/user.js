const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
});

module.exports = router;
