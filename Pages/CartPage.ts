import { Page } from "@playwright/test";
import { CartLocators } from "../Locators/CartPageLocator";

export class CartPage {

    constructor(private page: Page) {
        this.page;

    }


    async clickonContinueShoppingButton() {

        await this.page.locator(CartLocators.continueShoppingbtn).click();
        await this.page.waitForURL('**/inventory.html');
    }

    async GetCartPageElement() {
        return {

            carttitile: this.page.locator(CartLocators.titlename),
            Continuebtn: this.page.locator(CartLocators.continueShoppingbtn),
            checkout: this.page.locator(CartLocators.chekcoutButton)
        }
    }

    async getCartProducts() {

        const Allname = await this.page.locator(CartLocators.productName).allTextContents();
        const Alldescription = await this.page.locator(CartLocators.productdescription).allTextContents();
        const Allprice = await this.page.locator(CartLocators.productprice).allTextContents();


        // we are sending more than 1 object.
        //array of object [{name, des, price },{},{}]
        const allcartProducts = Allname.map((_, i) => ({
            prodname: Allname[i].trim(),
            prodDecscription: Alldescription[i].trim(),
            prodprice: Allprice[i].trim()

        }))
        return allcartProducts;

    }

    async removeProduct()
    {await this.page.locator(CartLocators.removeButton).click();

    }

    async clickonchekoutProduct()
    {
        await this.page.locator(CartLocators.chekcoutButton).click();
    }

}