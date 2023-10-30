const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/cetakpdfnk.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/pdfnilaiketrampilan", [authJwt.verifyToken], controller.cetakPDFNK)
    // app.get("/api/pdfnilaiketrampilan", [authJwt.verifyToken], controller.getcetakPDF);
};