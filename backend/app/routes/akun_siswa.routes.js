const { authJwt } = require("../middleware");
const controller = require("../controllers/akun_siswa.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/test/akunsiswa",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.getAkunSiswa
    );

    app.get(
        "/api/test/akunsiswa/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.getByIdAkunSiswa
    );

    app.post(
        "/api/test/akunsiswa",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.createAkunSiswa
    );

    app.patch(
        "/api/test/akunsiswa/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateAkunSiswa
    );

    app.delete(
        "/api/test/akunsiswa/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteAkunSiswa
    );

    app.post(
        "/api/test/loginsiswa",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.loginSiswa
    );
};