const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUTPUT_DIR = path.join(__dirname, '../public/portfolio');
const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 800;

async function processUnivImages() {
    const files = fs.readdirSync(OUTPUT_DIR);

    for (const file of files) {
        if (!file.startsWith('univ_') || !file.endsWith('.png')) continue;

        const inputPath = path.join(OUTPUT_DIR, file);
        const finalName = file.replace('.png', '.webp');
        const outputPath = path.join(OUTPUT_DIR, finalName);

        console.log(`Resizing: ${file} -> ${finalName}`);

        try {
            await sharp(inputPath)
                .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'top' }) // position top to see the header of the site
                .webp({ quality: 85 })
                .toFile(outputPath);

            console.log(`  Done: ${finalName}`);

            // remove original png
            fs.unlinkSync(inputPath);
        } catch (error) {
            console.error(`  Error processing ${file}:`, error);
        }
    }
}

processUnivImages().then(() => console.log("All done!"));
