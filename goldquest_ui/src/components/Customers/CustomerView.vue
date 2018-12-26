<template>
    <section id="customers">
        <div v-if="dataLoaded">
            <b-row align="left">
                <b-col>
                    <h2 class="header fade-in"><span @click="$router.push('/customers')">Customers</span> <icon name="chevron-right" /> 
                    <small>{{ customer.first_name + " " + customer.last_name}}</small></h2>
                </b-col>
            </b-row>        
            <customer-form v-bind:customerInfo="customer" v-bind:storeInfo="store"></customer-form>
        </div>   
    </section>
</template>

<script>
import optionsData from "@/data/options.json";
import dataResource from "@/utils/resources";
import CustomerForm from "@/components/Customers/CustomerForm";
export default {
  components: {
    CustomerForm
  },
  data() {
    return {
      store: {},
      stores: [],
      customer: {},
      dataLoaded: false
    };
  },
  created() {
    this.getCustomer();
  },
  methods: {
    getCustomer() {
      let _customerId = this.$route.params.customerId;
      return dataResource.API.get("/customers/" + _customerId)
        .then(response => {
          this.customer = response.data;
          this.customer.height_feet = Math.floor(this.customer.height/12) || 0;
          this.customer.height_inches = Math.floor(this.customer.height % 12) || 0;
          this.dataLoaded = true;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    updateCustomer(cust){
      this.getCustomer();
    }
  }
};
</script>