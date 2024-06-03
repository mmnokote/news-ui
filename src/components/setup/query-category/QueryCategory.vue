<template>
  <div class="">
    <div class="pt-12">
      <v-app-bar color="" dark>
        <v-icon large class="pr-5"
          >mdi-newspaper-variant-multiple-outline</v-icon
        >
        <v-toolbar-title>
          <h2 class="white--text">{{ data.title }}</h2>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-col cols="3">
          <v-text-field
            v-model="data.search"
            append-icon="mdi-magnify"
            label="Search"
            placeholder="search here ..."
            outlined
            dense
            clearable
            class="pt-8 pr-0"
          ></v-text-field>
        </v-col>

        <v-menu left bottom> </v-menu>
      </v-app-bar>
    </div>
    <v-card flat class="pr-1 pl-1">
      <template>
        <v-data-table
          :headers="data.headers"
          :items="data.items"
          :sort-by="data.sortBy"
          :sort-desc="data.sortDesc"
          hide-default-footer
          :expanded.sync="data.expanded"
          :single-expand="data.singleExpand"
          show-expand
          item-key="id"
          class="pa-3 elevation-1 max-height-table custom-header-style"
        >
          <template v-slot:[`item.createdAt`]="{ item }">
            <span>{{ item.createdAt | format() }}</span>
          </template>
          <template v-slot:[`item.display_path`]="{ item }">
            <span>
              <img
                class="pt-1"
                :src="getImagePath(item.display_path)"
                alt="Image"
                width="90"
                height="70"
              />
            </span>
          </template>
          <template v-slot:top>
            <v-card-actions class="pa-0">
              <v-col cols="12" sm="12" md="4" class="pa-5">
                <v-select
                  @change="filterDocument"
                  outlined
                  v-model="data.searchTerm"
                  :items="data.subThemes"
                  item-text="name"
                  item-value="id"
                  label="Filter By Category"
                  clearable
                  class="align-left-dropdown"
                ></v-select>
              </v-col>
              <v-spacer></v-spacer>
              <v-btn
                x-large
                color="#1B629D"
                class="white--text"
                @click="openDialog1"
              >
                <v-icon>mdi-plus</v-icon>
                Add News
              </v-btn>
            </v-card-actions>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <p class="pt-5">
                <span class="teal--text"> <small> DESCRIPTION </small> </span>
              </p>
              <v-alert
                text
                dense
                color="teal"
                icon="mdi-format-list-bulleted-square"
                border="left"
              >
                <span v-html="item.description"></span>
              </v-alert>
            </td>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  @click="openUploadDialog(item)"
                >
                  mdi-upload
                </v-icon>
              </template>
              <span>Upload</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  @click="openDialog1(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Update</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <a
                  :href="getFullFilePath(item.urlToImage)"
                  download
                  target="_blank"
                >
                  <v-icon
                    :disabled="!item.urlToImage"
                    color="green"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-download
                  </v-icon>
                </a>
              </template>
              <span v-if="item.urlToImage">Download</span>
              <span v-else>No file available</span>
            </v-tooltip>
          </template>

          <template v-slot:footer>
            <Paginate
              :params="data.meta"
              :rows="data.rows"
              @onPageChange="getData"
            />
          </template>
        </v-data-table>
      </template>
    </v-card>
    <Modal :modal="data.openUploadDialogForm" :width="600">
      <template v-slot:header>
        <ModalHeader @closeDialog="cancelDialogx()" :title="`News Image`" />
      </template>
      <template v-slot:body>
        <div class="pa-5">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <label for="file" class="label">
                    <!-- <small class="t-color">
                      {{ "Attachment " }}
                    </small> -->
                  </label>
                  <v-file-input
                    @change="saveFile($event)"
                    color=""
                    placeholder="Attach"
                    filled
                    outlined
                    v-model="data.selectedFile"
                    label="Select Image"
                    accept="image/*"
                    :show-size="1000"
                  >
                  </v-file-input>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </template>
      <template v-slot:footer>
        <ModalFooter>
          <v-btn color="red darken-1" text @click="cancelDialog">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="savePPT"
            >{{ "Save" }}
          </v-btn>
        </ModalFooter>
      </template>
    </Modal>
    <Modal :fullScreen="true" :modal="data.modal" :width="2000">
      <template v-slot:header>
        <ModalHeader
          @closeDialog="cancelDialog()"
          :title="`${data.modalTitle}`"
        />
      </template>
      <template v-slot:body>
        <ModalBody v-if="data.formData">
          <v-form v-model="data.valid" @submit.prevent="submitForm">
            <v-container>
              <!-- Select Category -->
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="data.formData.title"
                    label="Title"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-select
                    outlined
                    v-model="data.formData.subTheme"
                    :items="data.subThemes"
                    item-text="name"
                    item-value="id"
                    label="Select News Category"
                    clearable
                    class="align-left-dropdown"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="data.formData.author"
                    label="Authors"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    height="250"
                    outlined
                    v-model="data.formData.content"
                    label="Contents"
                  ></v-textarea>
                </v-col>
              </v-row>

              <span class="error white--text">
                Descriptions To Be Seen as Contents in APK
              </span>
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <vue-editor v-model="data.formData.description"></vue-editor>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="data.formData.url"
                    label="URL"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ModalBody>
      </template>
      <template v-slot:footer>
        <ModalFooter>
          <v-btn color="red darken-1" text @click="cancelDialog">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="save"
            >{{ data.modalTitle }}
          </v-btn>
        </ModalFooter>
      </template>
    </Modal>

    <Modal :modal="data.deletemodal" :width="320">
      <template v-slot:header>
        <ModalHeader :title="`Delete Document `" />
      </template>
      <template v-slot:body>
        <ModalBody> Are you sure? </ModalBody>
      </template>
      <template v-slot:footer>
        <ModalFooter>
          <v-btn color="green darken-1" text @click="cancelConfirmDialog"
            >Cancel</v-btn
          >
          <v-btn color="red darken-1" text @click="remove">Yes</v-btn>
        </ModalFooter>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQueryCategory } from "./composables/query-category";
import { VueEditor } from "vue2-editor";

export default defineComponent({
  components: {
    VueEditor,
  },
  name: "QueryCategoryComponent",
  setup() {
    const {
      data,
      openDialog,
      getData,
      cancelDialog,
      cancelDialogx,
      getDocumentCategory,
      save,
      savePPT,
      reloadData,
      remove,
      cancelConfirmDialog,
      searchCategory,
      initialize,
      deleteDocument,
      updateDocument,
      handleSelectedFiles,
      createDocument,
      selectedFile,
      downloadFile,
      filterDocument,
      filterDocumentByStatus,
      deleteDialog,
      users,
      printFromServer,
      fetchSubthemes,
      save2,
      cancelDialog2,
      openDialog1,
      openUploadDialog,
      saveFile,
      getFullFilePath,
      fetchSubthemese,
      getImagePath,
    } = useQueryCategory();

    return {
      data,
      getImagePath,
      saveFile,
      fetchSubthemese,
      getFullFilePath,
      cancelDialogx,
      cancelDialog2,
      save2,
      fetchSubthemes,
      users,
      openDialog,
      openUploadDialog,
      openDialog1,
      getData,
      cancelDialog,
      getDocumentCategory,
      save,
      savePPT,
      reloadData,
      remove,
      cancelConfirmDialog,
      searchCategory,
      initialize,
      deleteDocument,
      updateDocument,
      handleSelectedFiles,
      createDocument,
      selectedFile,
      downloadFile,
      filterDocument,
      filterDocumentByStatus,
      deleteDialog,
      printFromServer,
    };
  },
});
</script>

<style scoped></style>
<style scoped>
.red-row {
  background-color: rgba(0, 128, 128, 0.349);
}
</style>
