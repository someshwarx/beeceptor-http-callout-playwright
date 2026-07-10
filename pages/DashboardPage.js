const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async verifyLoaded(endpointName) {
        // Wait for the URL to change to the endpoint dashboard
        await this.page.waitForURL(new RegExp(`/console/${endpointName}`));
        await expect(this.page).toHaveURL(new RegExp(`/console/${endpointName}`));
    }

    async verifyEndpointNameDisplayed(endpointName) {
        // The endpoint URL is displayed in the dashboard
        const endpointUrl = `https://${endpointName}.free.beeceptor.com`;
        
        // We use getByText to find any element containing the endpoint URL
        const endpointLink = this.page.getByText(endpointUrl, { exact: false }).first();
        
        await expect(endpointLink).toBeVisible();
    }

    async verifyRequestReceived(method, path) {
        // Beeceptor dashboard shows recent requests in a list/table
        // We can look for the path text to appear anywhere in the DOM.
        // It's a live dashboard, so the new request should pop up.
        await expect(this.page.getByText(path).first()).toBeVisible({ timeout: 10000 });
        
        // We could optionally also check the method badge, but just checking the path is a reliable start
    }
}

module.exports = DashboardPage;
