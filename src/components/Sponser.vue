<template>
  <div>
    <hr class="centered-line2" />

    <span class="pt-12 pb-12 color-title">
      <v-card-title class="text-center justify-center">
        <h1 class="font-weight-bold text-5 basil--text">Sponsors</h1>
      </v-card-title>
    </span>
    <div class="elementor-shape elementor-shape-top" data-negative="true">
      <v-row justify="center" align="center">
        <v-col
          v-for="image in images"
          :key="image.id"
          cols="12"
          sm="2"
          md="2"
          lg="1"
        >
          <a :href="image.href" target="_blank" rel="noopener noreferrer">
            <v-card
              justify="center"
              align="center"
              class="image-card"
              flat
              elevation=""
            >
              <img
                :src="image.src"
                alt="Image"
                width="100%"
                height="100%"
                style="object-fit: cover"
              />
            </v-card>
          </a>
        </v-col>
      </v-row>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          class="elementor-shape-fill"
          d="M500,97C126.7,96.3,0.8,19.8,0,0v100l1000,0V1C1000,19.4,873.3,97.8,500,97z"
          style="fill: #053973"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { id: 1, src: "pham.jpeg", href: "https://www.pharmaccess.org/" },

        { id: 1, src: "unicef.png", href: "https://www.unicef.org/ " },
        { id: 3, src: "who.png", href: "https://www.who.int/" },

        { id: 2, src: "cds.jpeg", href: "https://africacdc.org/" },

        { id: 4, src: "usaid.jpeg", href: "https://www.usaid.gov/" },
        { id: 7, src: "aaph.png", href: "https://www.aaph.or.tz/" },
        {
          id: 8,
          src: "pepfa.jpeg",
          href: "https://www.hiv.gov/federal-response/pepfar-global-aids/pepfar/",
        },
        { id: 6, src: "ths-transparent.webp", href: "https://ths.or.tz/" },
      ],
    };
  },
};
</script>

<style scoped>
/* Add any additional styles for image-card here */
.image-card {
  /* Add any specific styles for the cards */
  margin: 10px; /* Example margin for spacing between cards */
}
.centered-line2 {
  width: 90%;
  border: 3px solid rgb(26, 86, 182); /* Adjust thickness as needed */
  margin: 8px auto; /* Adjust as needed */
}
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
