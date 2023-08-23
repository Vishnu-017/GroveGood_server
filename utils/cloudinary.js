const cloudinary = require("cloudinary").v2;


// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// cloudinary.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
if (cloudinary.config().cloud_name && cloudinary.config().api_key && cloudinary.config().api_secret) {
  console.log('Cloudinary is connected!');
} else {
  console.log('Cloudinary connection failed.');
}
module.exports = cloudinary;
