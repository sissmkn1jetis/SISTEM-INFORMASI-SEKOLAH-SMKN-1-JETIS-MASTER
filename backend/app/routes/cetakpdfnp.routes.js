const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/cetakpdfnp.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/pdfnilaipengetahuan", controller.cetakPDFNP);
    // app.get("/api/pdfnilaiketrampilan", [authJwt.verifyToken], controller.getcetakPDF);
};