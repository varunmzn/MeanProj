<template>
    <section id="sell">
        <div v-if="dataLoaded && activeStep == 'items'" class="fade-in" :class="activeStep">
            <b-row>
                <b-col cols="6">
                    <h2 class="header text-left">Choose Items to Sell</h2>
                    <item-search ref="search" v-bind:metalInfo="metals"></item-search>
                </b-col>
                <b-col cols="4" class="text-left">
                    <table class="table small no-margin">
                        <tbody>
                            <tr>
                                <th></th>
                                <th class="text-right" style="width:30%">Weight</th>
                                <th class="text-right" style="width:30%">Value</th>
                            </tr>
                            <tr>
                                <td><b>Gold</b></td>
                                <td class="text-right">{{ metalSummary.gold.weight }}g</td>
                                <td class="text-right">{{ metalSummary.gold.total | currency }}</td>
                            </tr>
                            <tr>
                                <td><b>Silver</b></td>
                                <td class="text-right">{{ metalSummary.silver.weight }}g</td>
                                <td class="text-right">{{ metalSummary.silver.total | currency }}</td>
                            </tr>
                            <tr>
                                <td><b>Platinum</b></td>
                                <td class="text-right">{{ metalSummary.platinum.weight }}g</td>
                                <td class="text-right">{{ metalSummary.platinum.total | currency }}</td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
                <b-col cols="2" class="text-left box fill" v-if="spotLoaded">
                    <h6 class="header" style="margin-bottom: 10px">Live NY Spot Prices</h6>
                    <div class="small">
                        <div v-for="metal in metals" v-bind:key="metal.id">
                            <b class="capitalize">{{ metal.name }}</b> {{ spotPrices[metal.name].Low | currency }}
                        </div>
                    </div>
                </b-col>
            </b-row>
            <div style="height:30px" />
            <!-- Select Items -->
            <item-list ref="list" v-if="dataLoaded" v-bind:itemInfo="items" v-bind:metalInfo="metals" @updateTotal="updateTotal"></item-list>
        </div>

        <div v-if="activeStep == 'shipment'" class="fade-in" :class="activeStep">
            <!-- Shipment -->
            <item-shipment v-bind:shipment="shipment" v-bind:summaryInfo="itemSummary"></item-shipment>
        </div>
        <div v-if="activeStep == 'review' || activeStep == 'print'" class="fade-in" :class="activeStep">
            <!-- Review Items -->
            <item-review
            v-bind:metalInfo="metals"
            v-bind:metalSummary="metalSummary"
            v-bind:shipment="shipment"
            v-bind:store="store"
            v-bind:step="activeStep"></item-review>
        </div>

        <!-- Footer Bar -->
        <div class="sticky-footer d-print-none">
            <div class="container">
                <b-row style="margin: 5px 0" v-if="activeStep != 'print'">
                    <b-col class="text-right payout no-padding">
                        <span class="count small" v-if="itemSummary.count">
                            {{ itemSummary.count }} {{ itemSummary.count | pluralize('item')}}
                        </span>
                        <span>Total Insured Value</span>
                        <span class="total">{{ itemSummary.total | currency }}</span>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text-right actions">
                      <div v-if="activeStep != 'print'">
                        <b-button variant="outline-secondary" v-if="activeStep != 'items'" @click="moveStep(-1)">back</b-button>                        
                        <b-button v-if="activeStep != 'review'" :variant="btnStatus() ? 'empty' : 'success'" :disabled="btnStatus()" @click="moveStep(1)">
                            continue <icon name="arrow-right" class="align-middle"></icon>
                        </b-button>
                        <b-button v-if="activeStep == 'review'" variant="primary" @click="completeTransaction()">
                            complete transaction
                        </b-button>
                      </div>
                       <div v-else style="padding-top: 30px"> 
                          <b-button size="lg" variant="warning" @click="done()">
                            done
                          </b-button>
                          <b-button size="lg" variant="default" @click="print()">
                            <icon name="print" /> print
                          </b-button>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </div>
    </section>
</template>

<script>
import metalsData from "@/data/metals.json";
import dataResource from "@/utils/resources";
import helpers from "@/utils/helpers";
import ItemList from "@/components/Sell/ItemList";
import ItemSearch from "@/components/Sell/ItemSearch";
import ItemReview from "@/components/Sell/ItemReview";
import ItemShipment from "@/components/Sell/ItemShipment";
export default {
  props: ["payload"],
  components: {
    "item-list": ItemList,
    "item-review": ItemReview,
    "item-shipment": ItemShipment,
    "item-search": ItemSearch
  },
  data() {
    return {
      dataLoaded: false,
      spotLoaded: false,
      spotPrices: {},
      steps: ["items", "shipment", "review", "print"],
      btnDisabled: true,
      activeStep: null,
      user: { id: null },
      store: {},
      selectedItems: [],
      selectedID: [],
      items: [],
      metals: [],
      shipment: {
        id: Math.floor(Math.random() * 1000 + 1),
        date_shipped: Date.now() / 1000,
        user_name: "",
        purchaser: {
          name: "",
          address: ""
        }
      },
      itemSummary: { count: 0, total: 0 },
      metalSummary: {
        gold: { weight: 0, count: 0, total: 0 },
        silver: { weight: 0, count: 0, total: 0 },
        platinum: { weight: 0, count: 0, total: 0 }
      }
    };
  },
  created() {
    this.getStore();
    this.getItems();
    this.getMetals();
    this.activeStep = this.activeStep ? this.activeStep : this.steps[0];
    helpers.getSpot().then(result => {
      this.spotPrices = result;
      this.spotLoaded = true;
    });
  },
  methods: {
    getMetals() {
      this.metals = metalsData;
    },
    getStore(){
      let _storeId = this.payload['custom:store_id'];
      return dataResource.API.get("/stores/" + _storeId)
        .then(response => {
          this.store = response.data;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    getItems() {
      return dataResource.API.get("/items/sell")
        .then(response => {
          this.items = response.data;
          this.dataLoaded = true;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    updateTotal(selectedItems) {
      let total = 0;
      let count = 0;
      let ids = [];
      let items = selectedItems;
      _.forEach(items, function(item) {
        total = Number(total) + Number(item.value);
        ids.push(item.id);
      });
      this.itemSummary.total = total;
      this.itemSummary.count = selectedItems.length;
      this.selectedItems = selectedItems;
      this.selectedID = ids;

      this.updateSummary(selectedItems);
      this.btnStatus();
    },
    updateSummary(selectedItems) {
      let items = selectedItems;
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
    },
    updateShipment(shipment) {
      this.shipment = shipment;
    },
    moveStep(action) {
      let step = this.activeStep;
      let steps = this.steps;
      let stepIndex = _.findIndex(steps, function(s) {
        return s == step;
      });
      this.activeStep = this.steps[stepIndex + Number(action)];
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
    btnStatus() {
      return this.itemSummary.count == 0;
    },
    completeTransaction() {
      let date = Date.now() / 1000;

      var allItems = [];
      var metals = this.metalSummary;
      _.forOwn(metals, function(value, key) {
        if (value.count > 0) allItems = allItems.concat(value.items);
      });
      this.shipment.store_id = this.store.id;
      this.shipment.purchaser = JSON.stringify(this.shipment.purchaser);
      this.shipment.items = allItems;
      this.shipment.date_created = date;
      this.shipment.shipment_id =
        helpers.dateString(date, "YYYYMMDDHHmmss") + "-RS";
      this.saveTransaction();
    },
    saveTransaction() {
      return dataResource.API.post("/shipments/", this.shipment)
        .then(response => {
          this.shipment = response.data;
          this.activeStep = "print";
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    done() {
      location.reload();
    },
    print() {
      window.print();
    }
  }
};
</script>
