<template>
  <div id="app">
    <stHeader />
    <router-view/>
  </div>
</template>

<script>
import stHeader from "./components/stHeader";

export default {
  name: "App",
  components: {
    stHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }

  .leaflet-control-zoom {
    display: none;
  }
</style>
