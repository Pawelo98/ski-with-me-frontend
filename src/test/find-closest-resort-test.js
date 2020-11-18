 var webdriver = require("selenium-webdriver"),
 By = webdriver.By,
 Builder = webdriver.Builder;

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
    await driver.findElement(By.id("nav-resort")).click();
    await driver.sleep(1000);

    // wybranie odpowiedniego sortowania z listy
    await driver.findElement(By.name("sorting")).click();
    await driver.findElement(By.id("3")).click();
    await driver.sleep(5000);

    // wybranie najbliższego ośrodka
    await driver.findElement(By.className("ui small button")).click();
    await driver.sleep(5000);
}

findClosestResort();