const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function compressImage(inputPath, outputPath, maxSizeMB) {
    let quality = 70;
    let size = fs.statSync(inputPath).size;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    console.log(`Initial size of ${path.basename(inputPath)}: ${(size / 1024 / 1024).toFixed(2)} MB`);

    if (size <= maxSizeBytes) {
        console.log(`File is already below ${maxSizeMB} MB. Copying...`);
        fs.copyFileSync(inputPath, outputPath);
        return;
    }

    while (quality > 10) {
        console.log(`Trying quality: ${quality}...`);
        await sharp(inputPath, { animated: true })
            .webp({ quality, effort: 6 })
            .toFile(outputPath);

        size = fs.statSync(outputPath).size;
        console.log(`Resulting size: ${(size / 1024 / 1024).toFixed(2)} MB`);

        if (size <= maxSizeBytes) {
            console.log(`Success! File compressed to ${(size / 1024 / 1024).toFixed(2)} MB with quality ${quality}`);
            return;
        }
        quality -= 10;
    }

    console.log(`Could not reach target size by lowering quality. Reducing dimensions...`);
    await sharp(inputPath, { animated: true })
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: 50, effort: 6 })
        .toFile(outputPath);

    size = fs.statSync(outputPath).size;
    console.log(`Final size after resizing: ${(size / 1024 / 1024).toFixed(2)} MB`);
}

async function run() {
    const webpInput = "d:/02_Antiqravity/PORTFOLIO/ai-portfolio/public/portfolio/df_ui0200.webp";
    const webpOutput = "d:/02_Antiqravity/PORTFOLIO/ai-portfolio/public/portfolio/df_ui0200_optimized.webp";

    await compressImage(webpInput, webpOutput, 24);

    // Replace original
    fs.unlinkSync(webpInput);
    fs.renameSync(webpOutput, webpInput);
}

run().catch(console.error);
