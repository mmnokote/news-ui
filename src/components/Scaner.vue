<template>
  <div class="hello">
    <span v-if="computedApplicant">
      RECOGNIZED AS:
      <span style="color: red">{{ computedApplicant?.fullName || "" }}</span>

      <p>
        ORGANIZATION:
        <span style="color: red">{{
          computedApplicant?.organization || ""
        }}</span>
      </p>
      <p>
        COUNTRY:
        <span style="color: red">{{
          computedApplicant?.country.name || ""
        }}</span>
      </p>
      <p>
        CATEGORY:
        <span style="color: red"
          >{{ computedApplicant?.group || "" }}{{ "-"
          }}{{ computedApplicant?.registationcategory.name }}</span
        >
      </p>
      <div v-if="!uA && !noData" class="text-xs-center pb-5">
        <v-btn @click="flagUser()" x-large round color="primary" dark
          >VERIFY IN A SYSTEAM<v-icon large> mdi-check-decagram </v-icon></v-btn
        >
      </div>
    </span>
    <div v-if="uA" class="text-xs-center pb-5">
      <v-alert dense outlined type="error">
        This Applicant is neither <strong>PAID</strong> nor
        <strong>VERIFIED</strong>
      </v-alert>
      <v-btn @click="flagUserUa()" x-large round color="warning" dark
        >ACTIVATE AND VERIFY IN A SYSTEAM<v-icon large>
          mdi-check-decagram
        </v-icon></v-btn
      >
    </div>
    <img v-if="noData" class="coat" :src="verified" />
    <img v-if="yesData" class="coat" :src="verifiedyes" />

    <span> </span>

    <StreamBarcodeReader
      @decode="(a, b, c) => onDecode(a, b, c)"
      @loaded="() => onLoaded()"
    ></StreamBarcodeReader>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import { sendScnaedData } from "./services"; // Fix the import statement
import { update } from "../../src/components/user/services/user.service";

export default {
  name: "Scaner",
  components: {
    StreamBarcodeReader,
  },
  data() {
    return {
      text: "",
      id: null,
      scannedDataResult: null,
      noData: false,
      yesData: false,
      uA: false,

      verified: "/verified.jpg",
      verifiedyes: "/verifiedok.png",
    };
  },
  computed: {
    computedApplicant() {
      if (this.scannedDataResult) {
        const {
          first_name,
          last_name,
          country,
          organization,
          id,
          group,
          registationcategory,
        } = this.scannedDataResult;
        const fullName = `${first_name} ${last_name}`;
        return {
          fullName,
          country,
          organization,
          id,
          group,
          registationcategory,
        };
      }
      return null;
    },
  },

  props: {
    msg: String,
  },
  methods: {
    flagUser() {
      const payload = {
        id: this.computedApplicant.id,
        verified: true,
      };
      update(payload).then((response) => {
        if (response.status === 200) {
          this.yesData = true;
          cancelDialog();
          initialize();
        }
      });
    },
    flagUserUa() {
      const payload = {
        id: this.computedApplicant.id,
        verified: true,
        active: true,
        mannual: true,
      };
      update(payload).then((response) => {
        if (response.status === 200) {
          this.yesData = true;
          cancelDialog();
          initialize();
        }
      });
    },
    onDecode(decodedValue) {
      console.log("Decoded value:", decodedValue);
      this.text = decodedValue;
      if (this.id) clearTimeout(this.id);
      this.id = setTimeout(() => {
        if (this.text === decodedValue) {
          this.text = "";
          this.scannedDataResult = null;
          this.noData = false;
          this.yesData = false;
          this.uA = false;
        }
      }, 10000);

      // Call a function to send a request to the server with the decoded value as an argument
      this.sendRequest(decodedValue);
    },
    sendRequest(decodedValue) {
      const identification = {
        id: decodedValue,
      };
      // Make an HTTP POST request to the server
      sendScnaedData(identification).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          this.scannedDataResult = response.data.user; // Adjust this according to your response structure
          this.noData = false;
          this.uA = false;
        }
        if (response.data.message == "Applicant already Verified") {
          this.scannedDataResult = response.data.user; // Adjust this according to your response structure
          this.noData = true;
          this.yesData = false;
          this.uA = false;
        }
        if (response.data.message == "UnActivated Applicant") {
          this.scannedDataResult = response.data.user; // Adjust this according to your response structure
          this.noData = false;
          this.yesData = false;
          this.uA = true;
        }
      });
    },
    onLoaded() {
      console.log("load");
    },
  },
};
</script>
<style scoped></style>
