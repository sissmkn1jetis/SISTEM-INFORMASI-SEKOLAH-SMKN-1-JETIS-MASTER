const multer = require("multer");

const imageFilterAbsen = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storageAbsen = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/absen");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-sissmkn1jetis-' + file.originalname);
  },
});

var uploadAbsen = multer({ storage: storageAbsen, fileFilter: imageFilterAbsen });

module.exports = uploadAbsen;