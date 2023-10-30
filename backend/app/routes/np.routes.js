const { authJwt } = require("../middleware");
const controller = require("../controllers/np.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/test/listnp",
        [authJwt.verifyToken, authJwt.isGuru],
        controller.getNP
    );

    app.get(
        "/api/test/listnp/:id",
        [authJwt.verifyToken, authJwt.isGuru],
        controller.getNPById
    );

    app.post(
        "/api/test/listnp/:siswaId",
        [authJwt.verifyToken, authJwt.isGuru],
        controller.createNP
    );

    app.patch(
        "/api/test/listnp/:id",
        // [authJwt.verifyToken, authJwt.isGuru],
        controller.updateNP
    );

    app.delete(
        "/api/test/listnp/:id",
        // [authJwt.verifyToken, authJwt.isGuru],
        controller.deleteNP
    );
};