const { generateText, checkAndGenerate } = require("./util")
const puppeteer = require("puppeteer")

//unit test
test('should output name and age', async () => {
    const browser = await puppeteer.launch()
    const text = generateText("Bea", 30)
    expect(text).toBe("Bea (30 years old)")
    await browser.close()
}
)

//intergration test
test('should click around a valid text valid', async () => {
    const browser = await puppeteer.launch()
    const text = generateText("Bea", 30)
    expect(text).toBe("Bea (30 years old)")
    await browser.close()
}
)

//end to end test
test("should click around", async () => {
    const browser = await puppeteer.launch({
        headless: false
        // headless: false,
        // slowMo: 80,
        // args:['--window-size=1920,1080']
    })

    const page = await browser.newPage()
    await page.goto('file:///Users/wemogymac/Documents/bea/test/js-testing-introduction-starting-setup/index.html')
   
    await page.click('input#name')
    await page.type('input#name', 'Bea')
    await page.click('input#age')
    await page.type('input#age', '32')
    await page.click('#btnAddUser')

    //this evaluate to add more contact name and age 
     const finalText = await page.$eval('.user-item', el => el.textContent);    
    expect(finalText).toBe('Bea (32 years old)')
   // await browser.close()
}, 100000)