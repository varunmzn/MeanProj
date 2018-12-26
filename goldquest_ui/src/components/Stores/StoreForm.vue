<template>
    <section>
        <b-row align="left">
            <b-col>
                <b-row>
                    <b-col>
                        <label>Store Name</label>
                        <input class="form-control" v-model="store.name" style="font-size: 25px">
                    </b-col>
                </b-row>
                <div class="w-100" style="height: 25px"></div>
                <b-row>
                    <b-col cols="8">
                        <label>Street Address</label>
                        <input class="form-control" v-model="store.address_1">
                    </b-col>
                    <b-col cols="3">
                        <label>Unit</label>
                        <input class="form-control" v-model="store.address_2">
                    </b-col>
                </b-row>
                <div class="w-100" style="height: 25px"></div>
                <b-row>
                    <b-col cols="5">
                        <label>City</label>
                        <input class="form-control" v-model="store.city">
                    </b-col>
                    <b-col cols="2">
                        <label>State</label>
                        <input class="form-control" v-model="store.state">
                    </b-col>
                    <b-col cols="4">
                        <label>Zip/Postal Code</label>
                        <input class="form-control" v-model="store.postal_code">
                    </b-col>
                </b-row>
                <div class="w-100" style="height: 25px"></div>
                <hr />
                <b-row>
                    <b-col cols="7">
                        <label>Primary Contact Name</label>
                        <input class="form-control" v-model="store.contact_name">
                    </b-col>
                    <b-col cols="5">
                        <label>Store Phone</label>
                        <input class="form-control" v-model="store.phone">
                    </b-col> 
                </b-row>
                <div class="w-100" style="height: 25px"></div>
                <b-row>
                    <b-col cols="7">
                        <label>Store Email Address</label>
                        <input class="form-control" v-model="store.email">
                    </b-col>
                    <b-col cols="5">
                        <label>Store Fax</label>
                        <input class="form-control" v-model="store.fax">
                    </b-col>
                                      
                </b-row>
            </b-col>
            <b-col cols="6" style="padding-left: 50px">
                <b-row class="sidebar">
                    <b-col cols="6">
                        <label>Store License Number</label>
                        <input class="form-control" v-model="store.license">
                    </b-col>
                    <b-col>
                        <label>Region/Group</label>
                        <b-form-select v-model="store.group" :options="['Eastern', 'Western', 'Southern', 'Northern']" />
                    </b-col>
                    <div class="w-100" style="height: 25px"></div>
                    <b-col order="2">
                        <label>Time Zone</label>
                        <b-form-select v-model="store.timezone" :options="['EST', 'PST', 'CST', 'MT']" />
                    </b-col>
                    <b-col>
                        <label>Weight Unit</label>
                        <b-form-select v-model="store.weight_unit" :options="['grams', 'pennyweight']" />
                    </b-col>

                </b-row>
                <b-row class="sidebar">
                    <b-col cols="4">
                        <label>Payout</label>
                        <b-input-group append="%"><input class="form-control text-right" v-model="store.pay"></b-input-group>
                    </b-col>
                    <b-col cols="4" style="padding-left: 0; padding-right:30px;">
                        <label>Override Limit</label>
                        <b-input-group append="%"><input class="form-control text-right" v-model="store.pmax"></b-input-group>
                    </b-col>
                    <b-col>
                        <b-form-group label="Points System">
                            <b-form-radio-group v-model="store.points_system"
                                                :options="[{ text:'On', value:true}, {text:'Off', value:false}]">
                            </b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="sidebar">   
                    <b-col cols="12"> 
                        <b>Police Reports</b>
                    </b-col>
                    <div class="w-100" style="height: 15px"/> 
                    <b-col cols="8">
                        <label>Email Address</label>                       
                        <input class="form-control" v-model="store.police_email">
                    </b-col>                   
                    <b-col cols="4">
                        <label>Hold Period</label>
                        <b-input-group append="days"><input class="form-control text-right" v-model="store.police_hold"></b-input-group>
                    </b-col>    
                    <div class="w-100" style="height: 25px"/> 
                    <b-col cols="8">
                        <label>Fax Number</label>                       
                        <input class="form-control" v-model="store.police_fax">
                    </b-col>                   
                    <b-col cols="4">
                        <label>Frequency</label>
                        <b-form-select v-model="store.police_frequency" :options="['Monthly', 'Weekly', 'Daily']" />
                    </b-col>                  
                </b-row>
                <b-row class="sidebar">   
                    <b-col cols="12"> 
                        <b>Leads Online</b>
                    </b-col>
                    <div class="w-100" style="height: 15px"/> 
                    <b-col cols="3">
                        <label>Store ID</label>                       
                        <input class="form-control" v-model="store.leads_id">
                    </b-col>                   
                    <b-col style="padding-right: 0">
                        <label>Username</label>
                        <input class="form-control" v-model="store.leads_username">
                    </b-col>    
                    <b-col style="padding-right: 0">
                        <label>Password</label>                       
                        <input class="form-control" v-model="store.leads_password">
                    </b-col>                                   
                </b-row>
            </b-col>
        </b-row>
        <!-- Footer Bar -->
        <div class="sticky-footer d-print-none">
            <div class="container">
                <div class="w-100" style="height: 35px"></div>
                <b-row>
                    <b-col class="text-right">
                        <b-button variant="outline-secondary" @click="cancelAction()" style="margin-right: 20px">cancel</b-button>
                        <b-button :variant="(store.id) ? 'info' :'warning'" :disabled="btnDisabled" @click="saveStore()">
                            <icon name="institution" /> {{ (store.id) ? 'Update' : 'Save New' }} Store</b-button>
                    </b-col>
                </b-row>
            </div>
        </div>
    </section>
</template>
<script>
import dataResource from "@/utils/resources";
export default {
  props: ["storeInfo"],
  created() {
    this.store = this.storeInfo;
    if (this.storeInfo.id) {
      this.store.pmax = this.storeInfo.payout_max * 100;
      this.store.pay = this.storeInfo.payout * 100;
    }
  },
  computed: {
    btnDisabled() {
      return !this.store.name || !this.store.address_1 ? true : false;
    }
  },
  data() {
    return {
      store: {}
    };
  },
  methods: {
    getDays() {
      let days = [];
      let i = 1;
      for (; i <= 31; i++) {
        days.push(i);
      }
      return days;
    },
    getYearsRange(min, range) {
      let years = [];
      let i = min;
      for (; i < min + range; i++) {
        years.push(i);
      }
      return years;
    },
    saveStore() {
      this.store.payout_max = this.store.pmax / 100;
      this.store.payout = this.store.pay / 100;
      var action = this.store.id ? "put" : "post";
      this.doStoreAction(action);
    },
    doStoreAction(action) {
      var path = action == "put" ? "/" + this.store.id : "";

      return dataResource.API[action]("/stores" + path, this.store)
        .then(response => {
          if (action == "put") {
            this.$toasted.success('Store Information Updated', { duration: 3500, position: 'top-center' });   
            this.store = response.data;
            this.store.pmax = this.storeInfo.payout_max * 100;
            this.store.pay = this.storeInfo.payout * 100;
          } else this.$router.push("/admin/stores/" + this.store.id);
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    cancelAction() {
      this.store = {};
      this.$router.push("/admin/stores");
      this.$emit("hideForm", true);
    }
  }
};
</script>