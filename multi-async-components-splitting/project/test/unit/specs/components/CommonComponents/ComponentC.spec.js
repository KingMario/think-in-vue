import Vue from 'vue'
import ComponentC from 'src/components/CommonComponents/ComponentC'

describe('ComponentC.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ComponentC)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .to.equal(`
  This is Component C.
`)
  })
})
