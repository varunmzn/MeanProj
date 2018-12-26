<template>
    <section>
        <b-row align="left">
            <b-col><h2 class="header text-left">User Account</h2></b-col>
        </b-row>
        <div class="row" v-if="dataLoaded">
            <div class="col-7">
                <b-card class="text-left">
                    <div class="capitalize subtle float-right smalltext" style="padding-top: 8px">{{ payload['cognito:groups'][0] }}</div>
                    <h2>
                        <icon name="star" scale="1.5" /> {{ payload['cognito:username'] }}                          
                    </h2>
                    
                    <div class="w-100" style="height: 15px"></div>
                    <b-row>
                        <b-col cols="5">
                            <label>First Name</label>
                            <input class="form-control" v-model="user.given_name">
                        </b-col>
                        <b-col cols="7">
                            <label>Last Name</label>
                            <input class="form-control" v-model="user.family_name">
                        </b-col>
                    </b-row>
                    <div class="w-100" style="height: 35px"></div>
                    <b-row>
                        <b-col cols="5">
                            <label>Phone</label>
                            <input class="form-control" v-model="user.phone_number">
                        </b-col>
                        <b-col cols="7">
                            <label>Email Address</label>
                            <input class="form-control" v-model="user.email">
                        </b-col>
                    </b-row>    
                    <div class="w-100" style="height: 25px"></div>                
                </b-card>
            </div>
            <div class="col text-left">
                <b-card>
                    <b-row>                      
                        <b-col cols="9" v-if="!payload['custom:client_id']">
                            <label>GoldQuest Client</label>
                            <input class="form-control" v-model="user['custom:client_id']">
                            <div class="w-100" style="height: 35px"></div>
                        </b-col>                       
                        <b-col cols="9">
                            <label>User Store</label>
                            <div class="input-group">
                                <select  class="form-control custom-select" v-model="user['custom:store_id']">
                                    <option value="">- Unassigned -</option>
                                    <option :value="store.id" v-for="store in storeInfo" v-bind:key="store.id">{{ store.name | capitalize }}</option>
                                </select>
                            </div>
                        </b-col>
                        <div class="w-100" style="height: 35px"></div>
                        <b-col cols="9">
                            <label>Additional Store Access</label>
                            <div v-for="store in storeInfo" v-bind:key="store.id" v-if="store.id != user['custom:store_id']" style="padding: 5px 0">
                                <input type="checkbox" :value="store.id" v-model="user.store_access"> {{ store.name | capitalize }}
                            </div>
                        </b-col>
                    </b-row>
                </b-card>
                <b-row>
                    <b-col class="text-right" style="padding: 60px 15px 0">
                        <b-button variant="default" @click="$router.push('/')" style="margin-right: 10px">Cancel</b-button>
                        <b-button size="md" :variant="(payload.aud) ? 'info' :'warning'" :disabled="btnDisabled" @click="saveUser()">
                            {{ (payload.aud) ? 'Update' : 'Add' }} Account
                        </b-button>
                    </b-col>
                </b-row>
            </div>
        </div>
    </section>
</template>
<script>
import moment from "moment";
import { Auth } from "aws-amplify";
import dataResource from "@/utils/resources";
export default {
  props: ["payload"],
  created() {
    this.getUser();
    this.getStores();
  },
  computed: {
    btnDisabled() {
      return (
        !this.payload ||
        !this.user.given_name ||
        !this.user.family_name ||
        !this.user.email
      );
    }
  },
  data() {
    return {
      user: {},
      updated: false,
      dataLoaded: false,
      storeInfo: []
    };
  },
  methods: {
    getStores() {
      return dataResource.API.get("/stores")
        .then(response => {
          this.storeInfo = response.data;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    getUser() {
      Auth.currentAuthenticatedUser().then(cognitoUser => {
        this.user = cognitoUser.attributes;
        this.user["custom:client_id"] = 5; //set default client
        this.user.store_access = (this.user["custom:store_access"]) ? this.user["custom:store_access"].split(',') : []; 
        this.dataLoaded = true;
      });
    },
    saveUser() {
      let phone = (!this.user.phone_number.includes('+1')) ? '+1' + this.user.phone_number.replace(/\D/g,'') : this.user.phone_number;  
      let attributes = {
        email: this.user.email,
        given_name: this.user.given_name,
        family_name: this.user.family_name,
        phone_number: phone,
        "custom:store_id": this.user["custom:store_id"].toString(),
        "custom:store_access": this.user.store_access.join(),
        "custom:client_id": this.user["custom:client_id"].toString()
      };

      Auth.currentAuthenticatedUser()
        .then(user => {
          Auth.updateUserAttributes(user, attributes)
            .then(user => { 
                this.updated = true;
                this.$toasted.success('Account Information Updated', { duration: 3500, position: 'top-center' });
                this.getUser(); 
            })
            .catch(err => {
                this.$toasted.error(err.message, { duration: 4500, position: 'top-center' });
            });
        })
        .catch(err => (this.alertMsg = err.message));
    }
  }
};
</script>