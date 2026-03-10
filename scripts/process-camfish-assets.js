const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PHOTO_DIR = path.join(__dirname, '../../photo');
const OUTPUT_DIR = path.join(__dirname, '../public/portfolio');

const TARGET_WIDTH = 1280;
const THUMB_HEIGHT = 800; // 16:10 for thumbnail

async function processCamFishAssets() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const files = fs.readdirSync(PHOTO_DIR);

    for (const file of files) {
        if (!file.startsWith('00_캠피시')) continue;

        const inputPath = path.join(PHOTO_DIR, file);
        const fileName = path.parse(file).name;

        let suffix = "";
        if (fileName.includes("01메인")) suffix = "main";
        else if (fileName.includes("02워크플로우")) suffix = "workflow";
        else if (fileName.includes("03디비")) suffix = "db";
        else continue;

        const finalName = `camfish_${suffix}.webp`;
        const outputPath = path.join(OUTPUT_DIR, finalName);

        console.log(`Converting: ${file} -> ${finalName}`);

        const image = sharp(inputPath);

        if (suffix === "main") {
            // Main image should be 16:10 for the card thumbnail
            await image
                .resize(TARGET_WIDTH, THUMB_HEIGHT, { fit: 'cover', position: 'top' })
                .webp({ quality: 85 })
                .toFile(outputPath);
        } else {
            // Workflow and DB images are sensitive - apply permanent blur
            await image
                .resize({ width: 1920, withoutEnlargement: true })
                .blur(7) // Further reduced blur for a more "teaser" look
                .webp({ quality: 85 })
                .toFile(outputPath);
        }

        console.log(`  Done: ${finalName}`);
    }
}

processCamFishAssets().then(() => console.log('CamFish assets processed successfully!'));
