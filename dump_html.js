const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const endpointName = 'someshwar-demo';
    
    // Go to dashboard
    await page.goto(`https://app.beeceptor.com/console/${endpointName}`);
    await page.waitForTimeout(3000);
    
    // Click Mock Rules tab
    try {
        await page.click('text="Mock Rules"');
        await page.waitForTimeout(2000);
    } catch(e) {}
    
    // Click New Rule dropdown or button
    try {
        await page.click('button:has-text("New Rule"), button:has-text("Mock Rule")');
        await page.waitForTimeout(1000);
    } catch(e) {}
    
    // Click New Callout Rule
    try {
        await page.click('text="New Callout Rule"');
        await page.waitForTimeout(2000);
    } catch(e) {}
    
    // Dump HTML
    const html = await page.content();
    fs.writeFileSync('page_dump.html', html);
    
    await browser.close();
})();
