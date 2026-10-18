import { test, expect } from '@playwright/test'
import { Productpage } from '../Pages/Productpage'
import { baseurl, USERNAME, PASSWORD } from '../Utils/EnviormentConfig';
import { Loginpage } from '../Pages/Loginpage';
import { CartPage } from '../Pages/CartPage';

test.describe("Cart page validation", () => {

    let loginobj: Loginpage;
    let prodobj: Productpage;
    let cartpgobj : CartPage;

    // befor running the each function we required login functionality
    test.beforeEach(async ({ page }) => 
        {
         loginobj = new Loginpage(page);
         prodobj = new Productpage(page);
         cartpgobj = new CartPage(page);

        await page.goto(baseurl);
       await loginobj.login(USERNAME, PASSWORD);
       await page.waitForTimeout(3000);

    })

    test('Validate cart page URL and UI Elements', async({page})=>
        { 
           await prodobj.addfirstproduct();    
            await prodobj.clickOnCartLink(); 

          await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

           const UIElement= await cartpgobj.GetCartPageElement();

          await expect(UIElement.carttitile).toBeVisible();
           await expect(UIElement.Continuebtn).toBeVisible();
          await expect(UIElement.checkout).toBeVisible();

    })

      test('Validate continue shoping functionality', async({page})=>
        {        
            await prodobj.addfirstproduct();    
            await prodobj.clickOnCartLink(); 

            await cartpgobj.clickonContinueShoppingButton();

            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    })


      test('Validate first product added to the cart page', async({page})=>
    {        
            const products = await prodobj.getAllProductDetails();
            const firstProduct = products[0];

            await prodobj.addfirstproduct();
            await prodobj.clickOnCartLink();

            const cartProducts = await cartpgobj.getCartProducts();
            await expect(cartProducts).toHaveLength(1);
            expect(cartProducts[0]).toEqual(firstProduct);
    })

      test('Validate all products added to the cart page', async({page})=>
        {
            const allProducts = await prodobj.getAllProductDetails();

            await prodobj.addToCartaAllProduct();
            await prodobj.clickOnCartLink();

            const cartProducts = await cartpgobj.getCartProducts();
            await expect(cartProducts).toHaveLength(allProducts.length);
            expect(cartProducts).toEqual(allProducts);
    })

     test('Validate remove product functionality', async({page})=>
        {
            await prodobj.addfirstproduct();
            await prodobj.clickOnCartLink();

            await cartpgobj.removeProduct();

            const cartProducts = await cartpgobj.getCartProducts();
            await expect(cartProducts).toHaveLength(0);
            await expect(page.locator('div.inventory_item_name')).toHaveCount(0);
    })



})