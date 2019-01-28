const auth = require("../routes/auth");
const user = require("../routes/user");

module.exports = function(app) {
    app.use("/auth/google", auth);
    app.use("/api", user);
};
