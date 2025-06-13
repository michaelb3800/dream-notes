const sharp = require('sharp');
const path = require('path');

const iconPath = path.join(__dirname, '../assets/images/icon.png');

sharp(iconPath)
  .resize(1024, 1024, { fit: 'cover' })
  .toFile(iconPath + '.tmp')
  .then(() => {
    // Replace the original file
    const fs = require('fs');
    fs.renameSync(iconPath + '.tmp', iconPath);
    console.log('Icon resized to 1024x1024 successfully.');
  })
  .catch(err => {
    console.error('Error resizing icon:', err);
    process.exit(1);
  }); 