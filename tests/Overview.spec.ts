import { test, expect } from '@playwright/test'
import { Productpage } from '../Pages/Productpage'
import { baseurl, USERNAME, PASSWORD } from '../Utils/EnviormentConfig';
import { Loginpage } from '../Pages/Loginpage';
import { CartPage } from '../Pages/CartPage';
import { OverviewPage } from '../Pages/OverviewPage';
import { CheckOutPage } from '../Pages/CheckOutPage';
import { checkoutData } from '../TestData/CheckoutData'

test.describe('Overview page validations', () => {

    let loginobj: Loginpage;
    let prodobj: Productpage;
    let cartpgobj: CartPage;
    let checkoutobj: CheckOutPage;
    let overviewobj: OverviewPage;

    test.beforeEach(async ({ page }) => {

        loginobj = new Loginpage(page);
        prodobj = new Productpage(page);
        cartpgobj = new CartPage(page);
        checkoutobj = new CheckOutPage(page);
        overviewobj = new OverviewPage(page);

        await page.goto(baseurl);
        await loginobj.login(USERNAME, PASSWORD);
        await prodobj.addfirstproduct();
        await prodobj.clickOnCartLink();
        await cartpgobj.clickonchekoutProduct();
        await checkoutobj.setcheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutobj.continueShopping();

    })

    test('Check Overview UI and URL validation', async ({ page }) => {

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        const elements = await overviewobj.getOverviewPageElements();
        await expect(elements.title).toBeVisible();
        await expect(elements.cancelButton).toBeVisible();
        await expect(elements.finishButton).toBeVisible();

    })

    test('validate all checkout products', async ({ page }) => {

        const product = await prodobj.getAllProductDetails();
        const overviewProducts = await overviewobj.getAllOverviewProducts();
        expect(overviewProducts).toEqual(product);

    })

    test('validate cancel button functionality', async ({ page }) => {
        await overviewobj.clickCancle();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    })

    test('validate Finish functionality', async ({ page }) => {

        await overviewobj.clickfinis();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    })

    test('validate total price', async({page})=>{

       const price = await overviewobj.getTotalPrice();
        const tax = await overviewobj.getTax();
       
        console.log("total price and tax are respectively" + price , tax);

      const total:number = price +tax;
      expect(total).toBeCloseTo(await overviewobj.getTotal(), 2);


    })

})
