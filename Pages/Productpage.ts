import { Productpagelocator } from "../Locators/ProductpageLocators";
import { Locator, Page } from "@playwright/test";


export class Productpage {
    constructor(private page: Page) {
        this.page;
    }

    async clickToAbout() {
        await this.page.click(Productpagelocator.settingbutton);
        await this.page.click(Productpagelocator.aboutbutton);
    }

    async clickToLogout() {
        await this.page.click(Productpagelocator.settingbutton);
        await this.page.click(Productpagelocator.logoutbutton);

    }

    async validateAllProducts() {
        const prodname: string[] = await this.page.locator(Productpagelocator.productName).allTextContents();
        const proddesc: string[] = await this.page.locator(Productpagelocator.productdescription).allTextContents();
        const prodprice: string[] = await this.page.locator(Productpagelocator.productprice).allTextContents();
        const buttoncount: number = await this.page.locator(Productpagelocator.addtocartbtn).count();
        console.log(buttoncount, prodname.length, proddesc.length, prodprice.length);
        console.log(prodname);

        if (prodname.length === 0)
            throw new Error("no products found");

        if (prodname.length != proddesc.length || prodname.length != prodprice.length || prodname.length != buttoncount) {

            throw new Error("produts are mismatched");

        }
        else {
            console.log("product are matched");
        }

    }


    async addToCartaAllProduct() {
        const btn = this.page.locator(Productpagelocator.addtocartbtn);

        while (await btn.count() > 0) {
            await btn.first().click();
            console.log("add to cart is clicked");
            await this.page.waitForTimeout(500);
        }
    }

    async addSpecificProductsInCart(CustomProducts: string[]) {
        const nameofProduct = this.page.locator(Productpagelocator.productName);
        const count = await nameofProduct.count();
        console.log("total products count is " + count);
        console.log("1st producut name is " + await nameofProduct.nth(0).innerText());
        console.log("custome product list is " + CustomProducts);

        for (let i = 0; i < count; i++) {
            const name = await nameofProduct.nth(i).innerText();
            console.log(name);

            if (CustomProducts.includes(name)) {
                await this.page.locator(Productpagelocator.addtocartbtn).nth(i).click();
                console.log("inside loop");
                await this.page.waitForTimeout(3000);

            }
        }
    }

    async filterPriceHightoLow() {
        await this.page.locator(Productpagelocator.filter).selectOption({ value: 'hilo' })
        // await this.page.locator(Productpagelocator.PriceHightoLow).isVisible();

        const allprices = await this.page.locator(Productpagelocator.productprice).allInnerTexts();
        console.log(allprices);

    }

    async filterPriceLowtoHigh() {
        await this.page.locator(Productpagelocator.filter).selectOption({ value: 'lohi' })
        // await this.page.locator(Productpagelocator.PriceHightoLow).isVisible();

        const allprices = await this.page.locator(Productpagelocator.productprice).allInnerTexts();
        console.log(allprices);

    }

    async getProductname() {
        return await this.page.locator(Productpagelocator.productName).allTextContents();
    }


    async getProductPrice() {

        const price = await this.page.locator(Productpagelocator.productprice).allTextContents();

        return price.map(data => parseFloat(data.replace('$', '')));

    }

    async clickOnCartLink() {
        await this.page.locator(Productpagelocator.cartIcon).click();
    }

    async getFisrtProductDetails() {
        const name = await this.page.locator(Productpagelocator.productName).first().textContent();
        const description = await this.page.locator(Productpagelocator.productdescription).first().textContent();

        const price = await this.page.locator(Productpagelocator.productprice).first().textContent();

        return {

            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        }


    }

    async getAllProductDetails() {

        const Allname = await this.page.locator(Productpagelocator.productName).allTextContents();
        const Alldescription = await this.page.locator(Productpagelocator.productdescription).allTextContents();
        const Allprice = await this.page.locator(Productpagelocator.productprice).allTextContents();


        // we are sending more than 1 object.
        //array of object [{name, des, price },{},{}]
      const allProd = Allname.map((_,i)=>({
        
        prodname : Allname[i].trim(),
        prodDecscription : Alldescription[i].trim(),
        prodprice: Allprice[i].trim()

      }))
      return allProd;

    }
    async getSpesificProductDetails() {

    }

    async addfirstproduct()
    {
        await this.page.locator(Productpagelocator.addtocartbtn).nth(0).click();
        console.log('1st product added');
    }


}