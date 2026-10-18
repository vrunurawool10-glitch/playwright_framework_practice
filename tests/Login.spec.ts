import {test, expect} from '@playwright/test';
import { Loginpage } from '../Pages/Loginpage';
import { baseurl, USERNAME, PASSWORD } from '../Utils/EnviormentConfig';


test('Login page test' , async({page})=>
{

    const loginpageob= new Loginpage(page);
    await page.goto(baseurl);

    loginpageob.login(USERNAME,PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

})