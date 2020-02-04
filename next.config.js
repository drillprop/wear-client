require('dotenv').config();

module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
    CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL
  }
};
