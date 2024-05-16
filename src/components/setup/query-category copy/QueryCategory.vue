<template>
  <div class="">
    <v-card-actions class="pa-0">
      <h2>{{ data.title }}</h2>
      <v-spacer></v-spacer>
      <v-btn class="warning d-none d-md-flex">
        <a
          :href="fileUrl"
          target="_blank"
          style="text-decoration: none; color: inherit"
        >
          <span class="white--text">
            <v-icon>mdi-file-powerpoint</v-icon>
            {{ "Abstract PPT Template" }}
            <v-icon>mdi-download</v-icon>
          </span>
        </a>
      </v-btn>
      <v-btn class="teal d-none d-md-flex">
        <a
          :href="fileUrlWord"
          target="_blank"
          style="text-decoration: none; color: inherit"
        >
          <span class="white--text">
            <v-icon>mdi-microsoft-word</v-icon>
            {{ " Abstract Word Template" }}
            <v-icon>mdi-download</v-icon>
          </span>
        </a>
      </v-btn>
    </v-card-actions>
    <p>
      <v-btn block class="warning d-md-none">
        <a
          :href="fileUrl"
          target="_blank"
          style="text-decoration: none; color: inherit"
        >
          <span class="white--text">
            <v-icon>mdi-file-powerpoint</v-icon>
            {{ "Abstract PPT Template" }}
            <v-icon>mdi-download</v-icon>
          </span>
        </a>
      </v-btn>
    </p>
    <p>
      <v-btn block class="teal d-md-none">
        <a
          :href="fileUrlWord"
          target="_blank"
          style="text-decoration: none; color: inherit"
        >
          <span class="white--text">
            <v-icon>mdi-microsoft-word</v-icon>
            {{ " Abstract Word Template" }}
            <v-icon>mdi-download</v-icon>
          </span>
        </a>
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
            <v-col cols="6" sm="12" md="4" class="pa-0">
              <v-text-field
                outlined
                label="Search"
                @keyup="filterDocument()"
                :items="data.itemsToFilter"
                v-model="data.searchTerm"
                @click:clear="resetSearchText()"
                clearable
              ></v-text-field>
            </v-col>
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
              <!-- v-if="!isButtonDisabled" -->
              <v-icon
                :disabled="item.rejectionComment == 'Abstract Accepted'"
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

          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="deleteDialog(item.id)"
                >mdi-trash-can-outline</v-icon
              >
            </template>
            <span>Delete</span>
          </v-tooltip> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :disabled="item.rejectionComment !== 'Abstract Accepted'"
                v-bind="attrs"
                v-on="on"
                @click="openUploadDialog(item)"
                >mdi-upload</v-icon
              >
            </template>
            <span>Upload {{ item.template }}</span>
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
          <!-- <v-btn color="red darken-1" text @click="cancelDialog">Cancel</v-btn> -->
          <v-btn color="green darken-1" text @click="savePPT"
            >{{ "Save" }}
          </v-btn>
        </ModalFooter>
      </template>
    </Modal>
    <Modal :modal="data.modal" :width="1500">
      <template v-slot:header>
        <ModalHeader
          @closeDialog="cancelDialog()"
          :title="`${data.modalTitle}`"
        />
      </template>
      <template v-slot:body>
        <ModalBody v-if="data.formData">
          <v-form v-model="valid" @submit.prevent="submitForm">
            <v-container>
              <!-- Select Category -->
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="data.formData.email"
                    @input="updateEmail"
                    :rules="emailRules"
                    label="Valid E-mail"
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="data.formData.title"
                    :rules="nameRules"
                    @input="updateTitle"
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
                    label="Select Conference Sub-Theme"
                    clearable
                    class="align-left-dropdown"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="data.formData.author"
                    :rules="nameRules"
                    label="Authors"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="data.formData.affiliation"
                    :rules="nameRules"
                    label="Affiliation"
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="data.formData.presenting_author"
                    :rules="nameRules"
                    label="Presenting author"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Name Fields -->
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    height="250"
                    outlined
                    v-model="data.formData.background"
                    label="Background"
                    placeholder="Enter your background here, maximum 200 words..."
                    :rules="[maxRule]"
                  ></v-textarea>
                </v-col>
              </v-row>

              <!-- Description Field -->
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    height="250"
                    outlined
                    v-model="data.formData.objective"
                    label="Objective/Aims"
                    placeholder="Enter your Objective/Aims here..."
                  ></v-textarea>
                  <!-- <v-alert
                        v-if="wordCount > maxWordLimit"
                        type="error"
                        dense
                      >
                        Maximum word limit exceeded ({{ maxWordLimit }} words).
                      </v-alert> -->
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    height="250"
                    outlined
                    v-model="data.formData.methodology"
                    label="Methodology/Project plan"
                    placeholder="Enter your Methodology/Project plan here, maximum 200 words..."
                    :rules="[maxRule]"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    height="250"
                    outlined
                    v-model="data.formData.results"
                    label="Results/Discussions"
                    placeholder="Enter your Results/Progress here,"
                    :rules="[maxRule]"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    height="250"
                    outlined
                    v-model="data.formData.conclusion"
                    label="Conclusion/Lessons learned"
                    placeholder="Enter your Results/Progress here,"
                    :rules="[maxRule]"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    height="250"
                    outlined
                    v-model="data.formData.recommendations"
                    label="Recommendations"
                    placeholder="Enter your Recommendations here,"
                    :rules="[maxRule]"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row class="text-center">
                <v-col>
                  <v-card-text class="pa-10" style="text-align: center">
                    <v-row
                      ><h4>
                        I consent that my abstract be published in peer review
                        journal
                      </h4>
                    </v-row>
                    <v-col>
                      <!--              @change="handleRadioChange"-->
                      <v-radio-group
                        style="margin-left: auto"
                        v-model="data.formData.inline"
                        inline
                      >
                        <v-radio label="Yes" value="Yes"></v-radio>
                        <v-radio label="No" value="No"></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-card-text>
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
            >{{ "Update" }}
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
      savePPT,
      openUploadDialog,
      shouldShowRejectionComment,
      openDialog,
      getData,
      cancelDialog,
      getDocumentCategory,
      save,
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
      deleteDialog,
      users,
      printFromServer,
      fetchSubthemes,
      save2,
      cancelDialog2,
      openDialog1,
      isButtonDisabled,
      fileUrl,
      fileUrlWord,
      saveFile,
      cancelDialogx,
    } = useQueryCategory();

    return {
      data,
      cancelDialogx,
      saveFile,
      savePPT,
      openUploadDialog,
      fileUrl,
      fileUrlWord,
      isButtonDisabled,
      cancelDialog2,
      save2,
      shouldShowRejectionComment,
      fetchSubthemes,
      users,
      openDialog,
      openDialog1,
      getData,
      cancelDialog,
      getDocumentCategory,
      save,
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
      deleteDialog,
      printFromServer,
    };
  },
});
</script>

<style scoped></style>
