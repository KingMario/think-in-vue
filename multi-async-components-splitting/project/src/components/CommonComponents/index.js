const CommonComponents = require.context('.', true, /\.vue$/)

CommonComponents.keys().forEach(key => {
  exports[key.replace(/(.+\/)([^/]+)(\.vue)$/, '$2')] = CommonComponents(key)
})
