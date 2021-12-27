const multer = require("multer");
const path = require("path");

const imagesPath = path.resolve(
  path.join(path.dirname(__dirname), "storage/imgs")
);

const storage = multer.diskStorage({
  destination: imagesPath,
  filename: function (req, file, cb) {
    console.log("filename");
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

module.exports = upload;
