<template>
  <!-- About page content -->
  <div style="position: relative">
    <v-container class="mt-10">
      <v-row class="">
        <v-col cols="12">
          <h1 class="text-center mb-1 color-title">About IPHCC</h1>
          <hr class="centered-line" />
          <v-divider class="mb-5"></v-divider>

          <!-- Sample about content -->
          <v-row>
            <div class="custom-shape-divider-top-1713021682">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M1200 0L0 0 892.25 114.72 1200 0z"
                  class="shape-fill"
                ></path>
              </svg>
            </div>
            <v-row justify="center">
              <v-col cols="12" md="12">
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12" sm="10" md="8">
                      <v-card-title class="headline">Our Vision</v-card-title>
                      <v-card-text>
                        <ul>
                          <h2>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              To be an exemplary international conference in
                              sharing high-quality best practices, innovations
                              and scientific evidence in PHC
                            </li>
                          </h2>
                        </ul>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" sm="10" md="8">
                      <v-card-title class="headline">Our Mission</v-card-title>
                      <v-card-text>
                        <ul>
                          <h2>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              To provide scientific proven evidence, innovations
                              and best practices to support evidence-based
                              decision making to policy makers and implementers
                              using available multidisciplinary local and
                              international experts in PHC.
                            </li>
                          </h2>
                        </ul>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" sm="10" md="8">
                      <v-card-title class="headline">Our Values</v-card-title>
                      <v-card-text>
                        <ul>
                          <h2>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              Integrity and Loyalty
                            </li>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              Accountability and Transparency
                            </li>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              Unity and Team spirit
                            </li>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              Timely and Quality services
                            </li>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              Confidentiality and Professionalism
                            </li>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              Accessibility and Responsiveness
                            </li>
                            <li>
                              <v-icon class="pr-5" color="primary"
                                >mdi-check</v-icon
                              >
                              Openness
                            </li>
                          </h2>
                        </ul>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-row>

          <!-- Shape divider -->

          <!-- Shape divider -->
          <div class="custom-shape-divider-bottom-1713000163">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                class="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    goAbout() {
      this.$router.push({ path: "/about" });
    },
    handleButtonClick1() {
      // Handle the first button click
    },
  },
  created() {
    Vue.nextTick(() => {
      // This will be executed after the DOM has been updated
      window.scrollTo(0, 0); // Scroll to the top
    });
  },
};
</script>
<style scoped>
.custom-shape-divider-top-1713021682 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1713021682 svg {
  position: relative;
  display: block;
  width: calc(249% + 1.3px);
  height: 189px;
  transform: rotateY(180deg);
}

.custom-shape-divider-top-1713021682 .shape-fill {
  fill: #9eb1bb5d;
}
</style>
<style scoped>
.custom-shape-divider-bottom-1713000163 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1713000163 svg {
  position: relative;
  display: block;
  width: calc(114% + 1.3px);
  height: 396px;
  transform: rotateY(180deg);
}

.custom-shape-divider-bottom-1713000163 .shape-fill {
  fill: #9eb1bb5d;
}

.bg-image {
  background-image: url("./slider1.jpg");
  /* background-image: url("path_to_your_image.jpg"); */
  background-size: cover;
  background-position: center;
}
.mission-card {
  /* Add any additional styling for the card */
  padding: 20px;
}

.headline {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

v-icon {
  margin-right: 8px;
}
</style>
<style>
/* Add your custom styles here */
.color-title {
  color: grey;
}
.centered-line {
  width: 25%;
  border: 3px solid grey; /* Adjust thickness as needed */
  margin: 8px auto; /* Adjust as needed */
}

.basil {
  background-color: #fffbe6 !important;
}
.cala {
  background-color: #edf2f7;
}
.basil--text {
  color: #356859 !important;
}
</style>
