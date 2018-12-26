<template>
    <div class="d-flex justify-content-center">
        <div class="p-2">
            <div class="card text-left" style="margin-top: 15vh">
                <div class="card-header" style="background: #333"><img src="/static/goldquest-logo.png"></div>
                <div class="card-body">

                    <div class="form-group">
                        <label for="email">Username</label>
                        <input type="email" class="form-control login-input" autocomplete="off" v-model="username" @keyup.enter="login">
                        <div class="w-100" style="height: 15px;" />
                        <label for="password">Password</label>
                        <input type="password" class="form-control login-input" autocomplete="off" v-model="password" @keyup="keyMonitor">
                        <span class="caps-warn" v-show="caps">Caps lock is on!</span>
                    </div>
                    <alert
                        :message="alertMsg"
                        :show="alertMsg"
                        :type="alertType"
                        @close="alertMsg = ''">
                    </alert>
                    <button class="btn btn-primary" @click="login" style="margin: 15px 0">Log In</button>
                    <span class="small">
                        <router-link to="/login" style="margin-left: 15px">Forgot your password?</router-link>
                    </span>
                    <hr />
                    <div class="small text-center">
                        <b>New to GoldQuest?</b> <router-link to="/signup">Create account</router-link>
                    </div>                   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dataResource from "@/utils/resources";
import Alert from "@/components/_layout/Alert";
import jwtDecode from "jwt-decode";
import { Auth } from "aws-amplify";

export default {
  name: "Credentials",
  components: { Alert },
  data() {
    return {
      payload: null,
      username: "",
      password: "",
      caps: false,
      alertMsg: "",
      alertType: ""
    };
  },
  created() {
    // Get and remove custom message from localStorage
    this.alertMsg = localStorage.getItem("alertMsg");
    this.alertType = localStorage.getItem("alertType");
    localStorage.removeItem("alertMsg");
    localStorage.removeItem("alertType");
  },
  methods: {
    keyMonitor(event) {
      this.caps = event.getModifierState && event.getModifierState("CapsLock");
      if (event.keyCode === 13) {
        this.login();
      }
    },
    login() {
      this.alertMsg = "";
      if (this.username && this.password) {
        Auth.signIn(this.username, this.password)
          .then(() => {
            // TODO add redirect logic if they came from another page
            this.alertMsg = "";
            dataResource
              .payload()
              .then(payload => (this.payload = payload))
              .catch(errorResponse => {
                // Handle error...
                console.log(errorResponse);
              })
              .finally(this.$router.push("/"));
          })
          .catch(err => {
            this.alertType = "alert-danger";
            this.alertMsg = "Username or password is incorrect.";
          });
      } else {
        this.alertType = "alert-info";
        this.alertMsg = "Enter username and password to log in.";
      }
    }
  }
};
</script>
