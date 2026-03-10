const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BMW_DIR = path.join(__dirname, '../../photo/컴피ui_BMW공모');
const PHOTO_DIR = path.join(__dirname, '../../photo');
const OUTPUT_DIR = path.join(__dirname, '../public/portfolio');

// Target 16:10 aspect ratio for standard thumbnails, but for stitched we just keep width and append height
const TARGET_WIDTH = 1280;
const THUMB_HEIGHT = 800;

async function processBMW() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const subDirs = ['01_캐릭터선정', '02_로라', '03_영상이미지정리', '04_자동차정리'];

    for (let i = 0; i < subDirs.length; i++) {
        const dirName = subDirs[i];
        const dirPath = path.join(BMW_DIR, dirName);
        if (!fs.existsSync(dirPath)) continue;

        const files = fs.readdirSync(dirPath)
            .filter(f => f.match(/\.(png|jpg|jpeg|webp)$/i))
            .sort(); // naive sort

        if (files.length === 0) continue;

        console.log(`Stitching directory: ${dirName} with ${files.length} images...`);

        // First read all images and resize width to match
        const imageBuffers = [];
        let totalHeight = 0;

        for (const file of files) {
            const buf = await sharp(path.join(dirPath, file))
                .resize({ width: TARGET_WIDTH })
                .toBuffer();

            const metadata = await sharp(buf).metadata();
            imageBuffers.push({ input: buf, top: totalHeight, left: 0 });
            totalHeight += metadata.height;
        }

        // Create a blank canvas of total height and composite
        const finalName = `bmw_stitched_0${i + 1}_${dirName.replace(/[^x0-9a-zA-Z가-힣]/g, '')}.jpg`;
        const outputPath = path.join(OUTPUT_DIR, finalName);

        await sharp({
            create: {
                width: TARGET_WIDTH,
                height: totalHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 1 }
            }
        })
            .composite(imageBuffers)
            .jpeg({ quality: 85 })
            .toFile(outputPath);

        console.log(`  Done: ${finalName}`);
    }

    // copy mp4
    const mp4Src = path.join(BMW_DIR, 'BMW공모.mp4');
    const mp4Dest = path.join(OUTPUT_DIR, 'bmw_contest.mp4');
    if (fs.existsSync(mp4Src)) {
        fs.copyFileSync(mp4Src, mp4Dest);
        console.log(`Copied: BMW공모.mp4 to bmw_contest.mp4`);
    }
}

async function processDrawingsAndBanners() {
    const files = fs.readdirSync(PHOTO_DIR);

    for (const file of files) {
        if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue;

        if (file.includes('ui_03_드로잉') || file.includes('web_99_banner')) {
            const inputPath = path.join(PHOTO_DIR, file);
            let safeName = file.replace(/[^a-zA-Z0-9.\-_]/g, '');
            let prefix = file.includes('드로잉') ? 'drawing_' : 'banner_';
            const finalName = `${prefix}${path.parse(file).name.replace(/[^a-zA-Z0-9]/g, '')}.webp`;
            const outputPath = path.join(OUTPUT_DIR, finalName);

            console.log(`Converting: ${file} -> ${finalName}`);

            // Just optimize to WebP, keep native aspect ratio for lightbox, maybe just resize width to max 1920
            await sharp(inputPath)
                .resize({ width: 1920, withoutEnlargement: true })
                .webp({ quality: 85 })
                .toFile(outputPath);

            console.log(`  Done: ${finalName}`);
        }
    }
}

async function main() {
    await processBMW();
    await processDrawingsAndBanners();
}

main().then(() => console.log('All extra assets processed successfully!'));
