const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get(
    "/",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
router.get("/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/");
});

module.exports = router;
