const multer = require("multer");
//configuaracion de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
//instancia de multer
const upload = multer({ storage });

module.exports = upload;
