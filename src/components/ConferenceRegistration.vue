<template>
  <v-container class="mt-6">
    <v-col cols="12">
      <h1 class="text-center mb-1 color-title">Select Category to Register</h1>
      <hr class="centered-line" />
      <v-divider class="mb-5"></v-divider>
    </v-col>
    <v-card flat>
      <v-row>
        <v-card-text class="">
          <v-row justify="center">
            <h4>Registration Group</h4>
          </v-row>
          <v-row justify="center">
            <v-radio-group
              @change="openDialog('dialog1')"
              row
              class="text-center"
              v-model="group"
            >
              <v-radio label="Individual" value="Individual"></v-radio>
              <v-radio label="Booth" value="Booth"></v-radio>
              <v-radio label="Forum" value="Forum"></v-radio>
            </v-radio-group>
          </v-row>
          <v-alert text outlined color="deep-orange" icon="mdi-information">
            {{
              "All payment for the conference should be made to the following Bank details, and an appropriate receipt uploaded while log in your registration account:"
            }}.

            <span class="font-weight-bold green--text"
              >CPS misc Dep. Exp. Elecronic A/C 9921169777 Bank name BOT.</span
            >
          </v-alert>
        </v-card-text>
      </v-row>
      <v-container>
        <v-data-table
          :headers="tableHeaders"
          :items="tableData"
          :search="search"
        ></v-data-table>
        <!-- <v-data-table :items="tableData" :headers="tableHeaders">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.sno }}</td>
                <td>{{ item.categoryName }}</td>
                <td>{{ item.fees }}</td>
                <td>{{ item.fees2 }}</td>
                <td>
                  <v-btn
                    class="ma-1"
                    color="blue-grey darken-3"
                    plain
                    @click="openDialog(item.dialogName)"
                  >
                    View Details
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table> -->
      </v-container>
      <Modal :modal="dialogs.dialog1" :width="1200">
        <template v-slot:header>
          <ModalHeader
            @closeDialog="closeDialog('dialog1')"
            :title="`Registration Form`"
          />
        </template>
        <template v-slot:body>
          <ModalBody>
            <v-col cols="12" md="6">
              <v-sheet>
                <p class="text-uppercase">
                  <strong>SELECTED GROUP:</strong> {{ group }}
                </p>
              </v-sheet>
            </v-col>
            <v-form v-model="valid" @submit.prevent="submitForm">
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-select
                      v-if="group === 'Individual'"
                      outlined
                      v-model="category"
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
                      :rules="nameRules"
                      label="Organization"
                      required
                      @input="updateOrganization"
                    ></v-text-field> -->
                  </v-col>

                  <!-- item-title="name"-->
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
                  <v-col
                    :cols="group === 'Individual' ? 12 : 12"
                    :md="group === 'Individual' ? 12 : 12"
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
                      :rules="nameRules"
                      label="Organization"
                      required
                      @input="updateOrganization"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      outlined
                      v-model="firstname"
                      :rules="nameRules"
                      label="First name"
                      required
                      @input="updateFirstName"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="middlename"
                      :rules="nameRules"
                      label="Middle name"
                      required
                      outlined
                      @input="updateMiddleName"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="lastname"
                      :rules="nameRules"
                      label="Last name"
                      required
                      outlined
                      @input="updateLastName"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Email and Phone Number Fields -->
                <v-row align="center" justify="center">
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      outlined
                      required
                      @input="updateEmail"
                      ref="email"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="phoneNumber"
                      :rules="phoneRules"
                      label="Phone Number"
                      @input="formatPhoneNumber"
                      outlined
                      required
                      ref="phone_number"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="username"
                      :rules="nameRules"
                      label="User Name"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      outlined
                      required
                      type="password"
                      ref="password"
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
          </ModalBody>
        </template>
        <template v-slot:footer>
          <ModalFooter>
            <v-btn color="info" @click="resetForm">Reset</v-btn>
            <v-btn type="submit" color="primary" @click="postData"
              >Submit</v-btn
            >
          </ModalFooter>
        </template>
      </Modal>

      <v-dialog v-model="dialogs.dialog2" max-width="500">
        <v-card>
          <v-card-title style="background-color: #d1d4d4">
            Package Details
            <!--            <v-btn icon @click="closeDialog('dialog1')">-->
            <!--              <v-icon>mdi-close</v-icon>-->
            <!--            </v-btn>-->
          </v-card-title>

          <v-card-text>
            <!-- Content of Dialog 1 goes here -->
            <ol>
              <li>Trophy and certificate</li>
              <li>
                Inclusion of the organization logo in the official banner for
                sponsors
              </li>
              <li>
                Display of advert and a short clip of the organization’s
                services in the registration portal and conference screens
              </li>
              <li>Free participation of 4 representatives</li>
              <li>2 Minutes talk, in the Main Hall, about their businesses</li>
              <li>2 Booths</li>
            </ol>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="closeDialog('dialog2')">Close</v-btn>
            <!--            <v-btn color="primary" @click="performAction('dialog2')">Perform Action</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogs.dialog3" max-width="500">
        <v-card>
          <v-card-title style="background-color: #d1d4d4">
            Package Details
          </v-card-title>

          <v-card-text>
            <!-- Content of Dialog 1 goes here -->
            <ol>
              <li>Trophy and certificate</li>
              <li>
                Inclusion of the organization logo in the official banner for
                sponsors
              </li>
              <li>
                Display of advert and a short clip of the organization’s
                services in the registration portal and conference screens
              </li>
              <li>Free participation of 4 representatives</li>
              <li>2 Minutes talk, in the Main Hall, about their businesses</li>
              <li>2 Booths</li>
            </ol>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="closeDialog('dialog3')">Close</v-btn>
            <!--            <v-btn color="primary" @click="performAction('dialog2')">Perform Action</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogs.dialog4" max-width="500">
        <v-card>
          <v-card-title style="background-color: #d1d4d4">
            Package Details
            <!--            <v-btn icon @click="closeDialog('dialog1')">-->
            <!--              <v-icon>mdi-close</v-icon>-->
            <!--            </v-btn>-->
          </v-card-title>

          <v-card-text>
            <!-- Content of Dialog 1 goes here -->
            <ol>
              <li>Trophy and certificate</li>
              <li>
                Inclusion of the organization logo in the official banner for
                sponsors
              </li>
              <li>
                Display of advert and a short clip of the organization’s
                services in the registration portal and conference screens
              </li>
              <li>Free participation of 4 representatives</li>
              <li>2 Minutes talk, in the Main Hall, about their businesses</li>
              <li>2 Booths</li>
            </ol>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="closeDialog('dialog4')">Close</v-btn>
            <!--            <v-btn color="primary" @click="performAction('dialog2')">Perform Action</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogs.dialog5" max-width="500">
        <v-card>
          <v-card-title style="background-color: #d1d4d4">
            Package Details
            <!--            <v-btn icon @click="closeDialog('dialog1')">-->
            <!--              <v-icon>mdi-close</v-icon>-->
            <!--            </v-btn>-->
          </v-card-title>

          <v-card-text>
            <!-- Content of Dialog 1 goes here -->
            <ol>
              <li>Trophy and certificate</li>
              <li>
                Inclusion of the organization logo in the official banner for
                sponsors
              </li>
              <li>
                Display of advert and a short clip of the organization’s
                services in the registration portal and conference screens
              </li>
              <li>Free participation of 4 representatives</li>
              <li>2 Minutes talk, in the Main Hall, about their businesses</li>
              <li>2 Booths</li>
            </ol>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="closeDialog('dialog5')">Close</v-btn>
            <!--            <v-btn color="primary" @click="performAction('dialog2')">Perform Action</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogs.dialog6" max-width="500">
        <v-card>
          <v-card-title style="background-color: #d1d4d4">
            Package Details
            <!--            <v-btn icon @click="closeDialog('dialog1')">-->
            <!--              <v-icon>mdi-close</v-icon>-->
            <!--            </v-btn>-->
          </v-card-title>

          <v-card-text>
            <!-- Content of Dialog 1 goes here -->
            <ol>
              <li>Trophy and certificate</li>
              <li>
                Inclusion of the organization logo in the official banner for
                sponsors
              </li>
              <li>
                Display of advert and a short clip of the organization’s
                services in the registration portal and conference screens
              </li>
              <li>Free participation of 4 representatives</li>
              <li>2 Minutes talk, in the Main Hall, about their businesses</li>
              <li>2 Booths</li>
            </ol>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="closeDialog('dialog6')">Close</v-btn>
            <!--            <v-btn color="primary" @click="performAction('dialog2')">Perform Action</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogs.dialog7" max-width="500">
        <v-card>
          <v-card-title style="background-color: #d1d4d4">
            Package Details
            <!--            <v-btn icon @click="closeDialog('dialog1')">-->
            <!--              <v-icon>mdi-close</v-icon>-->
            <!--            </v-btn>-->
          </v-card-title>

          <v-card-text>
            <!-- Content of Dialog 1 goes here -->
            <ol>
              <li>Trophy and certificate</li>
              <li>
                Inclusion of the organization logo in the official banner for
                sponsors
              </li>
              <li>
                Display of advert and a short clip of the organization’s
                services in the registration portal and conference screens
              </li>
              <li>Free participation of 4 representatives</li>
              <li>2 Minutes talk, in the Main Hall, about their businesses</li>
              <li>2 Booths</li>
            </ol>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="closeDialog('dialog7')">Close</v-btn>
            <!--            <v-btn color="primary" @click="performAction('dialog2')">Perform Action</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";

import axios from "axios";
import {
  registerUser,
  getCountries,
  getRegistrationCategories,
  getSubthemes,
} from "./services";

export default {
  data() {
    return {
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
      tableData: [
        {
          sno: 1,
          categoryName: "Student",
          fees: "Tshs 50,000",
          fees2: "Tshs 60,000",
          dialogName: "dialog2",
          Benefit_Packages: "Conference Registration and meals)",
        },
        {
          sno: 2,
          categoryName: "Local Resident",
          fees: "Tshs 120,000",
          fees2: "Tshs 200,000",
          dialogName: "dialog3",
          Benefit_Packages: "Conference Registration and meals)",
        },
        {
          sno: 3,
          categoryName: "International Delegate from East Africa",
          fees: "100 USD",
          fees2: "120 USD",
          dialogName: "dialog4",
          Benefit_Packages: "Conference Registration and meals)",
        },
        {
          sno: 4,
          categoryName: "Other international delegate",
          fees: "200 USD",
          fees2: "250 USD",
          dialogName: "dialog4",
          Benefit_Packages: "Conference Registration and meals)",
        },
        {
          sno: 5,
          categoryName:
            "Forum (Please communicate with organizer first to secure a slot)",
          fees: "5000 USD - A one hour and 30 minutes slot for the forum of your interest",
          fees2:
            "5000 USD - A one hour and 30 minutes slot for the forum of your",
          dialogName: "dialog5",
          Benefit_Packages: "Free participation of 10 delegates)",
        },
        {
          sno: 6,
          categoryName:
            "Booth(Category A) NB: Please communicate with organizer first to secure a slot.",
          fees: "800 USD",
          fees2: "800 USD",
          dialogName: "dialog5",
          Benefit_Packages: "At the front",
        },
        {
          sno: 6,
          categoryName:
            "Booth(Category B) NB: Please communicate with organizer first to secure a slot.",
          fees: "500 USD",
          fees2: "500 USD",
          dialogName: "dialog5",
          Benefit_Packages: "At the middle",
        },
        {
          sno: 7,
          categoryName:
            "Booth(Category C) NB: Please communicate with organizer first to secure a slot.",
          fees: "300 USD",
          fees2: "300 USD",
          dialogName: "dialog5",
          Benefit_Packages: "At the rear",
        },
      ],
      tableHeaders: [
        { text: "S/No", value: "sno" },
        { text: "Category Name", value: "categoryName" },
        { text: "Early Payment (up to 15th March 2024)", value: "fees" },
        { text: "Late registration (From 16th March 2024)", value: "fees2" },
        { text: "Benefit Packages ", value: "Benefit_Packages" },
        // { text: "Actions", value: "actions" },
      ],
      fetchedData: null,
      registrationCategories: [],
      countries: [],
      // postData: null,
      dialogs: {
        dialog1: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        dialog6: false,
        dialog7: false,
      },
      subThemes: [],

      valid: true,
      inline: true,
      selectedOption: null,
      // modalVisible: false,
      country: null,
      category: null,
      salutation: null,
      group: null,
      organization: null,
      gender: null,
      boothCategory: null,
      selectedGender: null,
      selectedCategoryItem: null,
      column: null,
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
        (v) => /\d/.test(v) || "Password must contain at least one digit",
        (v) =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase letter",
        (v) =>
          /[a-z]/.test(v) ||
          "Password must contain at least one lowercase letter",
      ],
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      phoneNumber: "",
      username: "",
      phoneRules: [(v) => !!v || "Phone number is required"],
      description: "",
      nameRules: [],
    };
  },

  created() {
    Vue.nextTick(() => {
      // This will be executed after the DOM has been updated
      window.scrollTo(0, 0); // Scroll to the top
    });
    this.fetchCountries();
  },
  methods: {
    updateOrganization(value) {
      this.organization = value.toUpperCase();
    },
    updateEmail(value) {
      this.email = value.toLowerCase();
    },
    updateMiddleName(value) {
      this.middlename = value.toUpperCase();
    },
    updateFirstName(value) {
      this.firstname = value.toUpperCase();
    },
    updateLastName(value) {
      this.lastname = value.toUpperCase();
    },
    async postData() {
      try {
        const response = await registerUser({
          country: this.country,
          registationcategory: this.category,
          sex: this.gender,
          first_name: this.firstname,
          middle_name: this.middlename,
          last_name: this.lastname,
          email: this.email,
          password: this.password,
          phone_number: this.phoneNumber,
          username: this.username,
          group: this.group,
          boothCategory: this.boothCategory,
          description: this.description,
          salutation: this.salutation,
          organization: this.organization,
          // Add more key-value pairs as needed
        });
        console.log("MXXXXXXXXXXXXXXXXXXXXXXXX", response.data.user);

        if (
          response.status >= 200 &&
          response.status < 300 &&
          response.data.user == null
        ) {
          console.log("message", response.data.user);
        } else {
          this.dialogs.dialog1 = false;
          this.resetForm();
        }
      } catch (error) {
        // Handle errors if any
        // console.error("Error posting data:", error);
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

    openDialog(dialogName) {
      console.log("mmm", dialogName);

      this.dialogs[dialogName] = true;
    },

    closeDialog(dialogName) {
      this.dialogs[dialogName] = false;
      this.group = "";
      this.resetForm();
    },

    performAction(dialogName) {
      // Logic for performing an action when a button in the dialog is clicked
      console.log(`Action performed in ${dialogName}`);
    },
    submitForm() {
      // Your form submission logic here
    },
    resetForm() {
      // Reset form fields
      this.country = "";
      this.category = "";
      this.gender = "";
      this.firstname = "";
      this.middlename = "";
      this.lastname = "";
      this.email = "";
      this.password = "";
      this.phoneNumber = "";
      this.username = "";
      this.description = "";
      this.boothCategory = "";
      this.salutation = "";
      this.group = "";
      this.organization = "";
      // Reset validation state if using validation
      this.$refs.submitForm?.resetValidation(); // Replace "form" with the ref attribute of your form element
      this.clearValidationErrors();
    },

    clearValidationErrors() {
      // Iterate over your form fields and reset validation for each field
      ["email"].forEach((fieldName) => {
        const field = this.$refs[fieldName];
        if (field && field.reset) {
          field.reset(); // Reset the validation for the field
        }
      });
      ["phone_number"].forEach((fieldName) => {
        const field = this.$refs[fieldName];
        if (field && field.reset) {
          field.reset(); // Reset the validation for the field
        }
      });
      ["password"].forEach((fieldName) => {
        const field = this.$refs[fieldName];
        if (field && field.reset) {
          field.reset(); // Reset the validation for the field
        }
      });
    },
    clearSelection() {
      this.category = null;
    },
    cancelForm() {
      // Handle cancel logic
      this.dialog = false;
    },
    formatPhoneNumber() {
      // Handle phone number formatting logic
    },
  },
};
</script>
<style>
/* Add your custom styles here */
.color-title {
  color: grey;
  /* background-color: rgb(242, 242, 242); */
}
.custom-th {
  /* Add your custom styles for the table header cells */
  padding-right: 1000px; /* Adjust the padding as needed */
  text-align: left;
  /* Add any other styles as needed */
}
td {
  padding-right: 100px;
  text-align: left;
  /*border: 1px solid #ccc;*/
}

.centered-line {
  width: 25%;
  border: 3px solid grey; /* Adjust thickness as needed */
  margin: 8px auto; /* Adjust as needed */
}
</style>
