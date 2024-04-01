<template>
  <div>
    <v-container class="mt-10">
      <v-row>
        <v-col cols="12">
          <h1 class="text-center mb-1 color-title">Documents List</h1>
          <hr class="centered-line" />
          <v-divider class="mb-5"></v-divider>

          <v-row>
            <v-row justify="center">
              <v-col cols="12" md="12">
                <v-card color="" flat height="100%" class="mb-5">
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12" sm="10" md="8">
                        <div
                          v-for="(category, index) in categories"
                          :key="index"
                        >
                          <ul>
                            <h2>{{ category.name }}</h2>

                            <p
                              v-for="(document, docIndex) in category.documents"
                              :key="docIndex"
                            >
                              <a
                                :href="document.src"
                                target="_blank"
                                class="document-link"
                                >{{ document.name }}</a
                              >
                            </p>
                          </ul>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
        {
          name: "Program Book",
          documents: [
            {
              name: "Download Program Book",
              src: "/IPHC_2024_Program_Book.pdf",
            },
          ],
        },
        {
          name: "Opening Event Time Table",
          documents: [
            {
              name: "Opening Event",
              src: "/Ratiba_Ya_Ufunguzi.pdf",
            },
          ],
        },
        {
          name: "Others",
          documents: [
            { name: "List Of Lodges In DODOMA", src: "/LODGE DODOMA.pdf" },
            // {
            //   name: "Program Book",
            //   src: "https://example.com/program-book.pdf",
            // },
          ],
        },
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
