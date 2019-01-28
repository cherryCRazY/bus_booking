const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = { id };
        console.log(user);
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
                const { id, displayName } = profile;
                const user = { id, displayName };
                return done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);
