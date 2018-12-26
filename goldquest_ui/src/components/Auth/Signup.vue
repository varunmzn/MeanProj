<template>
<div class="d-flex justify-content-center">
    <div class="p-2">
        <div class="card text-left" style="margin-top: 8vh">
            <div class="card-header" style="background: #333"><img src="/static/goldquest-logo.png"></div>
                <div class="card-body">
                    <div v-if="confirmed">
                        <alert
                            :message="alertMsg"
                            :show="alertMsg"
                            :type="alertType"
                            @close="alertMsg = ''">
                        </alert>
                        <p>We sent an email to <b>{{user.email}}</b>.</p>
                        <p>Please check your inbox for a link to verify your account.</p>
                        <p style="margin-top: 24px">Didn't receive an email?<a href="#!" @click.prevent="resendSignUp" style="margin-left: 8px">Resend</a></p>
                        <div class="login-next">
                            <router-link to="/login"><button class="btn btn-primary">Back to Login</button></router-link>
                        </div>
                    </div>
                    <div v-else>
                        <alert
                            :message="alertMsg"
                            :show="alertMsg"
                            @close="alertMsg = ''">
                        </alert>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="username" class="form-control login-input" id="username" v-model="user.username" @keyup.enter="signUp">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control login-input" id="password" v-model="user.password" 
                            @keyup.enter="signUp" @focus="startValidation = true" @blur="startValidation = false">
                        </div>
                        <div class="input-validation slide-validate" :style="{'max-height': !startValidation ? '0' : '100px'}">
                            <div v-for="test in passTests" :class="test.pass() ? 'success' : 'error'" :key="test.name">
                                <icon :name="test.pass() ? 'check' : 'times'" scale=".8" /> {{test.name}}
                            </div>
                        </div>
                        <div class="form-group row" style="margin-top: 20px">
                            <div class="col">
                                <label for="firstname">First Name</label>
                                <input class="form-control login-input" id="firstname" v-model="user.given_name" @keyup.enter="signUp">
                            </div>
                            <div class="col">
                                <label for="lastname">Last Name</label>
                                <input class="form-control login-input" id="lastname" v-model="user.family_name" @keyup.enter="signUp">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control login-input" id="email" v-model="user.email" @keyup.enter="signUp">
                        </div>
                        <button class="btn btn-primary" @click="signUp" :disabled="btnDisabled" style="margin: 15px 0">Create Account</button>
                        <hr />
                        <div class="small text-center">
                            <b>Already have an account?</b> <router-link to="/login">Return to Log In</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Auth } from "aws-amplify";
import Alert from "@/components/_layout/Alert";
export default {
  name: "sign-up",
  components: {
    Alert
  },
  data() {
    return {
      alertMsg: "",
      alertType: "alert-danger",
      confirmed: false,
      user: { password: "", username: "", given_name: "", family_name: "", email: "" },
      passTests: [
        {
          name: "8 Characters Long",
          pass: () => this.user.password.length >= 8
        },
        {
          name: "One Uppercase Letter",
          pass: () => /[A-Z]+/.test(this.user.password)
        },
        {
          name: "One Lowercase Letter",
          pass: () => /[a-z]+/.test(this.user.password)
        },
        {
          name: "One Number",
          pass: () => /[0-9]+/.test(this.user.password)
        },
        {
          name: "One Special Character",
          pass: () => /[^a-zA-Z0-9_-]+/.test(this.user.password)
        }
      ],
      startValidation: false,
      acceptedPass: false
    };
  },
  computed: {
    btnDisabled() {
      return (
        !this.acceptedPass ||
        !this.user.username ||
        !this.user.family_name ||
        !this.user.given_name ||
        !this.user.email
      );
    }
  },
  watch: {
    "user.password"() {
      for (let i = 0; i < this.passTests.length; i++) {
        if (!this.passTests[i].pass()) {
          this.acceptedPass = false;
          return;
        }
      }
      this.acceptedPass = true;
    }
  },
  methods: {
    signUp() {
      if (!this.confirmed && this.acceptedPass) {
        let attributes = {  
          email: this.user.email,
          given_name: this.user.given_name,
          family_name: this.user.family_name
        };
        if (this.user.store_id) {
          attributes["custom:store_id"] = this.user.store_id;
        }
        if (this.user.client_id) {
          attributes["custom:client_id"] = this.user.client_id;
        }
        Auth.signUp({
          username: this.user.username,
          password: this.user.password,
          attributes
        })
          .then(user => (this.confirmed = true))
          .catch(err => (this.alertMsg = err.message));
      }
    },
    resendSignUp() {
      Auth.resendSignUp(this.user.email)
        .then(() => {
          this.alertType = "alert-success";
          this.alertMsg = "Resent!";
        })
        .catch(err => {
          this.alertType = "alert-danger";
          this.alertMsg = err.message;
        });
    }
  }
};
</script>
<style lang="scss">

.input-validation > div {
  font-size: 12px;
}

.input-validation.slide-validate {
  overflow-y: hidden;
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
</style>

