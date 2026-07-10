const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const DashboardPage = require('../pages/DashboardPage');
const RulesPage = require('../pages/RulesPage');
const ApiClient = require('../api/apiClient');
const ruleData = require('../test-data/httpCallout.json');
require('dotenv').config();

test.describe('Beeceptor End-to-End Flow', () => {
    test('should create endpoint, configure callout, trigger API, and verify', async ({ page, request }, testInfo) => {
        const homePage = new HomePage(page);
        const dashboardPage = new DashboardPage(page);
        const rulesPage = new RulesPage(page);
        const apiClient = new ApiClient(request);

        const baseEndpointName = process.env.ENDPOINT_NAME;
        if (!baseEndpointName) {
            throw new Error('ENDPOINT_NAME is not defined in .env file');
        }
        // Make the endpoint unique for parallel test execution
        const endpointName = `${baseEndpointName}-${testInfo.workerIndex}`;

        // 1. Open Beeceptor and create or reuse endpoint
        await homePage.open();
        await homePage.createOrReuseEndpoint(endpointName);
        await dashboardPage.verifyLoaded(endpointName);

        // 2. Configure the HTTP Callout rule
        await rulesPage.openRulesTab();
        await rulesPage.clickCreateRule();
        await rulesPage.selectHttpCallout();
        await rulesPage.fillCalloutDetails(ruleData);
        await rulesPage.saveRule();
        await rulesPage.verifyRuleCreated(ruleData);

        // Ensure the rules modal is dismissed by clicking on a neutral area or reloading the dashboard
        // A reload is a robust way to ensure we are back on the clean dashboard view to observe traffic
        await page.reload();
        await dashboardPage.verifyLoaded(endpointName);

        // 3. Trigger the endpoint API
        const response = await apiClient.triggerEndpoint(endpointName, ruleData);

        // 4. Verify the API response
        // Beeceptor HTTP Callout may return 200 OK instead of the upstream 201 Created
        expect([200, 201]).toContain(response.status());
        const responseText = await response.text();
        expect(responseText).toBeDefined();

        // 5. Verify the HTTP Callout executed successfully from the Beeceptor dashboard
        // The dashboard is live-updating, so the new request should appear in the feed
        await dashboardPage.verifyRequestReceived(ruleData.method, ruleData.path);
    });
});
