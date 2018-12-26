<template>
    <section id="customers">
      <b-row align="left">
          <b-col>
            <h2 class="header fade-in">Customers</h2>
          </b-col>
      </b-row>     
      <div v-if="dataLoaded" >
        <customer-search ref="search" v-bind:storeInfo="stores"></customer-search>
        <customer-list ref="list" v-bind:customers="customers"></customer-list>
      </div>   
    </section>
</template>

<script>
import optionsData from "@/data/options.json";
import dataResource from "@/utils/resources";
import CustomerList from "@/components/Customers/CustomerList";
import CustomerSearch from "@/components/Customers/CustomerSearch";
export default {
  components: {
    "customer-list": CustomerList,
    "customer-search": CustomerSearch
  },
  data() {
    return {
      stores: [],
      customers: [],
      dataLoaded: false
    };
  },
  created() {
    this.getStores();
    this.getCustomers();
  },
  methods: {
    getStores() {     
      return dataResource.API.get("/stores")
        .then(response => {
          this.stores = response.data;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    getCustomers(){
      return dataResource.API.get("/customers")
        .then(response => {
          this.customers = response.data;
          this.dataLoaded = true;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    }
  }
};
</script>