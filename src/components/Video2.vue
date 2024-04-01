<template>
  <div class="gallery-container">
    <span class="color-title">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-5 basil--text2">NEWS-IPHC 2024</h1>
      </v-card-title>
    </span>
    <div class="row mb-6 mt-10">
      <div class="pt-0 mb-lg-0 mb-10 col-lg-4 col">
        <div
          class="card card-shadow border-radius-xl py-5 text-center v-card v-sheet theme--light"
        >
          <div class="mt-n11 mx-4 card-header position-relative z-index-2">
            <div class="d-block blur-shadow-image">
              <img
                src="/sliders/2.jpeg"
                alt="/vuetify-material-dashboard-pro/img/product-1-min.a31de5a2.jpeg"
                style="max-width: 100%; height: auto"
                class="img-fluid shadow border-radius-lg shake-image"
              />
            </div>
            <div
              class="colored-shadow"
              style="
                background-image: url('/vuetify-material-dashboard-pro/img/product-1-min.a31de5a2.jpeg');
              "
            ></div>
          </div>

          <h5 class="font-weight-normal text-typo text-h5 mt-7 mb-2 px-4">
            <a href="javascript:;" class="text-decoration-none text-default"
              >Cozy 5 Stars Apartment</a
            >
          </h5>
          <p class="mb-0 text-body font-weight-light px-5">
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to 'Naviglio' where you can enjoy the main night life
            in Barcelona.
          </p>
          <hr class="horizontal dark my-6" />
          <div class="d-flex text-body mx-2 px-4">
            <p class="mb-0 font-weight-normal text-body">$899/night</p>
            <i
              class="material-icons-round position-relative ms-auto text-lg me-1 my-auto"
              >place</i
            >
            <p class="text-sm my-auto font-weight-light">Barcelona, Spain</p>
          </div>
        </div>
      </div>
      <div class="pt-0 mb-lg-0 mb-10 col-lg-4 col">
        <div
          class="card card-shadow border-radius-xl py-5 text-center v-card v-sheet theme--light"
        >
          <div class="mt-n11 mx-4 card-header position-relative z-index-2">
            <div class="d-block blur-shadow-image">
              <img
                src="/gallery/11.jpeg"
                alt="/vuetify-material-dashboard-pro/img/product-1-min.a31de5a2.jpeg"
                class="img-fluid shadow border-radius-lg shake-image"
                style="max-width: 100%; height: auto"
              />
            </div>
            <div
              class="colored-shadow"
              style="
                background-image: url('/vuetify-material-dashboard-pro/img/product-1-min.a31de5a2.jpeg');
              "
            ></div>
          </div>

          <h5 class="font-weight-normal text-typo text-h5 mt-7 mb-2 px-4">
            <a href="javascript:;" class="text-decoration-none text-default"
              >Cozy 5 Stars Apartment</a
            >
          </h5>
          <p class="mb-0 text-body font-weight-light px-5">
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to 'Naviglio' where you can enjoy the main night life
            in Barcelona.
          </p>
          <hr class="horizontal dark my-6" />
          <div class="d-flex text-body mx-2 px-4">
            <p class="mb-0 font-weight-normal text-body">$899/night</p>
            <i
              class="material-icons-round position-relative ms-auto text-lg me-1 my-auto"
              >place</i
            >
            <p class="text-sm my-auto font-weight-light">Barcelona, Spain</p>
          </div>
        </div>
      </div>
      <div class="pt-0 mb-lg-0 mb-10 col-lg-4 col">
        <div
          class="card card-shadow border-radius-xl py-5 text-center v-card v-sheet theme--light"
        >
          <div class="mt-n11 mx-4 card-header position-relative z-index-2">
            <div class="d-block blur-shadow-image">
              <img
                src="/gallery/32.jpeg"
                alt="/vuetify-material-dashboard-pro/img/product-1-min.a31de5a2.jpeg"
                class="img-fluid shadow border-radius-lg shake-image"
                style="max-width: 100%; height: auto"
              />
            </div>
            <div
              class="colored-shadow"
              style="
                background-image: url('/vuetify-material-dashboard-pro/img/product-1-min.a31de5a2.jpeg');
              "
            ></div>
          </div>

          <h5 class="font-weight-normal text-typo text-h5 mt-7 mb-2 px-4">
            <a href="javascript:;" class="text-decoration-none text-default"
              >Cozy 5 Stars Apartment</a
            >
          </h5>
          <p class="mb-0 text-body font-weight-light px-5">
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to 'Naviglio' where you can enjoy the main night life
            in Barcelona.
          </p>
          <hr class="horizontal dark my-6" />
          <div class="d-flex text-body mx-2 px-4">
            <p class="mb-0 font-weight-normal text-body">$899/night</p>
            <i
              class="material-icons-round position-relative ms-auto text-lg me-1 my-auto"
              >place</i
            >
            <p class="text-sm my-auto font-weight-light">Barcelona, Spain</p>
          </div>
        </div>
      </div>
    </div>

    <span class="color-title">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold text-5 basil--text2">Gallery-IPHC 2024</h1>
      </v-card-title>
    </span>
    <SimpleGallery
      galleryID="my-test-gallery"
      :images="images"
      :visibleImageCount="visibleImageCount"
    />
    <v-card-actions class="mr-1 ml-0 mt-n4">
      <v-btn
        v-if="showLoadMoreButton"
        @click="loadMoreImages"
        class="font-weight-bold text-3 primary--text"
        text
        ><h3 class="font-weight-bold text-3 primary--text">Load More</h3></v-btn
      >

      <v-spacer></v-spacer>

      <v-btn
        v-if="showLoadLessButton"
        @click="loadLessImages"
        class="font-weight-bold text-3 teal--text"
        text
        ><h3 class="font-weight-bold text-3 teal--text">Load Less</h3></v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
import SimpleGallery from "./SimpleGallery.vue";

export default {
  name: "App",
  components: {
    SimpleGallery,
  },
  data() {
    return {
      images: this.generateImageArray(48), // Generate 50 images
      visibleImageCount: 30,
    };
  },
  computed: {
    showLoadMoreButton() {
      return this.visibleImageCount < this.images.length;
    },
    showLoadLessButton() {
      return this.visibleImageCount > 30;
    },
  },
  methods: {
    loadMoreImages() {
      this.visibleImageCount += 15; // Increase by desired number
    },
    loadLessImages() {
      this.visibleImageCount -= 15; // Decrease by 10
    },
    generateImageArray(count) {
      const images = [];
      for (let i = 1; i <= count; i++) {
        images.push({
          largeURL: `/gallery/${i}.jpeg`,
          thumbnailURL: `/gallery/${i}.jpeg`,
          width: 5000,
          height: 3000,
        });
      }
      return images;
    },
  },
};
</script>
<style scoped>
.shake-image {
  transition: transform 0.5s ease;
}

.shake-image:hover {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(-5px, 5px);
  }
  50% {
    transform: translate(5px, -5px);
  }
  75% {
    transform: translate(-5px, 5px);
  }
  100% {
    transform: translate(0);
  }
}
</style>
<style>
.basil--text2 {
  color: #356859 !important;
}
.basil {
  background-color: #fffbe6 !important;
}
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3%;
}

/* ******************* */

.border-radius-lg {
  border-radius: 0.5rem !important;
}
.row + .row {
  margin-top: 12px;
}
.v-application .mb-6 {
  margin-bottom: 24px !important;
}
.v-application .mt-10 {
  margin-top: 40px !important;
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
}
* {
  padding: 0;
  margin: 0;
}
*,
:after,
:before {
  background-repeat: no-repeat;
  box-sizing: inherit;
}
user agent stylesheet div {
  display: block;
}
.theme--light.v-application {
  background: #f0f2f5;
  color: rgba(0, 0, 0, 0.87);
}
.v-application {
  font-family: Roboto, sans-serif;
  line-height: 1.5;
}
:root {
  --fc-list-event-dot-width: 10px;
  --fc-list-event-hover-bg-color: #f5f5f5;
}
:root {
  --fc-daygrid-event-dot-width: 8px;
}
injected stylesheet :host,
:root {
  --rem: 16;
}
html {
  -webkit-font-smoothing: auto;
}
html {
  font-size: 1rem;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}
html {
  box-sizing: border-box;
  overflow-y: scroll;
  -webkit-text-size-adjust: 100%;
  word-break: normal;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
}
:after,
:before {
  text-decoration: inherit;
  vertical-align: inherit;
}
*,
:after,
:before {
  background-repeat: no-repeat;
  box-sizing: inherit;
}
:after,
:before {
  text-decoration: inherit;
  vertical-align: inherit;
}
*,
:after,
:before {
  background-repeat: no-repeat;
  box-sizing: inherit;
}
</style>
