var webdriver = require("selenium-webdriver"),
By = webdriver.By,
Builder = webdriver.Builder;

async function findClosestResort() {
   // konfiguracja drivera
   var chromeCapabilities = webdriver.Capabilities.chrome();
   var chromeOptions = {
           'detach': "true"
   };
   chromeCapabilities.set('chromeOptions', chromeOptions);
   let driver = await new Builder().withCapabilities(chromeCapabilities).forBrowser("chrome").build();

   // logowanie
   await driver.get("http://localhost:8081/login");
   await driver.findElement(By.name("username")).sendKeys("admin");
   await driver.findElement(By.name("password")).sendKeys("admin1!");
   await driver.findElement(By.className("ui small button")).click();
   await driver.sleep(1000);

   // wybranie zakładki aktualności
   await driver.findElement(By.id("nav-news")).click();
   await driver.sleep(1000);

   // wybranie wyjazdu do Kamiskotia Ski Resort
   await driver.findElement(By.id("140")).click();
   await driver.sleep(1000);

   // wybranie funkcji dołączenia do wyjazdu
   await driver.findElement(By.id("join")).click();
   await driver.sleep(1000);

   // wybranie zakładki profilu użytkownika
   await driver.findElement(By.id("nav-user")).click();
   await driver.sleep(10000);

   // wybranie zakładki aktualności
   await driver.findElement(By.id("nav-news")).click();
   await driver.sleep(1000);

   // wybranie wyjazdu do Kamiskotia Ski Resort
   await driver.findElement(By.id("140")).click();
   await driver.sleep(1000);

   // wybranie funkcji dołączenia do wyjazdu
   await driver.findElement(By.id("quit")).click();
   await driver.sleep(1000);

   // wybranie zakładki profilu użytkownika
   await driver.findElement(By.id("nav-user")).click();
   await driver.sleep(10000);
}

findClosestResort();