const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const endpointName = 'someshwar-demo';
    await page.goto(`https://app.beeceptor.com/console/${endpointName}`);
    await page.waitForTimeout(3000);
    
    // Click New Callout Rule
    await page.click('text="New Callout Rule"');
    await page.waitForTimeout(2000);
    
    // Dump all inputs, textareas, and selects
    const inputs = await page.$$eval('input, textarea, select', els => els.map(el => ({
        placeholder: el.getAttribute('placeholder'),
        name: el.getAttribute('name'),
        id: el.getAttribute('id'),
        class: el.getAttribute('class'),
        type: el.tagName.toLowerCase() === 'input' ? el.getAttribute('type') : el.tagName.toLowerCase()
    })));
    console.log('Form Inputs:', JSON.stringify(inputs, null, 2));

    const buttons = await page.$$eval('button', els => els.map(el => el.textContent.trim()));
    console.log('Buttons:', buttons);
    
    await browser.close();
})();
