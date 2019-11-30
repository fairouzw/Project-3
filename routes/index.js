var express = require("express");
var router = express.Router();
var vision = require('@google-cloud/vision');

/* GET home page. */
router.get("/test", function(req, res, next) {

  const client = new vision.ImageAnnotatorClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: `${process.env.GOOGLE_PRIVATE_KEY.split("\\n").join("\n")}`
    }
  });

  // const imagePath = (req.file.url)

  // Performs label detection on the image file
  client.labelDetection('./client/public/logo192.png').then((result) => {
    console.log("result", result)
    const labels = result[0].labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  });

  res.json({});
});

module.exports = router;
