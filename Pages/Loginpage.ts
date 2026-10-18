import { LoginLocators } from "../Locators/LoginLocators";
import { Page } from "@playwright/test";

export class Loginpage
{

    constructor(private page : Page)
    {
       
    }

    async login(username:string, password:string)
    {
       
        await this.page.fill(LoginLocators.username ,username );
        await this.page.fill(LoginLocators.passwrod ,password );
        await this.page.locator(LoginLocators.loginbutton).click();
        
    }

}


