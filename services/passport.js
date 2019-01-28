const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
const { User, validateUser } = require("../models/user");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        async function(accessToken, refreshToken, profile, done) {
            try {
                let user = null;
                const { id, displayName, emails } = profile;
                user = await User.findOne({ googleID: id });
                if (!user) {
                    user = await new User({
                        googleID: id,
                        name: displayName,
                        email: emails[0].value
                    }).save();
                }
                return done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

module.exports = passport;
