<template>
  <div id="app">
    <h1>IPHC REGISTRATION</h1>
    <Scaner />
  </div>
</template>

<script>
import Scaner from "@/components/Scaner.vue";

export default {
  name: "App",
  components: {
    Scaner,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
