const sharp = require('sharp');
const { globSync } = require('glob');
const fs = require('fs');
const path = require('path');

// Target your assets directory here. Adjust if your path is different!
const ASSETS_DIR = './assets/images/**/*.png';

try {
  // globSync returns an array of matching file paths synchronously
  const files = globSync(ASSETS_DIR);

  if (files.length === 0) {
    console.log("No PNG files found. Double-check the ASSETS_DIR path!");
  } else {
    console.log(`Found ${files.length} PNG files. Starting conversion...`);
  }

  files.forEach(file => {
    // Standardize paths (especially helpful on Windows)
    const normalizedFile = path.normalize(file);
    const dir = path.dirname(normalizedFile);
    const ext = path.extname(normalizedFile);
    const basename = path.basename(normalizedFile, ext);
    const newFilePath = path.join(dir, `${basename}.webp`);

    sharp(normalizedFile)
      .webp({ quality: 80 }) // Adjust quality as needed (0-100)
      .toFile(newFilePath)
      .then(() => {
        console.log(`Converted: ${normalizedFile} -> ${newFilePath}`);
        // Uncomment the next line ONLY when you are ready to delete the original PNGs
        // fs.unlinkSync(normalizedFile); 
      })
      .catch(err => console.error(`Error converting ${normalizedFile}:`, err));
  });

} catch (err) {
  console.error("Error finding files:", err);
}
