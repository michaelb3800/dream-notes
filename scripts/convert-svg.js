const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');
const tutorialDir = path.join(assetsDir, 'tutorial');

// Convert logo
sharp(path.join(assetsDir, 'logo.svg'))
  .png()
  .toFile(path.join(assetsDir, 'logo.png'))
  .catch(console.error);

// Convert tutorial images
const tutorialImages = ['welcome', 'notes', 'ai', 'study'];
tutorialImages.forEach(image => {
  sharp(path.join(tutorialDir, `${image}.svg`))
    .png()
    .toFile(path.join(tutorialDir, `${image}.png`))
    .catch(console.error);
}); 