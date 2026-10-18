import { AckpageLocators } from "../Locators/AckpageLocatos";
import { Page } from '@playwright/test';

export class AckPage {

    constructor(private page: Page) {
        this.page
    }

    async getAckElements() {
        return {
            acktitle: this.page.locator(AckpageLocators.ackpagetitle),
            backhomebtn: this.page.locator(AckpageLocators.backhomebtn),
            pdfbtn: this.page.locator(AckpageLocators.generatepdfbtn)
        }
    }

    async getSuccessMessge() {
        return this.page.locator(AckpageLocators.successmsg).textContent();

    }

    async clickOnBackHome() {
        await this.page.locator(AckpageLocators.backhomebtn).click();

    }

    async clickOnGenetatePDF() { await this.page.locator(AckpageLocators.generatepdfbtn).click(); }
}