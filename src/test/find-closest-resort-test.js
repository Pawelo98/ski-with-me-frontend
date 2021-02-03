 var webdriver = require("selenium-webdriver"),
 By = webdriver.By,
 Builder = webdriver.Builder;
 until = webdriver.until;

async function findClosestResort() {
    // konfiguracja drivera
    var chromeCapabilities = webdriver.Capabilities.chrome()
    var chromeOptions = {
            'detach': true
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    let driver = await new Builder().withCapabilities(chromeCapabilities).forBrowser("chrome").build();

    // logowanie
    await driver.get("http://localhost:8081/login");
    await driver.findElement(By.name("username")).sendKeys("admin");
    await driver.findElement(By.name("password")).sendKeys("admin1!");
    await driver.findElement(By.className("ui small button")).click();
    await driver.sleep(1000);

    // wybranie wyszukiwania ośrodków
    let query = await driver.wait(until.elementLocated(By.id("nav-resort")));
    query.click();

    // wybranie odpowiedniego sortowania z listy
    query = await driver.wait(until.elementLocated(By.name("sorting")));
    query.click();
    await driver.findElement(By.id("3")).click();

    // wybranie najbliższego ośrodka
    query = await driver.wait(until.elementLocated(By.className("ui small button")));
    query.click();
    await driver.sleep(5000);
}

findClosestResort();