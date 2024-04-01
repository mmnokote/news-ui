<template>
  <div class="">
    <v-card-actions class="pa-0">
      <h2>{{ data.title }}</h2>
      <v-spacer></v-spacer>
      <v-btn
        disabled
        large
        color="teal"
        class="white--text d-none d-md-flex"
        @click="openDialog"
      >
        <!-- <v-icon>mdi-send</v-icon> -->
        Send Email For Abstract Correction
      </v-btn>
    </v-card-actions>
    <p>
      <v-btn
        disabled
        block
        large
        color="teal"
        class="white--text d-md-none"
        @click="openDialog"
      >
        <!-- <v-icon>mdi-send</v-icon> -->
        Send Email For Abstract Correction
      </v-btn>
    </p>
    <v-card>
      <!-- <v-data-table
        :headers="data.headers"
        :items="users"
        :single-expand="true"
        class="elevation-1"
        disable-pagination
        hide-default-footer
      > -->
      <v-data-table
        :headers="data.headers"
        :items="users"
        :single-expand="true"
        class="elevation-1"
      >
        <!-- disable-pagination -->

        <template v-slot:[`item.createdAt`]="{ item }">
          <span>{{ item.createdAt | format() }}</span>
        </template>
        <template v-slot:top>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="12" md="4" class="pa-1">
              <v-select
                @change="filterDocument()"
                outlined
                v-model="data.searchTerm"
                :items="data.subThemes"
                item-text="name"
                item-value="id"
                label="Filter By Sub-Theme"
                clearable
                class="align-left-dropdown"
                @click:clear="initialize()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4" class="pa-1">
              <v-select
                @change="filterDocumentByStatus()"
                outlined
                v-model="data.searchTerm2"
                :items="data.statuses"
                item-text="name"
                item-value="id"
                label="Filter By Status"
                clearable
                class="align-left-dropdown"
                @click:clear="initialize()"
              ></v-select>
            </v-col>
            <!-- <v-col cols="6" sm="12" md="4" class="pa-0">
              <v-text-field
                outlined
                label="Search"
                @keyup="filterDocument()"
                :items="data.itemsToFilter"
                v-model="data.searchTerm"
                @click:clear="resetSearchText()"
                clearable
              ></v-text-field>
            </v-col> -->
          </v-card-title>
        </template>
        <template v-slot:[`item.rejectionComment`]="{ item }">
          <span
            v-if="item.rejectionComment === 'Abstract Accepted'"
            class="green--text"
            >{{ item.rejectionComment }}</span
          >
          <span v-else class="red--text">{{ item.rejectionComment }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="printFromServer(item.id)"
                v-bind="attrs"
                v-on="on"
                class="mr-2"
              >
                mdi-briefcase-eye
              </v-icon>
            </template>
            <span>Preview</span>
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
            <span>Aproval</span>
          </v-tooltip>

          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="openUploadDialog(item)"
                >mdi-upload</v-icon
              >
            </template>
            <span>Upload PPT</span>
          </v-tooltip> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <a
                v-if="item.path_file"
                :href="getFullFilePath(item.path_file)"
                download
                target="_blank"
              >
                <v-icon color="green" v-bind="attrs" v-on="on"
                  >mdi-download</v-icon
                >
              </a>
              <v-icon v-else disabled>mdi-download</v-icon>
            </template>
            <span v-if="item.path_file">Download PPT</span>
            <span v-else>No file available</span>
          </v-tooltip>
        </template>
        <!-- <template v-slot:footer>
          <Paginate
            :params="data.response"
            :rows="data.rows"
            @onPageChange="getData"
          />
        </template> -->
      </v-data-table>
    </v-card>
    <Modal :modal="data.openUploadDialogForm" :width="600">
      <template v-slot:header>
        <ModalHeader @closeDialog="cancelDialogx()" :title="`PPT Document`" />
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
                    label="Select ODP file"
                    accept="application/vnd.oasis.opendocument.presentation"
                    :show-size="1000"
                  >
                  </v-file-input>
                  <!-- <v-file-input
                    accept="application/vnd.oasis.opendocument.presentation"
                    label="Select ODP file"
                    @change="saveFile($event)"
                  ></v-file-input> -->
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
    <Modal :modal="data.modal" :width="750">
      <template v-slot:header>
        <ModalHeader
          @closeDialog="cancelDialog()"
          :title="`${data.modalTitle}`"
        />
      </template>
      <template v-slot:body>
        <ModalBody v-if="data.formData">
          <v-form ref="form" enctype="multipart/form-data">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-select
                    outlined
                    v-model="data.formData.status"
                    :items="data.statuses"
                    item-text="name"
                    item-value="id"
                    label="Select Approval Status"
                    clearable
                    return-object
                    class="align-left-dropdown"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                    v-if="!shouldShowRejectionComment"
                    outlined
                    v-model="data.formData.template"
                    :items="['PPT', 'POSTER']"
                    label="Template to upload"
                  >
                  </v-select>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                  class="mb-n8"
                  v-if="shouldShowRejectionComment"
                >
                  <v-textarea
                    v-model="data.formData.rejectionComment"
                    outlined
                    label="Comment"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ModalBody>
      </template>
      <template v-slot:footer>
        <ModalFooter>
          <v-btn color="red darken-1" text @click="cancelDialog">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="save">{{ "Save" }} </v-btn>
        </ModalFooter>
      </template>
    </Modal>
    <Modal :modal="data.modal2" :width="750">
      <template v-slot:header>
        <ModalHeader @closeDialog="cancelDialog2()" :title="`Send Email`" />
      </template>
      <template v-slot:body>
        <ModalBody v-if="data.formData">
          <v-form ref="form" enctype="multipart/form-data">
            <v-container>
              <v-row>
                <v-col cols="12" md="12" class="mb-n8">
                  <v-textarea
                    v-model="data.formData2.body"
                    outlined
                    label="Email Body"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ModalBody>
      </template>
      <template v-slot:footer>
        <ModalFooter>
          <v-btn color="red darken-1" text @click="cancelDialog2">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="save2"
            >{{ "Send" }}
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

export default defineComponent({
  name: "QueryCategoryComponent",
  setup() {
    const {
      data,
      shouldShowRejectionComment,
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
    } = useQueryCategory();

    return {
      data,
      saveFile,
      fetchSubthemese,
      getFullFilePath,
      cancelDialogx,
      cancelDialog2,
      save2,
      shouldShowRejectionComment,
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
