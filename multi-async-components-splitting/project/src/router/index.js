import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'

let getCommonComponent = componentName => resolve => require(['components/CommonComponents'], components => resolve(components[componentName]))

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/a',
      name: 'A',
      component: getCommonComponent('ComponentA')
    },
    {
      path: '/b',
      name: 'B',
      component: getCommonComponent('ComponentB')
    },
    {
      path: '/c',
      name: 'C',
      component: getCommonComponent('ComponentC')
    }
  ]
})
