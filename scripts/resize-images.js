const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.join(__dirname, '../../photo');
const OUTPUT_DIR = path.join(__dirname, 'public/portfolio');

// Target 16:10 aspect ratio, e.g., 1440x900 or 1280x800. Let's use 1280x800 for high quality thumbnails
const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 800;

async function processImages() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const files = fs.readdirSync(INPUT_DIR);

    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) continue;

        const inputPath = path.join(INPUT_DIR, file);

        // Sanitize output filename (remove Korean chars/spaces if needed, or just keep it simple)
        // For web, it's better to use English alphanumeric names.
        // We will generate the mapping later. Uniquely prefixing is good.
        let safeName = file.replace(/[^a-zA-Z0-9.\-_]/g, '');
        if (safeName.startsWith('.')) {
            // If all chars were removed (e.g., pure korean name), just use a timestamp-like name or index
            safeName = `img_${Date.now()}_${Math.floor(Math.random() * 1000)}${path.extname(file)}`;
        }

        // Add prefix based on original name loosely to help identify
        let prefix = 'proj_';
        if (file.includes('서든')) prefix = 'sudden_';
        if (file.includes('던파')) prefix = 'df_';
        if (file.includes('뷰저블')) prefix = 'buzzable_';
        if (file.includes('빅데이터')) prefix = 'bigdata_';
        if (file.includes('신구대')) prefix = 'shingu_';
        if (file.includes('콜옵')) prefix = 'cod_';

        const finalName = `${prefix}${path.parse(file).name.replace(/[^a-zA-Z0-9]/g, '')}.webp`;
        const outputPath = path.join(OUTPUT_DIR, finalName);

        console.log(`Processing: ${file} -> ${finalName}`);

        try {
            if (file.toLowerCase().endsWith('.gif')) {
                // For GIFs, we just copy them or use sharp if it supports it properly, 
                // but sharp with gifs can be tricky (loses animation by default unless animated: true).
                // It's safer to just resize first frame as thumbnail, or keep animated if requested.
                // Let's create a webp animated version if possible, or just copy.
                await sharp(inputPath, { animated: true })
                    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'center' })
                    .webp()
                    .toFile(outputPath);
            } else {
                await sharp(inputPath)
                    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'center' })
                    .webp({ quality: 80 })
                    .toFile(outputPath);
            }
            console.log(`  Done: ${finalName}`);
        } catch (error) {
            console.error(`  Error processing ${file}:`, error);
        }
    }
}

processImages().then(() => console.log("All done!"));
