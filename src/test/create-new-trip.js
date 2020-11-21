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

   // wybranie formularza tworzenia wyjazdu
   await driver.findElement(By.id("nav-new-trip")).click();
   await driver.sleep(5000);

   // wybranie odpowiednich parametrów wyjazdu
   // wybranie ośrodka Czarna Góra
   await driver.findElement(By.id("mui-component-select-chosenResortId")).click();
   await driver.findElement(By.id("1535")).click();

   // wybranie długości wyjazdu - 2 dni
   await driver.findElement(By.name("duration")).sendKeys("2");

   // wybranie daty i godziny wyjazdu - 2020-11-21 06:45
   await driver.findElement(By.name("dateTime")).sendKeys("2020-11-21 06:45");
   await driver.sleep(2000);

   // wybranie opisu wyjazdu - Weekendowy wyjazd w polskie góry
//    await driver.findElement(By.name("description")).clear();
//    await driver.findElement(By.name("description")).sendKeys("Weekendowy wyjazd w polskie góry");
//    await driver.sleep(3000);

   // zatwierdzenie stworzenia wyjazdu
   await driver.findElement(By.className("ui small button")).click();
   await driver.sleep(5000);
}

findClosestResort();