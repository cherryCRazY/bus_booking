const auth = require("../routes/auth");
const user = require("../routes/user");
const admin = require("../routes/admin");

module.exports = function(app) {
    app.use("/auth/google", auth);
    app.use("/api", user);
    app.use("/", admin);
};
