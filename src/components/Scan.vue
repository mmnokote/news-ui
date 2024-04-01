<template>
  <div id="app">
    <h2>
      <span class="grey--text font-weight-bold">IPHC 2024 - </span>QRCODE
      SCANING FOR REGISTRATION VERIFICATION
    </h2>
    <hr class="centered-line" />
    <v-divider class="mb-5"></v-divider>
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

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
