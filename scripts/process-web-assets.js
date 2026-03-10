const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PHOTO_DIR = path.join(__dirname, '../../photo');
const OUTPUT_DIR = path.join(__dirname, '../public/portfolio');

const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 800; // 16:10

async function processWebAssets() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const files = fs.readdirSync(PHOTO_DIR);

    for (const file of files) {
        if (!file.match(/^web_0[1-6].*\.(png|jpg|jpeg|webp)$/i)) continue;

        const inputPath = path.join(PHOTO_DIR, file);
        const fileName = path.parse(file).name;
        // make name english-friendly based on prefix
        // web_01_뷰저블 -> beusable
        // web_02_빅데이터웨이브 -> bigdata
        // web_03_신구대, web_04_신구대 -> shingu
        // web_05_세종대 -> sejong
        // web_06_중앙대 -> cau

        let prefix = "web";
        if (fileName.includes("01_뷰저블")) prefix = "beusable";
        if (fileName.includes("02_빅데이터")) prefix = "bigdata";
        if (fileName.includes("신구대")) prefix = "shingu";
        if (fileName.includes("인하대")) prefix = "inha";
        if (fileName.includes("세종대")) prefix = "sejong";
        if (fileName.includes("중앙대")) prefix = "cau";

        let suffix = fileName.includes("메인") ? "main" : "sub";
        // differentiate web_03 and web_04
        if (fileName.includes("web_03")) prefix += "_v1";
        if (fileName.includes("web_04")) prefix += "_v2";

        const finalName = `${prefix}_${suffix}.webp`;
        const outputPath = path.join(OUTPUT_DIR, finalName);

        console.log(`Converting: ${file} -> ${finalName}`);

        await sharp(inputPath)
            .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'top' }) // crop from top for better representation
            .webp({ quality: 85 })
            .toFile(outputPath);

        console.log(`  Done: ${finalName}`);
    }
}

processWebAssets().then(() => console.log('Web assets processed successfully!'));
