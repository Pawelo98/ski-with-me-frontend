const { Builder, By, Key, until} = require("selenium-webdriver");

async function testLogin() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:8081/login");
    await driver.findElement(By.name("username")).sendKeys("admin");
    await driver.findElement(By.name("password")).sendKeys("admin1!");
    await driver.findElement(By.className("ui small button")).click();
    driver.wait(until.titleIs('ReactApp'), 3000);
}

testLogin();