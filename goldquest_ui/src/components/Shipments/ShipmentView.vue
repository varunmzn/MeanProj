<template>
    <section id="stores">
        <b-row align="left">
            <b-col>
                <h2 class="header fade-in d-print-none">
                    <span @click="$router.push('/reports')">Reports</span> 
                    <icon name="chevron-right" /> <span @click="$router.push('/reports/shipments')">Shipments</span>
                    <icon name="chevron-right" /> <small v-if="dataLoaded">{{ shipment.shipment_id }}</small>
                </h2>
            </b-col>
        </b-row>
        <shipment-view v-if="dataLoaded" v-bind:shipment="shipment" v-bind:step="step"
            v-bind:store="shipment.Store" 
            v-bind:metalInfo="metals" 
            v-bind:itemInfo="items" 
            v-bind:metalSummary="metalSummary"
            v-bind:summaryInfo="itemSummary">
        </shipment-view>
    </section>
</template>

<script>
import metalsData from "@/data/metals.json";

import dataResource from "@/utils/resources";
import helpers from "@/utils/helpers";
import ShipmentView from "@/components/Sell/ItemReview";
export default {
  created() {
    this.getShipment();
    this.metals = metalsData;   
  },
  components: {
    "shipment-view": ShipmentView
  },
  data() {
    return {
      step: "view",
      metals: [],
      items: {},
      itemSummary: {},
      dataLoaded: false
    };
  },
  methods: {
    getShipment() {
      let _shipmentId = this.$route.params.shipmentId;
      return dataResource.API.get("/shipments/" + _shipmentId)
        .then(response => {
          this.shipment = response.data;
          this.dataLoaded = true;
          this.itemsTotal();
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    itemsTotal() {
      let summary = {};
      let total = 0;
      let count = 0;
      var items = this.shipment.Items;
      _.forEach(this.metals, function(metal) {
        var realItems = _.filter(items, function(i) {
          if (i.metal_id == metal.id) return i;
        });
        var subtotal = _.sumBy(realItems, function(i) {
          return Number(i.payout);
        });
        summary[metal.name] = {
          items: realItems,
          count: realItems.length,
          subtotal: subtotal
        };
        count = count + realItems.length;
        total = Number(total) + Number(subtotal);
      });
      this.itemSummary = summary;
      this.itemSummary.total = total;
      this.itemSummary.count = items.length;
      this.updateSummary(items);
    },
    getAllOptions() {
      let metals = this.metals;
      let options = [];
      metals.forEach(metal => {
        options = options.concat(metal.options);
      });
      return options;
    },
    getMetal(metal_id, prop) {
      let metal = _.find(this.metals, function(m) {
        return m.id == metal_id;
      });
      return !prop ? metal.name : metal;
    },
    getPurity(purity_id) {
      let options = this.getAllOptions();
      let purity = _.find(options, function(o) {
        return o.id == purity_id;
      });
      return purity.name;
    },
    updateSummary(items) {
      let metals = {
        gold: { weight: 0, count: 0, total: 0, items: [] },
        silver: { weight: 0, count: 0, total: 0, items: [] },
        platinum: { weight: 0, count: 0, total: 0, items: [] }
      };
      items.forEach(item => {
        var metal = this.getMetal(item.metal_id);
        metals[metal].items.push(item);
        metals[metal].total = Number(metals[metal].total) + Number(item.value);
        metals[metal].weight = (
          Number(metals[metal].weight) + Number(item.weight)
        ).toFixed(2);
        metals[metal].count++;
      });
      this.metalSummary = metals;
    }
  }
};
</script>