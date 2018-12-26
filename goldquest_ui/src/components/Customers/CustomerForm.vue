<template>
    <section>
        <b-row align="left">
            <b-col style="padding-top: 30px">
                <b-row>
                    <b-col cols="4">
                        <label>First Name</label>
                        <input class="form-control" v-model="customer.first_name">
                    </b-col>
                    <b-col cols="2">
                        <label>M.I.</label>
                        <input class="form-control" v-model="customer.initial">
                    </b-col>
                    <b-col cols="6">
                        <label>Last Name</label>
                        <input class="form-control" v-model="customer.last_name">
                    </b-col>
                </b-row>
                <div class="w-100" style="height: 25px"></div>
                <b-row>
                    <b-col cols="8">
                        <label>Street Address</label>
                        <input class="form-control" v-model="customer.address_1">
                    </b-col>
                    <b-col cols="3">
                        <label>Unit/Apt</label>
                        <input class="form-control" v-model="customer.address_2">
                    </b-col>
                </b-row>
                <div class="w-100" style="height: 25px"></div>
                <b-row>
                    <b-col cols="5">
                        <label>City</label>
                        <input class="form-control" v-model="customer.city">
                    </b-col>
                    <b-col cols="2">
                        <label>State</label>
                        <input class="form-control" v-model="customer.state">
                    </b-col>
                    <b-col cols="4">
                        <label>Zip/Postal Code</label>
                        <input class="form-control" v-model="customer.postal_code">
                    </b-col>
                </b-row>
                <div class="w-100" style="height: 25px"></div>
                <hr />
                <b-row>
                    <b-col cols="5">
                        <label>Phone</label>
                        <input class="form-control" v-model="customer.phone">
                    </b-col>
                    <b-col cols="7">
                        <label>Email Address</label>
                        <input class="form-control" v-model="customer.email">
                    </b-col>
                </b-row>
                <!-- Save button -->
                <b-row v-if="$route.path.includes('buy')">
                    <b-col class="small">
                        <div v-if="!customer.id" style="padding-top: 30px">
                            <b>Required:</b><br />
                            <li>First &amp; Last Name</li>
                            <li>ID Number, Type, Issuer, &amp; Expiration</li>
                            <li>Date of Birth</li>
                        </div>
                    </b-col>
                    <b-col class="text-right" style="padding-top: 40px">
                        <b-button :size="(customerInfo.id) ? 'sm' :'lg'" :variant="(customerInfo.id) ? 'default' :'warning'" :disabled="btnDisabled" @click="saveCustomer()">
                            <icon :name="(customerInfo.id) ? 'user' : 'user-plus'"/> {{ (customerInfo.id) ? 'Update' : 'Add' }} Customer</b-button>
                    </b-col>
                </b-row>
                <!-- End Save button -->
            </b-col>
            <b-col cols="6" style="padding-left: 50px">
                <b-row class="sidebar" style="background:#ece9df">
                    <b-col cols="6">
                        <label>Identification Number</label>
                        <input class="form-control" v-model="customer.ident_num">
                    </b-col>
                    <b-col>
                        <label>Issuing State/Country</label>
                        <input class="form-control" v-model="customer.ident_issuer">
                    </b-col>
                    <div class="w-100" style="height: 25px"></div>
                    <b-col cols="7" order="2">
                        <label>Expiration</label>
                        <b-row>
                            <b-col class="no-padding-left"><b-form-select v-model="customer.exp_mm" :options="month_options" /></b-col>
                            <b-col class="no-padding-left"><b-form-select v-model="customer.exp_dd" :options="getDays(customer.exp_mm)" /></b-col>
                            <b-col class="no-padding-left"><b-form-select v-model="customer.exp_yy" :options="getYearsRange(2018, 15)" /></b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <label>Type</label>
                        <b-form-select v-model="customer.ident_type" :options="ident_options" />
                    </b-col>
                </b-row>
                <b-row class="sidebar">
                    <b-col style="padding-right: 5px">
                        <b-form-group label="Gender">
                            <b-form-radio-group v-model="customer.gender"
                                                :options="gender_options"
                                                name="gender">
                            </b-form-radio-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols="7">
                        <label>Date of Birth</label>
                        <b-row>
                            <b-col class="no-padding-left"><b-form-select v-model="customer.dob_mm" :options="month_options" /></b-col>
                            <b-col class="no-padding-left"><b-form-select v-model="customer.dob_dd" :options="getDays(customer.dob_mm)" /></b-col>
                            <b-col class="no-padding-left"><b-form-select v-model="customer.dob_yy" :options="getYearsRange(1920, 100)" /></b-col>
                        </b-row>
                    </b-col>
                    

                    <div class="w-100" style="height: 25px"/>
                    <b-col cols="4">
                        <label>Height</label>
                        <b-input-group append="ft."><input class="form-control text-right" type="number" max="7" min="3" v-model="customer.height_feet"></b-input-group>
                    </b-col>
                    <b-col cols="4" style="padding-left: 0; padding-right:30px;">
                        <label>&nbsp;</label>
                        <b-input-group append="in."><input class="form-control text-right" type="number" max="12" min="0" v-model="customer.height_inches"></b-input-group>
                    </b-col>
                    
                    <b-col cols="4">
                        <label>Weight</label>
                        <b-input-group append="lbs"><input class="form-control text-right" v-model="customer.weight"></b-input-group>
                    </b-col>
                    <div class="w-100" style="height: 25px"/>
                    <b-col cols="6">
                        <label>Hair Color</label>
                        <b-form-select v-model="customer.hair" :options="haircolor_options" />
                    </b-col>
                    <b-col cols="6">
                        <label>Eye Color</label>
                        <b-form-select v-model="customer.eyes" :options="eyecolor_options" />
                    </b-col>  
                    <div class="w-100" style="height: 25px"/>                  
                    <b-col cols="6">
                        <label>Ethnicity</label>
                        <b-form-select v-model="customer.ethnicity" :options="ethnicity_options" />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <!-- Footer Bar -->
        <div class="sticky-footer d-print-none" v-if="$route.path.includes('customers')">
            <div class="container">
                <div class="w-100" style="height: 35px"></div>
                <b-row>
                    <b-col class="text-right">
                        <b-button variant="outline-secondary" @click="$router.push('/customers')" style="margin-right: 20px">cancel</b-button>
                        <b-button :size="(customerInfo.id) ? 'md' :'lg'" :variant="(customer.id) ? 'info' :'warning'" :disabled="btnDisabled" @click="saveCustomer()">
                            <icon :name="(customerInfo.id) ? 'user' : 'user-plus'"/> {{ (customer.id) ? 'Update' : 'Add' }} Customer</b-button>
                    </b-col>
                </b-row>
            </div>
        </div>
    </section>
</template>
<script>
import moment from "moment";
import dataResource from "@/utils/resources";
export default {
  props: ["customerInfo", "storeInfo"],
  created() {
    this.customer = this.customerInfo;
    this.store = this.storeInfo;
    this.setDatePickers();
  },
  watch: {
    customerInfo() {
      this.customer = this.customerInfo;
      this.setDatePickers();
    }
  },
  computed: {
    btnDisabled() {
      return (
        !this.customerInfo ||
        !this.customerInfo.first_name ||
        !this.customerInfo.last_name ||
        !this.customerInfo.ident_num ||
        !this.customerInfo.ident_type
      );
    }
  },
  data() {
    return {
      customer: {}
    };
  },
  methods: {
    getDays(month) {
      let max = month ? moment(month, "MMM").daysInMonth() : 31;
      let days = [];
      let i = 1;
      for (; i <= max; i++) {
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
    saveCustomer() {
      var dob = moment(
        this.customer.dob_yy + this.customer.dob_mm + this.customer.dob_dd
      );
      var exp = moment(
        this.customer.exp_yy + this.customer.exp_mm + this.customer.exp_dd
      );
      this.customer.date_birth = dob;
      this.customer.ident_expire = exp;
      this.customer.height =
        this.customer.height_feet * 12 + parseInt(this.customer.height_inches);
      if (this.store.id && !this.customer.id)
        this.customer.store_id = this.store.id;
      var action = this.customer.id ? "put" : "post";
      this.doCustomerAction(action);
    },
    setDatePickers() {
      if (this.customer.date_birth) {
        this.customer.dob_yy = moment(this.customer.date_birth).format("YYYY");
        this.customer.dob_mm = moment(this.customer.date_birth).format("MMM");
        this.customer.dob_dd = parseInt(
          moment(this.customer.date_birth).format("DD")
        );
      }
      if (this.customer.ident_expire) {
        this.customer.exp_yy = moment(this.customer.ident_expire).format(
          "YYYY"
        );
        this.customer.exp_mm = moment(this.customer.ident_expire).format("MMM");
        this.customer.exp_dd = parseInt(
          moment(this.customer.ident_expire).format("DD")
        );
      }
    },
    doCustomerAction(action) {
      var path = action == "put" ? "/" + this.customer.id : "";
      return dataResource.API[action]("/customers" + path, this.customer)
        .then(response => {
          this.$toasted.success('Customer Information Updated', { duration: 3500, position: 'top-center' });  
          this.$parent.updateCustomer(this.customer);
          this.setDatePickers();
        })
        .catch(errorResponse => {
          // Handle error...
          this.$toasted.error('An error occurred: ' + errorResponse, { duration: 3500, position: 'top-center' });
          console.log("API responded with:", errorResponse);
        });
    }
  },
  data() {
    return {
      ident_options: [
        { value: "driver", text: "Driver's License" },
        { value: "state", text: "State ID" },
        { value: "passport", text: "Passport" },
        { value: "military", text: "Military ID" },
        { value: "other", text: "Other" }
      ],
      month_options: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      gender_options: ["Male", "Female"],
      haircolor_options: [
        "Black",
        "Blond",
        "Brown",
        "Brunette",
        "Strawberry Blond",
        "Red/Auburn",
        "Colored",
        "Bald",
        "Other"
      ],
      eyecolor_options: [
        "Blue",
        "Brown",
        "Dark Brown",
        "Green",
        "Grey",
        "Hazel",
        "Other"
      ],
      ethnicity_options: [
        "African/Black",
        "European/White",
        "Native American",
        "Asian",
        "Hispanic",
        "Pacific Islander",
        "Middle Eastern",
        "Mixed",
        "Other"
      ]
    };
  }
};
</script>