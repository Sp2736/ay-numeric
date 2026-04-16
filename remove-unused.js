const { globSync } = require('glob');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
// 1. Where are your images located?
const ASSETS_DIR = './assets/images/**/*.webp';
// 2. Where is your source code located? 
// IMPORTANT: If you use Next.js, this might be './app/**/*...' or './pages/**/*...'
const SOURCE_FILES = './**/*.{html,css,js,php}';
try {
  console.log("Reading your source code...");
  
  // Combine all code into one massive string to search through
  const codeFiles = globSync(SOURCE_FILES);
  let allCodeContent = '';
  codeFiles.forEach(file => {
    allCodeContent += fs.readFileSync(file, 'utf8');
  });

  // Grab all the PNG images
  const images = globSync(ASSETS_DIR);
  let unusedCount = 0;

  console.log(`Checking ${images.length} images against your code...\n`);

  images.forEach(file => {
    const normalizedFile = path.normalize(file);
    const filename = path.basename(normalizedFile);

    // If the filename does NOT exist anywhere in your code
    if (!allCodeContent.includes(filename)) {
      console.log(`[TRASHED] Removing unused asset: ${filename}`);
      
      // Deletes the file
      fs.unlinkSync(normalizedFile); 
      unusedCount++;
    }
  });

  console.log(`\n--- MISSION ACCOMPLISHED ---`);
  console.log(`Successfully deleted ${unusedCount} unused images.`);
  console.log(`Remaining images are ready to be pushed to GitLab.`);

} catch (err) {
  console.error("Script failed:", err);
}