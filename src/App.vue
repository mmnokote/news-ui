<template>
  <div class="login-application-container">
    <SnackBar />
    <Loader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SnackBar from "@/components/shared/SnackBar.vue";

export default defineComponent({
  components: {
    SnackBar,
  },
});
</script>

<style>
#App {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.v-main__wrap {
  margin-left: 5px;
}
</style>
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap5.css";
@import "../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/bootstrap5.css";
</style>
