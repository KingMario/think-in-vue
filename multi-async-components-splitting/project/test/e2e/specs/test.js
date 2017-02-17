// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello')
      .assert.containsText('h1', 'Welcome to Your Vue.js App')
      .assert.elementCount('img', 1)
      .assert.elementCount('a[href*="#/"]', 4)
      .assert.cssClassPresent('a[href="#/"]', 'router-link-active')
      .click('a[href="#/a"]')
      .pause(1000)
      .assert.cssClassNotPresent('a[href="#/"]', 'router-link-active')
      .assert.cssClassPresent('a[href="#/a"]', 'router-link-active')
      .assert.containsText('#router-view', 'This is Component A.')
      .click('a[href="#/b"]')
      .pause(1000)
      .assert.cssClassNotPresent('a[href="#/a"]', 'router-link-active')
      .assert.cssClassPresent('a[href="#/b"]', 'router-link-active')
      .assert.containsText('#router-view', 'This is Component B.')
      .click('a[href="#/c"]')
      .pause(1000)
      .assert.cssClassNotPresent('a[href="#/b"]', 'router-link-active')
      .assert.cssClassPresent('a[href="#/c"]', 'router-link-active')
      .assert.containsText('#router-view', 'This is Component C.')
      .end()
  }
}
