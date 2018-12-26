<template>
    <section id="shipments">
        <b-row align="left">
            <b-col>
                <h2 class="header fade-in"><span @click="$router.push('/reports')">Reports</span> <icon name="chevron-right" /> <small>Shipments</small></h2>
            </b-col>
        </b-row>
        <div v-if="dataLoaded">
            <shipment-search ref="search" v-bind:storeInfo="stores"></shipment-search>  
            <div class="w-100" style="height: 20px"></div>
            <shipment-list ref="list" v-bind:storeInfo="stores" v-bind:shipments="shipments"></shipment-list>
        </div>
    </section>
</template>

<script>
import helpers from "@/utils/helpers";
import dataResource from "@/utils/resources";
import ShipmentList from "@/components/Shipments/ShipmentList";
import ShipmentSearch from "@/components/Shipments/ShipmentSearch";
import ShipmentView from "@/components/Buy/ItemReview";
export default {
  created() {
    this.getStores();
    this.getShipments();
  },
  components: {
    "shipment-list": ShipmentList,
    "shipment-search": ShipmentSearch
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
    }
  }
};
</script>