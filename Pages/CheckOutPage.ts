import { checkoutPageLocators } from "../Locators/CheckoutPageLocators";
import { Page} from "@playwright/test";


export class CheckOutPage
{
    constructor(private page : Page)
    {

    }

    async getcheckoutPageElements()
    {        
        return {

            pageinfo : await this.page.locator (checkoutPageLocators.pageinfo),
            cancelbtn : await this.page.locator (checkoutPageLocators.cancelbutton),
            continuebtn : await this.page.locator (checkoutPageLocators.ContinueButton)
        }

    }

    async setcheckoutDetails(firstname:string, lastname:string, zipcode:string)
    {
        await this.page.locator(checkoutPageLocators.fisrtName).fill(firstname);
        console.log("firstname is entered");

        await this.page.locator(checkoutPageLocators.Lastname).fill(lastname);
        console.log("lastname is entered");

        await this.page.locator(checkoutPageLocators.zippostalcode).fill(zipcode);
        console.log("zipcode is entered");

    }
    
    async cancleChekcout()
    {

        await this.page.locator(checkoutPageLocators.cancelbutton).click();
        
    }

    async continueShopping()
    {
        await this.page.locator(checkoutPageLocators.ContinueButton).click();       

    }

    async getError()
    {

        return await this.page.locator(checkoutPageLocators.error).textContent();
        
    }

    


}
