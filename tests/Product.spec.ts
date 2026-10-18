import { test, expect } from '@playwright/test'
import { Productpage } from '../Pages/Productpage'
import { baseurl, USERNAME, PASSWORD } from '../Utils/EnviormentConfig';
import { Loginpage } from '../Pages/Loginpage';
import { Productpagelocator } from '../Locators/ProductpageLocators';
import { LoginLocators } from '../Locators/LoginLocators';
import { productList } from '../TestData/CustomProductList';

test.describe("Product page validation", () => {

    let loginobj: Loginpage;
    let prodobj: Productpage;

    // befor running the each function we required login functionality
    test.beforeEach(async ({ page }) => 
        {
         loginobj = new Loginpage(page);
         prodobj = new Productpage(page);

        await page.goto(baseurl);
       await loginobj.login(USERNAME, PASSWORD);
       await page.waitForTimeout(3000);

    })

    test('validate the about functioanlity', async ({ page }) => {

       await prodobj.clickToAbout();
       await expect(page.locator(Productpagelocator.Loginbtn)).toBeVisible();
    })

    test('validate the logout functioanlity', async ({ page }) => {

       await prodobj.clickToLogout();
       await expect(page.locator(LoginLocators.loginbutton)).toBeVisible();


    })
    test('check all products', async ({ page }) => {

       await prodobj.validateAllProducts();
       
    })

    test('Add all the products in cart and validate', async({page})=>{

      await prodobj.addToCartaAllProduct();

      //await expect(await page.locator(Productpagelocator.shoppingicon).innerText()).toBe(6);

   
   })
   
    test('Add specific products in cart and validate', async({page})=>{

      await prodobj.addSpecificProductsInCart(productList);        
      
   })


     test('check filters highto low price', async({page})=>{

      await prodobj.filterPriceHightoLow();       
      const prices = await prodobj.getProductPrice();
      console.log("prices are : "+ prices);

      const priceaftersort = [...prices].sort((a,b)=> b-a); //high to low or descending use b-a
      console.log("Prices after sort : "+ priceaftersort);
      expect(prices).toEqual(priceaftersort);
      
   })

     test('check filters low to high price', async({page})=>{
      
      await prodobj.filterPriceLowtoHigh();
      const prices = await prodobj.getProductPrice();
      console.log("prices are : "+ prices);

      const priceaftersort = [...prices].sort((a,b)=> a-b); //low to ghigh or ascending  use a-b
      console.log("Prices after sort : "+ priceaftersort);
      expect(prices).toEqual(priceaftersort);

   })





})