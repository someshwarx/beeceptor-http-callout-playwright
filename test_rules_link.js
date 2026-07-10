const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const endpointName = 'someshwar-demo';
    await page.goto(`https://app.beeceptor.com/console/${endpointName}`);
    await page.waitForTimeout(3000);
    
    // Dump all links text to find the "Rules" link
    const links = await page.$$eval('a', els => els.map(e => ({ text: e.textContent.trim(), href: e.href })));
    console.log('Dashboard Links:', links.filter(l => l.text.toLowerCase().includes('rule')));
    
    // Dump all buttons just in case
    const buttons = await page.$$eval('button', els => els.map(e => e.textContent.trim()));
    console.log('Dashboard Buttons:', buttons.filter(b => b.toLowerCase().includes('rule')));
    
    await browser.close();
})();
