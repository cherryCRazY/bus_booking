const auth = require("../routes/auth");
const user = require("../routes/user");
const admin = require("../routes/admin");

module.exports = function(app) {
    app.use("/auth/google", auth);
    app.use("/admin", admin);
    app.use("/api", user);
};
