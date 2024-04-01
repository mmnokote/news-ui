<template>
  <v-card flat class="">
    <v-container>
      <v-col cols="12">
        <v-card-actions class="pa-0">
  <h2>{{ "Profile Details" }}</h2>

  <v-spacer></v-spacer>

  <v-btn large color="blue" class="white--text d-none d-md-flex" @click="printFromServer()">
    <v-icon>mdi-printer</v-icon>
    Print Invoice
  </v-btn>
  
  <v-btn
    class="white--text d-none d-md-flex"
    color="green"
    large
    @click="openUpdateDialog(userb)"
  >
    <v-icon color="white">mdi-account</v-icon>
    Update Profile
  </v-btn>
  
  <v-btn
    :disabled="userb?.jisajilis.length > 0"
    class="d-none d-md-flex"
    color="primary"
    large
    @click="openDialog()"
  >
    <v-icon>mdi-upload</v-icon>
    Upload your receipt
  </v-btn>


</v-card-actions>

<v-col cols="12">
      <hr class="centered-line2" />
        </v-col>
      </v-col>
      <v-card flat max-width="100%" class="">
       <!-- mmmmmmmmmmmm -->
<p>
  <v-btn  block large color="blue" class="white--text d-md-none white--text" @click="printFromServer()">
<v-icon>mdi-printer</v-icon>
Print Invoice
</v-btn>
</p>
 <p>
  <v-btn
    class="d-md-none white--text"
    color="teal"
    large
    block
    @click="openUpdateDialog(userb)"
  >
    <v-icon color="white">mdi-account</v-icon>
    Update Profile
  </v-btn>
 </p>
 <p>
  <v-btn
    block
    class="d-md-none"
    color="primary"
    large
    @click="openDialog()"
    :disabled="userb?.jisajilis.length > 0"
  >
    <v-icon>mdi-plus</v-icon>
    Upload your receipt
  </v-btn>
 </p>
       <!-- mmmmmmmmmmmmmmm -->
        
        <!-- Add more details as needed -->
        
        <v-alert
      text
      prominent
      type="error"
      icon="mdi-cloud-download"
    >
    Download the <span class="black--text font-weight-black">QR code below</span> that will be used to verify your payment details. Please ensure you have the QR code either printed or available on your phone for easier scanning. The scanning process will take place on the day of the conference.    </v-alert>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="12">
              <!-- class="elevation-1 custom-card bdt2" -->
              <v-card
              :class="{
                  'content-visible elevation-1 custom-card bdt2': showContent,
                }"
                height="100%"
                color="blue"
                flat
              >
              <span
          >
          <span class="">
            Payment Status:
          </span>
          {{
            getStatusText(
              this.userb &&
                this.userb?.jisajilis &&
                this.userb?.jisajilis[0]?.status
                ? true
                : false,userb?.active
            )
          }}</span
        >
        
        <p v-if="userb?.jisajilis.length > 0">
          <a :href="getFullFilePath(regInfromation?.path_file)" target="_blank">
            <span>{{ "Download Uploaded Receipt" }}</span>

          </a>
        </p>
              <!-- <v-card
                @click="toggleContent"
                :class="{
                  'content-visible elevation-1 custom-card bdt2': showContent,
                }"
                height="100%"
                color="blue"
                flat
              > -->
                <!-- <h4 class="white--text pa-5">
                  <strong>
                    {{ peviewStatement }}
                  </strong>
                </h4> -->

                <div
                  class="v-card v-sheet theme--dark rounded-0"
                  style="background-color: rgba(0, 0, 0, 0.418)"
                >
                  <!-- Business Card Header -->
                  <v-card-title class="text-h6 text-center mb-4">
                    <!-- Business Card -->
                  </v-card-title>

                  <!-- Business Card Content -->
                  <v-card-text class="">
                    <!-- Company Logo -->
                    <v-card-actions class="pt-n8 pb-5 pr-5 d-none d-md-flex">

                    <v-img
                      :src="userx"
                      alt="User Photo"
                      max-width="10%"
                      height=""
                      class="align-start elevation-10"
                    ></v-img>
                    <v-spacer></v-spacer>
                    
                    <span class="text-h6 white--text pt-10">
                      <qrcode :value="userb?.user_identification" :options="{ width: 100 }" ref="qrcode">
                      </qrcode>
                      <p>
                        <button @click="downloadQRCode">Download QR Code</button>

                      </p>
                      </span>
                     
                    </v-card-actions>

                    <v-card-actions class="pt-n8 pb-5 pr-5 d-none d-md-flex">
                      
                      <h2 class="text-h5 white--text">
                        <strong>
                          {{ userb?.salutation }} {{ "" }}
                          {{ userb?.first_name }} {{ " "
                          }}{{ userb?.last_name }}
                        </strong>
                      </h2>
                      
                      <v-spacer></v-spacer>
                      <h2 class="text-h6 white--text">
                        <strong class="text-uppercase">
                          <span class="grey--text">
                            {{ "REGISTRATION GROUP" }}
                          </span>{{ " : " }} {{ userb?.group }}
                        </strong>
                      </h2>
                        
                      
                    </v-card-actions>
                    <v-card-actions class="pt-n8 pb-5 pr-5 d-md-none">
                      <v-img
                      :src="userx"
                      alt="User Photo"
                      max-width="10%"
                      height=""
                      class="align-start elevation-10"
                    ></v-img>
                      <v-spacer></v-spacer>
                      <span class="text-h6 white--text pt-10">
                      <qrcode :value="userb?.user_identification" :options="{ width: 100 }" ref="qrcode">
                      </qrcode>
                      <p>
                        <button @click="downloadQRCode">Download QR Code</button>

                      </p>
                      </span>
                    </v-card-actions>

                    <!-- Company Information -->
                    <div class="text-start">
                      <p>
                        <span class="text-h7 white--text d-md-none">
                        <h2 class="white--text">
                          <strong>
                          {{ userb?.salutation }} {{ "" }}
                          {{ userb?.first_name }} {{ " "
                          }}{{ userb?.last_name }}
                        </strong>
                        </h2>
                      </span>
                      </p>
                      <p>
                        <span class="font-weight-bold 052f69--text">
                          <v-icon color="grey">mdi-office-building</v-icon>

                          {{ "Organization" }}{{ " : " }}
                        </span>
                        <span class="white--text">
                          {{ userb?.organization }}
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold 052f69--text">
                          <v-icon color="grey">mdi-map-marker-outline</v-icon>

                          {{ "Nationality" }}{{ " : " }}
                        </span>
                        <span class="white--text">
                          {{ userb?.country?.name }}
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold 052f69--text">
                          <v-icon color="grey">mdi-phone</v-icon>
                          {{ "Phone" }}{{ " : " }}
                        </span>
                        <span class="white--text">
                          {{ userb?.phone_number }}
                        </span>
                      </p>
                      <p>
                        <span class="font-weight-bold 052f69--text">
                          <v-icon color="grey">mdi-email</v-icon>
                          {{ "Email" }}{{ " : " }}
                        </span>
                        <span class="white--text">
                          {{ userb?.email }}
                        </span>
                      </p>
                    </div>
                  </v-card-text>
                  <!-- Business Card Footer (Image) -->
                  <v-card-actions class="justify-center">
                    <v-img
                      src="/business-card-footer-image.png"
                      alt="Business Card Footer Image"
                      max-width="100%"
                    ></v-img>
                  </v-card-actions>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <!-- <v-list-item>
          <span
            >{{ "Payment Confirmation Date" }}{{ " : " }}
            {{ regInfromation?.createdAt | format() }}</span
          >
        </v-list-item> -->

        <v-divider class="my-3"></v-divider>
      </v-card>
    </v-container>
    <Modal :modal="dialogs.dialog1" :width="1200">
      <template v-slot:header>
        <ModalHeader
          @closeDialog="closeDialog('dialog1')"
          :title="`Update your profile`"
        />
        <!-- {{ userb }} -->
      </template>
      <template v-slot:body>
        <div class="pa-5">
          <v-col cols="12" md="6">
            <v-sheet>
              <p class="text-uppercase">
                <strong>Registered Group:</strong> {{ group }}
              </p>
            </v-sheet>
          </v-col>
          <v-form  @submit.prevent="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12">
            <v-radio-group
            v-if="!userb?.jisajilis.length > 0"
              row
              class="text-center"
              v-model="group"
            >
              <v-radio label="Individual" value="Individual"></v-radio>
              <v-radio label="Booth" value="Booth"></v-radio>
              <v-radio label="Forum" value="Forum"></v-radio>
            </v-radio-group>
                  </v-col>
                <v-col cols="12">
                    <v-select
                      v-if="group === 'Forum'"
                      outlined
                      v-model="subTheme"
                      :items="subThemes"
                      item-text="name"
                      item-value="id"
                      label="Select Forum Sub-Theme"
                      clearable
                      class="align-left-dropdown"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-select
                      v-if="group === 'Booth'"
                      outlined
                      v-model="boothCategory"
                      item-text="name"
                      item-value="code"
                      :items="bCategories"
                      label="Select Booth Categoty"
                    >
                    </v-select>
                  </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-if="group === 'Individual'"
                    outlined
                    v-model="registationcategory"
                    :items="registrationCategories"
                    item-text="name"
                    item-value="id"
                    label="Select Category"
                    clearable
                  >
                  </v-select>
                  <!-- <v-text-field
                      v-else
                      outlined
                      v-model="organization"
                      label="Organization"
                      required
                      @input="updateOrganization"
                    ></v-text-field> -->
                </v-col>

                <!-- item-title="name"-->
                <v-col
                  :cols="group === 'Individual' ? 12 : 12"
                  :md="group === 'Individual' ? 6 : 12"
                >
                  <v-autocomplete
                    outlined
                    v-model="country"
                    :items="countries"
                    color="blue-grey-lighten-2"
                    item-text="name"
                    item-value="id"
                    label="Select Country"
                    clearable
                  >
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" md="12">
                  <v-select
                    outlined
                    v-model="gender"
                    :items="['Male', 'Female']"
                    label="Select Gender"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <!-- Name Fields -->
              <v-row align="center" justify="center">
                <v-col cols="12" md="6">
                  <v-select
                    clearable
                    outlined
                    v-model="salutation"
                    :items="[
                      'Mr.',
                      'Mr.',
                      'Dr.',
                      'Prof.',
                      'Ms',
                      'Miss',
                      'Rev.',
                      'Hon',
                      'Capt',
                      'Sir',
                      'Lord',
                      'Lady.',
                      'Esq.',
                    ]"
                    label=" Select Salutation (e.g Mr/Mr/Dr./Prof etc)"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    outlined
                    v-model="organization"
                    label="Organization"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    outlined
                    v-model="firstname"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="middlename"
                    label="Middle name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="lastname"
                    label="Last name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Email and Phone Number Fields -->
              <v-row align="center" justify="center">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    outlined
                    required
                    ref="email"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="phoneNumber"
                    label="Phone Number"
                    outlined
                    required
                    ref="phone_number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="username"
                    label="User Name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Description Field -->
              <v-row align="center" justify="center">
                <v-col cols="12" md="12">
                  <v-textarea
                    outlined
                    v-model="description"
                    label="Description"
                    placeholder="Enter your description here..."
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </template>
      <template v-slot:footer>
        <ModalFooter>
          <v-btn block large type="submit" color="primary" @click="postData"
            >UPDATE</v-btn
          >
        </ModalFooter>
      </template>
    </Modal>
    <Modal :modal="openDialogForm" :width="600">
      <template v-slot:header>
        <ModalHeader @closeDialog="closeDialog()" :title="`Payment Document`" />
      </template>
      <template v-slot:body>
        <div class="pa-5" v-if="formData2">
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
                    placeholder="Attach Payment Receipt"
                    filled
                    outlined
                    :show-size="1000"
                    accept="application/pdf"
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
          <v-btn color="green darken-1" text @click="save">{{ "Save" }} </v-btn>
        </ModalFooter>
      </template>
    </Modal>

    <v-dialog v-model="showPayment" max-width="700">
      <v-card>
        <ModalHeader @closeDialog="closeDialog()" :title="`Complete Payment`" />

        <div class="pa-8">
          <p>Dear User,</p>
          <p>
            Thank you for registering with our system. To complete your
            registration, please follow these steps:
          </p>
          <ol>
            <li>
              Make a payment corresponding to the registration category you
              selected.
            </li>
            <li>Upload the payment receipt from your bank to our system.</li>
          </ol>
          <p>
            <p>
              <span class="warning--text">
              {{
                "All payment for the conference should be made to the following Bank details, and an appropriate receipt uploaded while log in your registration account:"
              }}.

              <span class="font-weight-bold green--text"
                >CPS misc Dep. Exp. Elecronic A/C 9921169777 Bank name
                BOT.</span
              >
            </span>
            </p>
            <p>
              <small class=" pl-0">
                If you have any questions or need assistance, please contact our
              support team.
            </small>
            <span class="font-weight-bold">
              +255 655 879 449
            </span>
            </p>
          </p>
        </div>

        <ModalFooter> </ModalFooter>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showWaitingApproval" max-width="700">
      <v-card>
        <ModalHeader @closeDialog="closeDialog()" :title="`Waiting for approval`" />

        <div class="pa-8">
          <p>Dear User,</p>
          <p>
            Thank you for completing your registration. Please be patient while waiting for approval.:
          </p>
        </div>

        <ModalFooter> </ModalFooter>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { uploadFile, saveRegistration, getRegInfo,getSubthemes } from "./services";
import QRCode from 'qrcode';

import {
  registerUser,
  updateUser,
  getCountries,
  getRegistrationCategories,
} from "../services";
import { printReportJasper } from "../../components/report/services/report.services";
// import QrcodeVue from 'qrcode.vue';

// import ConferenceRegistration from "../Authentication.vue";

export default {
  name: "UserProfile",
  components: {
    // QrcodeVue  
    },
  data() {
    return {
      xxx: 'https://example.com',
      size: 300,
      bCategories: [
        {
          id: 1,
          name: "Category One",
          code: "C1",
        },
        {
          id: 2,
          name: "Category Two",
          code: "C2",
        },
        {
          id: 3,
          name: "Category Three",
          code: "C3",
        },
      ],
      subThemes: [],
      peviewStatement: "SHOW YOUR PROFILE TO GET YOUR ID CARD",
      showPayment: false,
      showWaitingApproval: false,
      userx: "/user.jpeg",
      user: null,
      userb: null,
      openDialogForm: false,
      formData2: { path_file: "", userId: "" },
      regInfromation: "",
      dialogs: {
        dialog1: false,
      },
      country: "",
      registationcategory: "",
      gender: "",
      boothCategory: null,
      first_name: "",
      lastname: "",
      middlename: "",
      firstname: "",
      middle_name: "",
      last_name: "",
      email: "",
      phoneNumber: "",
      username: "",
      countries: [],
      group: "",
      description: "",
      salutation: "",
      organization: "",
      showContent: true,
      showContentQR: false,
    };
  },
  mounted() {

    this.getUserFromLocalStorage();

    // Retrieve user from local storage when the component is mounted
    if (this.userb?.jisajilis.length > 0) {
      this.getUserRegistrationInfo();
    }
    this.fetchCountries();
  },
  methods: {
    async downloadQRCode() {
  try {
    if (!this.userb?.user_identification) {
      throw new Error('Invalid user identification data');
    }

    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, this.userb.user_identification, { width: 400, height: 400 });

    const url = canvas.toDataURL('image/png');
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Failed to download QR code:', error);
  }
},
   
  
     printFromServer () {
    const params = {
      user_id:this.userb.id
    };
    printReportJasper("invoice", params);
  },

    toggleContent() {
      if (this.userb?.active&&this.userb?.jisajilis.length > 0) {
        this.showContent = !this.showContent;
        if (this.showContent) {
          // this.peviewStatement = "HIDE PROFILE";
        } else {
          // this.peviewStatement = "SHOW YOUR PROFILE TO GET YOUR ID CARD";
        }
      }
      else if (!this.userb?.active&&this.userb?.jisajilis.length > 0) {
        this.showWaitingApproval = true;
      }
      
      else {
        this.showPayment = true;
      }
    },
    toggleQRContent() {
      if (this.userb?.active&&this.userb?.jisajilis.length > 0) {
        this.showContentQR = !this.showContentQR;
        // if (this.showContentQR) {
        //   this.peviewStatement = "HIDE PROFILE";
        // } else {
        //   this.peviewStatement = "SHOW YOUR PROFILE TO GET YOUR ID CARD";
        // }
      }
      else if (!this.userb?.active&&this.userb?.jisajilis.length > 0) {
        this.showWaitingApproval = true;
      }
      
      else {
        this.showPayment = true;
      }
    },

    fetchCountries() {
      getCountries().then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.countries = response.data;
        }
      });
      getRegistrationCategories().then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.registrationCategories = response.data; // Update this line
        }
      });
      getSubthemes().then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.subThemes = response.data; // Update this line
        }
      });
    },
    getStatusText(status,activation) {
      console.log("status", activation);
      if (status == false) {
        return "You have not uploaded any payment document yet.";
      } else if (status == true&&!activation) {
        return "Submitted. Waiting for approval.";
      }else if (status == true&&activation) {
        return "Approved";
      }
       else {
        return ""; // or any other default value you want for null status
      }
    },

    getFullFilePath(path) {
      // Assuming "uploads/path_file" is the prefix
      return `uploads/${path}`;
    },

    getUserFromLocalStorage() {
      console.log("set user");
      // Get the user data from local storage
      const userJson = localStorage.getItem("GRM_USER");

      // Parse the JSON data
      if (userJson) {
        console.log("set user");

        this.userb = JSON.parse(userJson);
      }
    },

    getUserRegistrationInfo() {
      const regSearchTerm = this.userb.id;
      getRegInfo({ regSearchTerm }).then((response) => {
        this.regInfromation = response.data;
      });
    },
    openDialog() {
      this.openDialogForm = true;
    },
    closeDialog() {
      this.dialogs.dialog1 = false;
      this.openDialogForm = false;
      this.showPayment = false;
      this.showWaitingApproval = false;
    },
    openUpdateDialog(userb) {
      this.dialogs.dialog1 = true;
      this.country = userb.country;
      this.registationcategory = userb.registationcategory;
      this.gender = userb.sex;
      this.boothCategory = userb.boothCategory;
      this.firstname = userb.first_name;
      this.middlename = userb.middle_name;
      this.lastname = userb.last_name;
      this.email = userb.email;
      this.phoneNumber = userb.phone_number;
      this.username = userb.username;
      this.subTheme = userb.subTheme;
      this.group = userb.group;
      this.description = userb.description;
      this.salutation = userb.salutation;
      this.organization = userb.organization;
    },

    async postData() {
      try {
        const response = await updateUser({
          id: this.userb.id,
          country: this.country,
          registationcategory: this.registationcategory,
          sex: this.gender,
          first_name: this.firstname,
          middle_name: this.middlename,
          last_name: this.lastname,
          email: this.email,
          phone_number: this.phoneNumber,
          username: this.username,
          group: this.group,
          description: this.description,
          boothCategory: this.boothCategory,
          salutation: this.salutation,
          subTheme: this.subTheme,
          organization: this.organization,
          // Add more key-value pairs as needed
        });

        if (response.status >= 200 && response.status < 300) {
          this.dialogs.dialog1 = false;
          this.userb = response.data.updatedUser;
          console.log("response.data", response.data);
          // localStorage.setItem("GRM_USER", JSON.stringify(this.userb));
        }
      } catch (error) {
        this.dialogs.dialog1 = false;
        // Handle errors if any
        console.error("Error posting data:", error);
      }
    },
    cancelDialog() {
      this.openDialogForm = false;
    },
    save() {
      console.log("formData", this.formData);
      this.openDialogForm = false;

      saveRegistration(this.formData2).then((response) => {
        // console.log("response:", response);
        this.getUserRegistrationInfo();
        this.openDialogForm = false;
        this.formData2 = { path_file: "", userId: "" };
      });
    },

  saveFile(file) {
  if (file) {
    // Check if file size exceeds 1MB
    if (file.size > 1024 * 1024) {
      alert("File size exceeds 1MB. Please select a smaller file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    uploadFile(formData).then((response) => {
      console.log("response:", response);
      const fileInfo = {
        file_path: response.data.current_name,
      };
      console.log("path:", this.formData2);
      this.formData2.path_file = response.data.current_name;
      this.formData2.userId = this.userb.id;
      this.formData2.status = true;
      //remove duplicates but keep the last updated score!
      // data.formData.files.reverse();
      // data.formData.files = _.uniqBy(data.formData2, "current_name");
      // this.loading2 = false;
    });
  }
},

    // saveFile(file) {
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     uploadFile(formData).then((response) => {
    //       console.log("response:", response);
    //       const fileInfo = {
    //         file_path: response.data.current_name,
    //       };
    //       console.log("path:", this.formData2);
    //       this.formData2.path_file = response.data.current_name;
    //       this.formData2.userId = this.userb.id;
    //       this.formData2.status = true;
    //       //remove duplicates but keep the last updated score!
    //       // data.formData.files.reverse();
    //       // data.formData.files = _.uniqBy(data.formData2, "current_name");
    //       // this.loading2 = false;
    //     });
    //   }
    // },
  },
};
</script>
<style scoped>
.content-visible .v-card__text {
  display: block !important;
}

.v-card__text {
  display: none;
}
</style>

<style scoped>
.centered-line2 {
  width: 100%;
  border: 3px solid rgb(26, 86, 182); /* Adjust thickness as needed */
  margin: 0px auto; /* Adjust as needed */
}
.custom-card {
  background-image: url(/bg.jpg) !important;
  background-size: cover; /* Ensures the image covers the entire card */
  background-position: center; /* Centers the image within the card */
  color: white; /* Set the text color to white or another contrasting color */
}
.bdt {
  border-top: solid 5px #96a60890;
}
.bdt2 {
  border-top: solid 2px #052f694d !important;
}
/* Add your custom styles here to make it visually appealing */
</style>
