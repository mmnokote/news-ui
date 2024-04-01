<template>
  <div>
    <p v-if="token">Registration token: {{ token }}</p>
    <p v-else>No registration token available.</p>
  </div>
</template>

<script>
// Import app from firebaseConfig.js
import { app } from "@/firebaseConfig.js";

export default {
  data() {
    return {
      token: null,
    };
  },
  mounted() {
    console.log("app", app);

    const messaging = app.messaging(); // Use messaging from app

    messaging
      .requestPermission()
      .then(() => {
        console.log("Notification permission granted.");

        messaging
          .getToken()
          .then((token) => {
            if (token) {
              console.log("Registration token:", token);
              this.token = token;
              // Send the token to your server
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => {
            console.error("An error occurred while retrieving token.", err);
          });
      })
      .catch((err) => {
        console.error("Unable to get permission to notify.", err);
      });

    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then((refreshedToken) => {
          console.log("Token refreshed:", refreshedToken);
          this.token = refreshedToken;
          // Send the refreshed token to your server
        })
        .catch((err) => {
          console.error("Unable to retrieve refreshed token.", err);
        });
    });

    messaging.onMessage((payload) => {
      console.log("Message received:", payload);
      // Customize notification handling here
    });
  },
};
</script>
