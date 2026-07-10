const { test } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const DashboardPage = require('../pages/DashboardPage');

test.describe('Beeceptor Endpoint Creation', () => {
    test('should create or reuse an endpoint and open the dashboard', async ({ page }, testInfo) => {
        const homePage = new HomePage(page);
        const dashboardPage = new DashboardPage(page);
        
        // Use endpoint name from environment variables
        const baseEndpointName = process.env.ENDPOINT_NAME;

        if (!baseEndpointName) {
            throw new Error('ENDPOINT_NAME is not defined in .env file');
        }
        // Make the endpoint unique for parallel test execution
        const endpointName = `${baseEndpointName}-${testInfo.workerIndex}`;

        // Open Beeceptor homepage
        await homePage.open();
        await homePage.verifyLoaded();

        // Create or reuse the endpoint
        await homePage.createOrReuseEndpoint(endpointName);

        // Verify the dashboard opened successfully
        await dashboardPage.verifyLoaded(endpointName);
        await dashboardPage.verifyEndpointNameDisplayed(endpointName);
    });
});
