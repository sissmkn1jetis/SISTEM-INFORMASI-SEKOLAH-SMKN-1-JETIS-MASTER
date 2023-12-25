const multer = require("multer");
const path = require('path');

const storageIzin = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/izin");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-sissmkn1jetis-' + file.originalname);
  },
});

const imageFilterIzin = function (req, file, cb) {
  const validExts = [".jpg", ".png", ".jpeg"];

  // if (file.mimetype.startsWith("image")) {
  //   cb(null, true);
  // } else {
  //   cb("Please upload only images.", false);
  // }

  if (!validExts.includes(path.extname(file.originalname))) {
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }

  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 1048576) {
    return cb(new Error("File size is too Big!"));
  }

  cb(null, true);
};

let uploadIzin = multer({ storage: storageIzin, fileFilter: imageFilterIzin, fileSize: 1048576 });
module.exports = uploadIzin;