const express = require('express');
const router = express.Router();
var vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: `${process.env.GOOGLE_PRIVATE_KEY.split("\\n").join("\n")}`
    }
  });

// include CLOUDINARY:
const uploader = require('../configs/cloudinary-setup');

router.post('/upload', uploader.single("imgUrl"), (req, res, next) => {

      const imagePath = (req.file.secure_url)

    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }

    client.labelDetection(imagePath).then((result) => {
        console.log("result", result)
        const labels = result[0].labelAnnotations.map(label => label.description);
        res.json({ secure_url: req.file.secure_url, tags:  labels });
      });
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
})

module.exports = router;