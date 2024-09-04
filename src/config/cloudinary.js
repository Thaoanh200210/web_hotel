// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: "distlngqc",
  api_key: "758885667496425",
  api_secret: process.env.CLOUDINARY_KEY_SECRET,
});

// Log the configuration
console.log(cloudinary.config());

module.exports = cloudinary;
