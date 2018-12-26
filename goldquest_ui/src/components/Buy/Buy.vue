<template>
    <section id="buy" v-if="dataLoaded">
        <div v-if="activeStep =='items' && spotLoaded" class="fade-in" :class="activeStep">
            <!-- Item Form Table -->
            <item-form v-bind:metalInfo="metals" v-bind:itemInfo="items" v-bind:storeInfo="store"></item-form>
        </div>

        <div v-if="activeStep == 'customer'" class="fade-in" :class="activeStep">        
            <b-row align="left">
                <b-col>
                    <h2 class="header fade-in"><span @click="activeStep='items'">Add Items</span> 
                        <icon name="chevron-right" /> <small>Customer Info</small>
                    </h2>
                </b-col>
            </b-row>
            <div class="w-100" style="height: 20px"></div>
            <!-- Customer Search -->
            <customer-search v-bind:title="'Customer Details'" v-bind:moduleName="'buy'" v-if="CustomerForm"></customer-search>
            <!-- Add customer -->
            <customer-form v-bind:customerInfo="customer" v-bind:storeInfo="store" v-if="!CustomerForm"></customer-form>
        </div>

        <div v-if="activeStep == 'review' || activeStep == 'print'" class="fade-in" :class="activeStep">
            <b-row align="left">
                <b-col>
                    <h2 v-if="activeStep == 'review'" class="header fade-in d-print-none"><span @click="activeStep='items'">Add Items</span> 
                        <icon name="chevron-right" /><span @click="activeStep='customer'">Customer Info</span>
                        <icon name="chevron-right" /> <small>Review Transaction</small>
                    </h2>
                    <h2 v-else class="header d-print-none">Transaction Complete</h2>
                </b-col>
            </b-row>
            <div class="w-100" style="height: 20px"></div>
            <!-- Review Items -->
            <item-review v-bind:step="activeStep" 
            v-bind:store="store" 
            v-bind:metalInfo="metals" 
            v-bind:summaryInfo="itemSummary" 
            v-bind:customerInfo="customer"
            v-bind:transaction ="transaction"></item-review>
        </div>
        <!-- Footer Bar -->
        <div class="sticky-footer d-print-none">
            <div class="container">
                <b-row v-if="activeStep != 'print'" style="margin: 5px 0">
                    <b-col cols="10" class="text-right no-padding payout">
                        <div style="padding-top: 10px">
                            <span class="count" v-if="itemSummary.count">
                                {{ itemSummary.count }} {{ itemSummary.count | pluralize('item')}}
                            </span>
                            Total Payout
                        </div>
                    </b-col>
                    <b-col class="text-right total payout no-padding">
                        {{ itemSummary.total | currency }}
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text-right">
                        <div v-if="activeStep != 'print'">       

                            <span v-if="itemSummary.total > 0 && activeStep == 'items'" style="padding-right: 60px">
                            You will earn {{ getPoints() }} points with this transaction!
                            </span>                    

                            <b-button class="float-left" variant="outline-secondary" v-if="activeStep != 'items'" @click="moveStep(-1)">
                                <icon name="chevron-left" class="align-middle" /> go back
                            </b-button>

                            <b-button v-if="activeStep != 'review'" :variant="(btnDisabled) ? 'empty' : 'success'" :disabled="btnDisabled" @click="moveStep(1)">
                                continue <icon name="chevron-right" class="align-middle" />
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
import helpers from "@/utils/helpers";
import moment from "moment";
import dataResource from "@/utils/resources";
import ItemForm from "@/components/Buy/ItemForm";
import ItemReview from "@/components/Buy/ItemReview";
import CustomerForm from "@/components/Customers/CustomerForm";
import CustomerSearch from "@/components/Customers/CustomerSearch";
export default {
  props: ["payload"],
  components: {
    "item-form": ItemForm,
    "item-review": ItemReview,
    "customer-form": CustomerForm,
    "customer-search": CustomerSearch
  },
  data() {
    return {
      steps: ["items", "customer", "review", "print"],
      spotPrices: {},
      spotLoaded: false,
      transaction: {},
      store: {},
      metals: metalsData,
      items: [],
      itemSummary: {},
      user: { id: null },
      customer: {
        id: null,
        ident_num: null,
        first_name: null,
        last_name: null,
        ident_type: null
      },
      CustomerForm: false,
      activeStep: null,
      dataLoaded: false
    };
  },
  computed: {
    btnDisabled() {
      if (this.activeStep == "items" && this.itemSummary.count == 0)
        return true;
      //Save Customer before continue
      if (this.activeStep == "customer" && !this.customer.id) return true;
    }
  },
  created() {
    this.activeStep = this.activeStep ? this.activeStep : this.steps[0];
    this.getStore();
    this.setItems();
    this.itemsTotal();
    helpers.getSpot().then(result => {
      this.spotPrices = result;
      this.spotLoaded = true;
    });
  },
  methods: {
    getMetals() {
      return metalsData;
    },
    getStore() {
      let _storeId = this.payload["custom:store_id"];
      return dataResource.API.get("/stores/" + _storeId)
        .then(response => {
          this.store = response.data;
          this.dataLoaded = true;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    setItems() {
      let items = {};
      _.forEach(this.metals, function(metal) {
        items[metal.name] = [
          {
            payout: 0,
            override: 0,
            value: 0,
            metal_id: metal.id,
            purity_id: null,
            weight: null,
            description: null,
            images: [],
            notes: []
          }
        ];
      });
      this.items = items;
    },
    addItem(metal) {
      let item = {
        payout: 0,
        override: 0,
        metal_id: metal.id,
        purity_id: null,
        weight: null,
        description: null,
        inscription: null
      };
      this.items[metal.name].push(item);
      this.itemsTotal();
    },
    removeItem(metal, item) {
      let items = this.items[metal.name];
      this.items[metal.name] = _.remove(items, function(i) {
        return i != item;
      });
      this.itemsTotal();
    },
    resetItem(item) {
      let payout = Number(item.value * this.store.payout).toFixed(2);
      item.payout = payout;
      item.override = payout;
      item.reset = false;
      this.itemsTotal();
    },
    updateItem(item, override = false) {
      this.$root.$emit("bv::hide::popover");
      if (!item.purity_id || isNaN(item.weight)) {
        item.description = null;
        item.payout = 0;
      } else {
        let metal = _.find(this.metals, function(m) {
          return m.id == item.metal_id;
        });
        let option = _.find(metal.options, function(o) {
          return o.id == item.purity_id;
        });

        let value = Number(
          option.purity *
            item.weight *
            this.spotPrices[metal.name].Low *
            0.035274
        );
        let payout = Number(value * this.store.payout).toFixed(2);

        item.value = value.toFixed(2);
        item.override =
          override && item.override > 0
            ? Number(item.override).toFixed(2)
            : payout;
        item.payout = override ? item.override : payout;
        item.reset = item.payout == payout ? false : true;
        item.weight = !item.weight ? item.weight : Number(item.weight);
      }
      this.itemsTotal();
    },
    itemsTotal() {
      let summary = {};
      let total = 0;
      let count = 0;
      let points = 0;
      var items = this.items;
      var store = this.store;

      _.forEach(this.metals, function(metal) {
        var realItems = _.filter(items[metal.name], function(i) {
          if (i.weight > 0 && i.metal_id) return i;
        });
        var subtotal = _.sumBy(items[metal.name], function(i) {
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
      this.itemSummary.count = count;
    },
    getPoints() {
      return Math.floor(this.itemSummary.total);
    },
    moveStep(action) {
      let step = this.activeStep;
      let steps = this.steps;
      let stepIndex = _.findIndex(steps, function(s) {
        return s == step;
      });
      this.activeStep = this.steps[stepIndex + Number(action)];
    },
    showCustomerForm() {
      this.CustomerForm = !this.CustomerForm;
    },
    updateCustomer(customer) {
      this.customer = customer;
    },
    saveTransaction() {
      return dataResource.API.post("/transactions/", this.transaction)
        .then(response => {
          this.transaction = response.data;
          this.activeStep = "print";
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    completeTransaction() {
      let date = Date.now() / 1000;

      var allItems = [];
      var items = this.items;
      _.forOwn(items, function(value, key) {
        var realItems = _.filter(value, function(i) {
          if (i.weight > 0 && i.metal_id) return i;
        });
        allItems = allItems.concat(realItems);
      });
      this.transaction.store_id = this.store.id;
      this.transaction.customer_id = this.customer.id;
      this.transaction.items = allItems;
      this.transaction.payout = this.itemSummary.total;
      this.transaction.date_created = date;
      this.transaction.date_hold_expire = date + this.store.police_hold * 86400;
      this.transaction.trans_id =
        helpers.dateString(date, "YYYYMMDDHHmmss") + "-RS";
      this.saveTransaction();
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
