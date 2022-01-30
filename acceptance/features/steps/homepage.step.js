const { When, Then, Given } = require('cucumber');
const puppeteer = require('puppeteer');
const assert = require('assert');

Given("that User goes to Video Site Project's HomePage", async () => {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
})

When("page is loaded", async () => {
    await this.page.goto("http://localhost:8080")
    await this.page.waitForTimeout(2000)
})

Then("User can see some of videos' title like", async (titles) => {
    const titlesInPage = await this.page.$$eval('.videobox .title', tt => tt.map(t => t.textContent))

    assert.ok(titlesInPage, "pages does not includes any video")

    for (const [title] of titles.rawTable) {
        assert.equal(titlesInPage.includes(title), true, `"${title}" not found`)
    }

    await this.page.close()
    await this.browser.close()
})

Given("that User is on Video Site Project's HomePage", async () => {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
    await this.page.goto("http://localhost:8080")
    await this.page.waitForTimeout(2000)
})

When("User clicks {string} video", async (targetVideoTitle) => {
    const targetVideoBox = await (findTargetVideoByTitle.call(this, targetVideoTitle))

    assert.ok(targetVideoBox, `target video '${targetVideoTitle}' not found`)
    this.id = await targetVideoBox.$eval(".info", element => element.getAttribute("data-id"))
    console.log("THIS.ID", this.id)
    const link = await targetVideoBox.$("a")
    await link.click()
})

Then("User should see watch url correctly", async () => {
    const url = await this.page.url()

    assert.ok(url.includes(this.id))

    await this.page.close()
    await this.browser.close()
})

When("User hovers {string} video", async targetVideoTitle => {
    this.targetVideoBox = await (findTargetVideoByTitle.call(this, targetVideoTitle))
    assert.ok(this.targetVideoBox, `target video '${targetVideoTitle}' not found`)

    const coverImage = await this.targetVideoBox.$("img.cover")
    await coverImage.hover()
})

Then("User should see hovered image", async() => {
    const { src, hover } = await this.targetVideoBox
        .$eval('img.cover', imgElement => ({
            src: imgElement.src, 
            hover: imgElement.getAttribute("data-hover")
        }))
    
    assert.equal(src, hover)
    
    await this.page.close()
    await this.browser.close()
})

async function findTargetVideoByTitle(title) {
    const videoBoxes = await this.page.$$('.videobox')
    return await videoBoxes.find(async videoBox => {
        const title = await videoBox.$eval("p.title", titleElement => titleElement.textContent)
        return title === title
    })
}