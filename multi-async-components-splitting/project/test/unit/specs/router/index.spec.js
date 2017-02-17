import Vue from 'vue'
import router from 'src/router'
require('es6-promise').polyfill()

describe('router', () => {
  it('should contain 4 route entries', () => {
    expect(router.options.routes.length)
      .to.equal(4)
  })

  it('should render async component correctly', (done) => {
    const vm = new Vue({
      template: '<div><router-link to="/a">Page A</router-link><router-view id="router-view"></router-view></div>',
      router
    }).$mount()

    vm.$el.querySelector('a').click()

    setTimeout(function () {
      expect(vm.$el.querySelector('#router-view').textContent)
        .to.equal(`
  This is Component A.
`)
      done()
    }, 1000)
  })
})
