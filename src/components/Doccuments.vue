<template>
  <div>
    <h1 class="text-center mb-0 color-title">Documents List</h1>

    <hr class="centered-line" />
    <div v-for="(category, index) in categories" :key="index">
      <h2>{{ category.name }}</h2>
      <ul>
        <p v-for="(document, docIndex) in category.documents" :key="docIndex">
          <a :href="document.src" target="_blank" class="document-link">{{
            document.name
          }}</a>
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      categories: [
        {
          name: "Invitation Letter",
          documents: [
            {
              name: "Download Invitation Letter",
              src: "/INVITATION_LETTER.pdf",
            },
          ],
        },
        // {
        //   name: "Others",
        //   documents: [
        //     { name: "Timetable", src: "https://example.com/timetable.pdf" },
        //     {
        //       name: "Program Book",
        //       src: "https://example.com/program-book.pdf",
        //     },
        //   ],
        // },
        // Add more categories and documents as needed
      ],
    };
  },
  created() {
    this.fetchSubthemes();
    Vue.nextTick(() => {
      // This will be executed after the DOM has been updated
      window.scrollTo(0, 0); // Scroll to the top
    });
  },
};
</script>

<style>
.document-link {
  cursor: pointer; /* Change cursor to pointer on hover */
  text-decoration: underline; /* Underline the text */
}
</style>
