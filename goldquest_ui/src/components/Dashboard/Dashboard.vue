<template>
 <section id="dashboard">
    <b-row>
      <b-col class="text-left">
        <h2 class="header">Live NY Spot Prices</h2>
        <dl id="spot_prices" v-if="dataLoaded">
          <div v-for="metal in metals" v-bind:key="metal.id">
            <dt class="capitalize">{{ metal.name }}:</dt>
            <dd>{{ spotPrices[metal.name].Low | currency }}</dd>
          </div>
          <hr style="margin: 12px 0">
          <div>
            <span class="pointer" @click="payout=!payout"><icon name="money" scale=".8" /> Current Payout</span> 
          </div>
        </dl>
      </b-col>
      <b-col class="text-left">
        <h2 class="header">Messages</h2>
        <div class="alert alert-warning">
          You have inventory that is ready to ship.<br />
          <i class="ss-icon ss-truck"></i>
          <router-link to="/sell">Create Shipment</router-link>
        </div>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
    <b-row> 
      <b-col cols="4">
        <div class="sidebar" style="padding: 10px 15px" v-show="payout" v-if="dataLoaded">
          <div class="text-right" style="padding-bottom: 10px"><span class="pointer" @click="payout=!payout"><icon name="close" /></span></div>
          <div class="text-left" v-for="metal in metals" v-bind:key="metal.id">
            <b-row class="small" style="padding-bottom: 10px; font-weight: 600">
              <b-col>Metal/Purity</b-col> 
              <b-col>Price/gram</b-col>
            </b-row>
            <b-row v-for="option in metal.options" v-bind:key="option.id">
              <b-col>{{ metal.name | capitalize }} - {{ option.name }}</b-col> 
              <b-col>{{ option.purity * spotPrices[metal.name].Low * 0.035274 | currency  }}</b-col>
            </b-row>
            <hr />
          </div>
        </div>
      </b-col>
    </b-row>

  </section>
</template>
<script>
import metalsData from "@/data/metals.json";
import dataResource from "@/utils/resources";
import helpers from "@/utils/helpers";
export default {
  created() {
    helpers.getSpot().then(result => {
      this.spotPrices = result;
      this.dataLoaded = true;
    });
  },
  data() {
    return {
      spotPrices: {},
      dataLoaded: false,
      payout: false,
      metals: metalsData
    };
  },
  methods: {}
};
</script>
<style scoped>
dt {
  float: left;
  padding-right: 6px;
}
</style>

