const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.url = 'https://beeceptor.com/';
        this.pageTitle = /Mock APIs/;
        this.heading = page.getByRole('heading', { name: /Mock Servers in Seconds/i });
        
        // Locators for creating endpoint
        this.endpointInput = page.getByPlaceholder('payments-api');
        this.createEndpointBtn = page.getByRole('button', { name: /Create Mock Server/i });
    }

    async open() {
        await this.navigate(this.url);
    }

    async verifyLoaded() {
        await expect(this.page).toHaveTitle(this.pageTitle);
        await expect(this.heading).toBeVisible();
    }

    async enterEndpointName(endpointName) {
        await this.endpointInput.fill(endpointName);
    }

    async clickCreateEndpoint() {
        await this.createEndpointBtn.click();
    }

    async createOrReuseEndpoint(endpointName) {
        await this.enterEndpointName(endpointName);
        await this.clickCreateEndpoint();
    }
}

module.exports = HomePage;