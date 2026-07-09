const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(__dirname, '../public/portfolio');

async function clearOverlays(page) {
    console.log("Checking for overlays to clear...");
    const clicked = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, div, span, a, p'));
        let skipClicked = false;
        let browseClicked = false;
        
        const skipButton = elements.find(el => el.textContent.trim() === '건너뛰기');
        if (skipButton) {
            skipButton.click();
            skipClicked = true;
        }
        
        const browseButton = elements.find(el => el.textContent.trim() === '그냥 둘러볼게요');
        if (browseButton) {
            browseButton.click();
            browseClicked = true;
        }
        
        return { skipClicked, browseClicked };
    });
    console.log(`Overlays clicked:`, clicked);
    if (clicked.skipClicked || clicked.browseClicked) {
        console.log("Waiting 3 seconds for transition...");
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}

async function captureMenus() {
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
        
        // Use mobile viewport as the primary target
        await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });

        console.log("Navigating to https://jubup.com/ ...");
        await page.goto('https://jubup.com/', { waitUntil: 'networkidle2' });
        
        console.log("Waiting 11 seconds for splash to finish...");
        await new Promise(resolve => setTimeout(resolve, 11000));
        
        // Clear overlays on the home page (both onboarding and login modal)
        await clearOverlays(page);
        await clearOverlays(page); // run twice just in case they appear sequentially

        const routes = [
            { name: 'map', url: 'https://jubup.com/' },
            { name: 'cleanup', url: 'https://jubup.com/cleanup' },
            { name: 'shop', url: 'https://jubup.com/shop' },
            { name: 'jubtube', url: 'https://jubup.com/jubtube' }
        ];

        for (const route of routes) {
            console.log(`Navigating to ${route.url} ...`);
            if (route.name !== 'map') {
                await page.goto(route.url, { waitUntil: 'networkidle2' });
            }
            
            // Clear overlays again in case they pop up on different pages
            await clearOverlays(page);
            
            console.log(`Waiting 5 seconds for ${route.name} page to render...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // Double check overlays after loading
            await clearOverlays(page);
            
            // Capture mobile screenshot
            const mobilePath = path.join(OUTPUT_DIR, `jubup_${route.name}_mobile.png`);
            console.log(`Taking mobile screenshot -> ${mobilePath}`);
            await page.screenshot({ path: mobilePath });
            
            // Capture desktop screenshot for map
            if (route.name === 'map') {
                await page.setViewport({ width: 1920, height: 1080 });
                await new Promise(resolve => setTimeout(resolve, 2000));
                await clearOverlays(page);
                const desktopPath = path.join(OUTPUT_DIR, `jubup_${route.name}_desktop.png`);
                console.log(`Taking desktop screenshot -> ${desktopPath}`);
                await page.screenshot({ path: desktopPath });
                
                // Reset to mobile
                await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
        
        console.log("All menu screenshots captured successfully!");
    } catch (error) {
        console.error("Error during screenshot capture:", error);
    } finally {
        await browser.close();
        console.log("Browser closed.");
    }
}

captureMenus();
