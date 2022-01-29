const {When, Then, Given} = require('cucumber');
const puppeteer = require('puppeteer');
const assert = require('assert');

Given("that User goes to Video Site Project's HomePage", async () => {
    this.browser = await puppeteer.launch({headless: true});
    this.page = await this.browser.newPage();
})

When("page is loaded", async () => {
    await this.page.goto("http://localhost:8080")
    await this.page.waitForTimeout(2000)
})

Then("User can see some of videos' title like", async (titles) => {
    const titlesInPage = await this.page.$$eval('.videobox .title', tt => tt.map (t => t.textContent)
    )
    assert.ok(titlesInPage, "pages does not includes any video")
    for (const [title] of titles.rawTable) {
        assert.equal(titlesInPage.includes(title), true, `"${title}" not found`)
    }

    await this.page.close()
    await this.browser.close()
})