import CommonComponents from 'src/components/CommonComponents'
var componentCount = require.context('src/components/CommonComponents', true, /\.vue$/).keys().length

describe('CommonComponents', () => {
  it(`should contain ${componentCount} component(s)`, () => {
    expect(Object.keys(CommonComponents).length)
      .to.equal(componentCount)
  })
})
