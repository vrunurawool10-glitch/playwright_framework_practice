import { test, expect } from '@playwright/test'
import { Productpage } from '../Pages/Productpage'
import { baseurl, USERNAME, PASSWORD } from '../Utils/EnviormentConfig';
import { Loginpage } from '../Pages/Loginpage';
import { CartPage } from '../Pages/CartPage';
import { CheckOutPage } from '../Pages/CheckOutPage';
import { checkoutData } from '../TestData/CheckoutData'


test.describe("Cart page validation", () => {

    let loginobj: Loginpage;
    let prodobj: Productpage;
    let cartpgobj: CartPage;
    let checkoutobj: CheckOutPage;

    // befor running the each function we required login functionality
        test.beforeEach(async ({ page }) => {
        loginobj = new Loginpage(page);
        prodobj = new Productpage(page);
        cartpgobj = new CartPage(page);
        checkoutobj = new CheckOutPage(page);

        await page.goto(baseurl);
        await loginobj.login(USERNAME, PASSWORD);
        await page.waitForTimeout(3000);
        await prodobj.addfirstproduct();
        await prodobj.clickOnCartLink();
        await cartpgobj.clickonchekoutProduct();

    })

    test('Validate checkout page UI and URL', async ({ page }) => {

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        const pageElements = await checkoutobj.getcheckoutPageElements();
        await expect(pageElements.pageinfo).toBeVisible();
        await expect(pageElements.cancelbtn).toBeVisible();
        await expect(pageElements.continuebtn).toBeVisible();
    })

    test('Validate cancle button', async ({ page }) => {

        await checkoutobj.cancleChekcout();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    })


    test('Validate continue button', async ({ page }) => {

        await checkoutobj.setcheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutobj.continueShopping();

    })

    test('validation of empty fields',async({page})=>{

       await checkoutobj.continueShopping();
      const error = await  checkoutobj.getError();
      console.log(error?.trim());

      expect(error?.trim()).toEqual('Error: First Name is required');

    })

})