<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/" exact>Home</router-link>
      <router-link to="/a">Page A</router-link>
      <router-link to="/b">Page B</router-link>
      <router-link to="/c">Page C</router-link>
    </div>
    <router-view id="router-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
