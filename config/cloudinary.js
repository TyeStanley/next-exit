const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'next-exit',
  api_key: '522835124813778',
  api_secret: 'fW-7zbg5LpA0R-_VzoGyLpgk8Kc',
  uploadPreset: 'next_exit_profile_pics',
  secure: true
});

module.exports = cloudinary;
