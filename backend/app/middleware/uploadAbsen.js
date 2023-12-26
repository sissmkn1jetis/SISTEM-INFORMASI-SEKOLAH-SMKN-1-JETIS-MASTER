const multer = require("multer");
const path = require('path');

var storageAbsen = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/absen");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-sissmkn1jetis-' + file.originalname);
  },
});

const imageFilterAbsen = (req, file, cb) => {
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

let uploadAbsen = multer({ storage: storageAbsen, fileFilter: imageFilterAbsen, fileSize: 1048576 });

module.exports = uploadAbsen;