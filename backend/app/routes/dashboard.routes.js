const { authJwt } = require("../middleware");
const controller = require("../controllers/dashboard.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/dashboard",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.getTotal
    );
    app.get(
        "/api/dashboardNilai",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getTotalNilai
    );
    app.get(
        "/api/dashboardSiswaWalas",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getTotalSiswaByWalas
    );
};