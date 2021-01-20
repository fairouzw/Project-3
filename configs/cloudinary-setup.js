const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: "thing-gallery",
  allowedFormats: ["jpg", "png"],
  filename: function (req, res, cb) {
    cb(null, res.originalname);
  },
});

const uploader = multer({ storage });
module.exports = uploader;
