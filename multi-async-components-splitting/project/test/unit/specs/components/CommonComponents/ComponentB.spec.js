import Vue from 'vue'
import ComponentB from 'src/components/CommonComponents/ComponentB'

describe('ComponentB.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ComponentB)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent)
      .to.equal(`
  This is Component B.
`)
  })
})
