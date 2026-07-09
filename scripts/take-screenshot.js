const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(__dirname, '../public/portfolio');

async function captureScreenshots() {
    console.log("Launching headless Chrome...");
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--hide-scrollbars'
        ]
    });

    try {
        const page = await browser.newPage();
        
        console.log("Navigating to https://jubup.com/ ...");
        await page.goto('https://jubup.com/', { waitUntil: 'networkidle2' });
        
        console.log("Waiting 11 seconds for the splash screen to fade out...");
        await new Promise(resolve => setTimeout(resolve, 11000));
        
        // 1. Desktop Screenshot
        console.log("Setting desktop viewport (1920x1080)...");
        await page.setViewport({ width: 1920, height: 1080 });
        const desktopPath = path.join(OUTPUT_DIR, 'jubup_main.png');
        console.log(`Taking desktop screenshot -> ${desktopPath}`);
        await page.screenshot({ path: desktopPath });
        
        // 2. Mobile Screenshot
        console.log("Setting mobile viewport (375x812)...");
        await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
        console.log("Waiting 3 seconds for mobile view to load...");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const mobilePath = path.join(OUTPUT_DIR, 'jubup_sub.png');
        console.log(`Taking mobile screenshot -> ${mobilePath}`);
        await page.screenshot({ path: mobilePath });
        
        console.log("Screenshots captured successfully!");
    } catch (error) {
        console.error("Error during screenshot capture:", error);
    } finally {
        await browser.close();
        console.log("Browser closed.");
    }
}

captureScreenshots();
