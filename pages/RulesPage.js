const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class RulesPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async openRulesTab() {
        const mockRulesTab = this.page.locator(':is(a, button):has-text("Mock Rules")').first();
        await mockRulesTab.dispatchEvent('click').catch(() => {});
        
        // Wait for the Rules modal to become visible
        await this.page.waitForTimeout(1000);
    }

    async clickCreateRule() {
        const dropdownToggle = this.page.locator('.btn-group .dropdown-toggle').first();
        await dropdownToggle.waitFor({ state: 'attached' });
        await dropdownToggle.dispatchEvent('click');
        await this.page.waitForTimeout(500); // wait for dropdown animation
    }

    async selectHttpCallout() {
        const calloutOption = this.page.locator('.dropdown-item:has-text("Callout Rule")').first();
        await calloutOption.waitFor({ state: 'attached' });
        await calloutOption.dispatchEvent('click');
        await this.page.waitForTimeout(500); // wait for modal transition
    }

    async fillCalloutDetails(ruleData) {
        // Wait for modal to appear
        await this.page.waitForTimeout(1000); 

        // Fill Method if specified and not 'ANY'
        if (ruleData.method && ruleData.method !== 'ANY') {
            const methodSelect = this.page.locator('select').first(); 
            await methodSelect.selectOption(ruleData.method, { force: true });
        }

        // Fill Path
        const pathInput = this.page.locator('input[name="path"], input[placeholder*="/"], input[name="rulePath"]').first();
        await pathInput.fill(ruleData.path, { force: true });

        // Fill Target URL
        const urlInput = this.page.locator('input[type="url"], input[name="endpoint"], input[name="targetUrl"], input[placeholder*="http"]').first();
        await urlInput.fill(ruleData.targetUrl, { force: true });
    }

    async saveRule() {
        const saveBtn = this.page.locator('button:has-text("Save"), button:has-text("Create"), button:has-text("Add")').filter({ hasNotText: 'Create with AI' }).first();
        await saveBtn.dispatchEvent('click');
    }

    async verifyRuleCreated(ruleData) {
        // Verify the path is attached in the DOM
        await this.page.waitForTimeout(1000); // wait for save
        await expect(this.page.getByText(ruleData.path).first()).toBeAttached();
    }
}

module.exports = RulesPage;
