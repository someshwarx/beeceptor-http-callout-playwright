const { test } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const DashboardPage = require('../pages/DashboardPage');
const RulesPage = require('../pages/RulesPage');
const ruleData = require('../test-data/httpCallout.json');
require('dotenv').config();

test.describe('Beeceptor HTTP Callout Rule', () => {
    test('should create an HTTP Callout rule successfully', async ({ page }, testInfo) => {
        const homePage = new HomePage(page);
        const dashboardPage = new DashboardPage(page);
        const rulesPage = new RulesPage(page);
        
        const baseEndpointName = process.env.ENDPOINT_NAME;
        if (!baseEndpointName) {
            throw new Error('ENDPOINT_NAME is not defined in .env file');
        }
        // Make the endpoint unique for parallel test execution
        const endpointName = `${baseEndpointName}-${testInfo.workerIndex}`;

        // Open homepage and create/reuse endpoint
        await homePage.open();
        await homePage.createOrReuseEndpoint(endpointName);
        await dashboardPage.verifyLoaded(endpointName);

        // Navigate to Rules
        await rulesPage.openRulesTab();

        // Create HTTP Callout Rule
        await rulesPage.clickCreateRule();
        await rulesPage.selectHttpCallout();
        await rulesPage.fillCalloutDetails(ruleData);
        await rulesPage.saveRule();

        // Verify the rule exists
        await rulesPage.verifyRuleCreated(ruleData);
    });
});
