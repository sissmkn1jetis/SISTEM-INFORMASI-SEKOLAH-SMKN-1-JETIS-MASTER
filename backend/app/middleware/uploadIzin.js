const multer = require("multer");

const imageFilterIzin = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storageIzin = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/izin");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-sissmkn1jetis-' + file.originalname);
  },
});

var uploadIzin = multer({ storage: storageIzin, fileFilter: imageFilterIzin });
module.exports = uploadIzin;