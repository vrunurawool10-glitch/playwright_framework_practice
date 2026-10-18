import { test, expect } from '@playwright/test'
import { Productpage } from '../../Pages/Productpage'
import { baseurl, USERNAME, PASSWORD } from '../../Utils/EnviormentConfig';
import { Loginpage } from '../../Pages/Loginpage';
import { CartPage } from '../../Pages/CartPage';
import { OverviewPage } from '../../Pages/OverviewPage';
import { CheckOutPage } from '../../Pages/CheckOutPage';
import { checkoutData } from '../../TestData/CheckoutData'
import { AckPage } from '../../Pages/AckPage';

test.describe('Acknowledge page validations', ()=>{

    let loginobj: Loginpage;
    let prodobj: Productpage;
    let cartpgobj: CartPage;
    let checkoutobj: CheckOutPage;
    let overviewobj: OverviewPage;
    let ackObj : AckPage;

    test.beforeEach(async({page})=>{
        loginobj = new Loginpage(page);
        prodobj = new Productpage(page);
        cartpgobj = new CartPage(page);
        checkoutobj = new CheckOutPage(page);
        overviewobj = new OverviewPage(page);
        ackObj = new AckPage(page);

        await page.goto(baseurl);
        await loginobj.login(USERNAME, PASSWORD);
        await prodobj.addfirstproduct();
        await prodobj.clickOnCartLink();
        await cartpgobj.clickonchekoutProduct();
        await checkoutobj.setcheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutobj.continueShopping();
        await overviewobj.clickfinis();
    })

    test('Validate all UI elements on ack page', async({page})=>{

       await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
const elements = await ackObj.getAckElements();
await  expect(elements.acktitle).toBeVisible();
await expect(elements.backhomebtn).toBeVisible();
await expect(elements.pdfbtn).toBeVisible();
    })

       test('validate success message', async({page})=>{
const successmsg = await ackObj.getSuccessMessge();
           expect(successmsg?.trim()).toEqual("Thank you for your order!")

    })

     test('validate success message duplicate', async({page})=>{
const successmsg = await ackObj.getSuccessMessge();
           expect(successmsg?.trim()).toEqual("Thank you for your order!")

    })

       test('check back home button functionality', async({page})=>{

        await ackObj.clickOnBackHome();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    /*
       test('check generate pdf button functionality', async({page})=>{
        
        await ackObj.clickOnGenetatePDF();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'));


    })*/


})