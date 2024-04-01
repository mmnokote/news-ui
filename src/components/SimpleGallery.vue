<template>
  <div :id="galleryID" class="text-center">
    <v-col
      style="padding-left: 0%; padding-right: 1%"
      cols="12"
      sm="12"
      md="12"
      lg="12"
    >
      <a
        v-for="(image, key) in visibleImages"
        :key="key"
        :href="image.largeURL"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        target="_blank"
        rel="noreferrer"
      >
        <div class="image-frame">
          <img :src="image.thumbnailURL" :width="100" :height="100" alt="" />
        </div>
      </a>
    </v-col>
  </div>
</template>

<script>
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default {
  name: "SimpleGallery",
  props: {
    galleryID: String,
    images: Array,
    visibleImageCount: Number,
  },
  computed: {
    visibleImages() {
      return this.images.slice(0, this.visibleImageCount);
    },
  },
  mounted() {
    if (!this.lightbox) {
      this.lightbox = new PhotoSwipeLightbox({
        gallery: "#" + this.$props.galleryID,
        children: "a",
        pswpModule: () => import("photoswipe"),
      });
      this.lightbox.init();
    }
  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
};
</script>

<style scoped>
.image-frame {
  border: 1px solid #032646e7; /* Border color */
  padding: 5px; /* Padding around the image */
  display: inline-block; /* Display as inline block to fit the content */
}
</style>
