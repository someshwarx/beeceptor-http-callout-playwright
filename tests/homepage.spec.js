const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');

test.describe('Beeceptor Home Page', () => {
    test('should load successfully', async ({ page }) => {
        const homePage = new HomePage(page);
        
        await homePage.open();
        await homePage.verifyLoaded();
    });
});
