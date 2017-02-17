import Vue from 'vue'
import ComponentA from 'src/components/CommonComponents/ComponentA'

describe('ComponentA.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ComponentA)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .to.equal(`
  This is Component A.
`)
  })
})
