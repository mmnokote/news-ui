<template>
  <span class="font-weight-bold header-colour">{{ header.text }}</span>
</template>

<script>
export default {
  name: "SharedHeaderTemplate",
  props: {
    header: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
.header-colour {
  /* Add your custom color styles here */
}
</style>
