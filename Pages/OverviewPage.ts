import { Overviewlocators } from "../Locators/OverviewPageLocator";
import { Page } from '@playwright/test';


export class OverviewPage {
    constructor(private page: Page) {
        this.page;
    }

    async getOverviewPageElements() {
        return {
            title: await this.page.locator(Overviewlocators.canclebtn),
            cancelButton: await this.page.locator(Overviewlocators.canclebtn),
            finishButton: await this.page.locator(Overviewlocators.canclebtn)
        }
    }

    async getAllOverviewProducts() {
        const Allname = await this.page.locator(Overviewlocators.productName).allTextContents();
        const Alldescription = await this.page.locator(Overviewlocators.productdescription).allTextContents();
        const Allprice = await this.page.locator(Overviewlocators.productprice).allTextContents();

        // we are sending more than 1 object.
        //array of object [{name, des, price },{},{}]
        const allProd = Allname.map((_, i) => ({

            prodname: Allname[i].trim(),
            prodDecscription: Alldescription[i].trim(),
            prodprice: Allprice[i].trim()

        }))
        return allProd;

    }

    async getTotalPrice(): Promise<number> {
        const price = await this.page.locator(Overviewlocators.itemTotal).textContent();
        if (price === null) {
            throw new Error('Item total text was not found');
        }

        return Number(price.replace('Item total: $', '').trim());
    }

    async getTax(): Promise<number> {
        const tax = await this.page.locator(Overviewlocators.tax).textContent();
        if (tax === null) {
            throw new Error('Tax text was not found');
        }

        return Number(tax.replace('Tax: $', '').trim());
    }

    async getTotal(): Promise<number> {
        const total = await this.page.locator(Overviewlocators.total).textContent();
        if (total === null) {
            throw new Error('Total text was not found');
        }

        return Number(total.replace('Total: $', '').trim());
    }

    async clickCancle() { await this.page.locator(Overviewlocators.canclebtn).click() }

    async clickfinis() { await this.page.locator(Overviewlocators.finishbtn).click() }

}