<template>
  <v-card flat color="">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-5 basil--text">Event Schedule</h1>
    </v-card-title>
    <hr class="centered-line" />

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: ["Day 1", "Day 2", "Day 3"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>

<style scoped>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}

.color-title {
  color: grey;
}

.centered-line {
  width: 10%;
  border: 3px solid grey; /* Adjust thickness as needed */
  margin: 8px auto; /* Adjust as needed */
}
</style>
