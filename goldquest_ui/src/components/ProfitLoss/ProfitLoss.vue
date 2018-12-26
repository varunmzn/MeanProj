<template>
    <section id="profit-loss" class="fade-in text-left">
      <b-row align="left">
            <b-col>
                <h2 class="header fade-in"><span @click="$router.push('/reports')">Reports</span> <icon name="chevron-right" /> <small>Profit/Loss</small></h2>
            </b-col>
      </b-row>
      <shipment-search ref="search" v-bind:storeInfo="stores"></shipment-search>  
      <div class="w-100" style="height: 20px"></div>
      <profit-loss-list v-if="dataLoaded" ref="list" v-bind:storeInfo="stores" v-bind:shipments="shipments"></profit-loss-list>
        
    </section>
</template>
<script>
import dataResource from "@/utils/resources";
import helpers from "@/utils/helpers";
import currency from "vue2-filters/src/other/currency";
import ProfitLossList from "@/components/ProfitLoss/ProfitLossList";
import ShipmentSearch from "@/components/Shipments/ShipmentSearch";
export default {
  created() {
    this.getStores();
    this.getShipments();
  },
  components: {
    ProfitLossList,
    ShipmentSearch
  },
  data() {
    return {
      stores: [],
      shipments: [],
      dataLoaded: false
    };
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
    getShipments() {
      return dataResource.API.get("/shipments")
        .then(response => {
          this.shipments = response.data;
          this.dataLoaded = true;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    rowClick(shipment) {
      this.$router.push("shipments/" + shipment.shipment_id);
    }
  }
};
</script>