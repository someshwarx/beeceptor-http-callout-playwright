const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const endpointName = 'someshwar-demo';
    await page.goto(`https://app.beeceptor.com/console/${endpointName}`);
    await page.waitForTimeout(3000);
    
    // Click Mock Rules if it's a tab, or just click New Callout Rule directly
    try {
        await page.click('a:has-text("New Callout Rule"), button:has-text("New Callout Rule")');
        console.log('Clicked New Callout Rule');
    } catch (e) {
        console.log('Could not find New Callout Rule, clicking Mock Rules first');
        await page.click('text="Mock Rules"');
        await page.waitForTimeout(1000);
        await page.click('a:has-text("New Callout Rule"), button:has-text("New Callout Rule")');
    }
    
    await page.waitForTimeout(3000);
    
    // Dump the form fields
    const inputs = await page.$$eval('input, textarea, select', els => els.map(el => ({
        placeholder: el.getAttribute('placeholder'),
        name: el.getAttribute('name'),
        id: el.getAttribute('id'),
        type: el.tagName.toLowerCase() === 'input' ? el.getAttribute('type') : el.tagName.toLowerCase()
    })));
    console.log('Form Inputs:', inputs);

    // Dump all buttons in the modal/page
    const buttons = await page.$$eval('button, input[type="submit"]', els => els.map(el => ({
        text: el.textContent.trim() || el.value,
        type: el.getAttribute('type'),
        id: el.getAttribute('id')
    })));
    console.log('Form Buttons:', buttons);
    
    await browser.close();
})();
