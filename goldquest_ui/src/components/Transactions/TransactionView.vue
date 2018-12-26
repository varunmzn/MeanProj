<template>
    <section id="stores">
        <b-row align="left">
            <b-col>
                <h2 class="header fade-in">
                    <span @click="$router.push('/reports')">Reports</span> 
                    <icon name="chevron-right" /> <span @click="$router.push('/reports/transactions')">Transactions</span>
                    <icon name="chevron-right" /> <small v-if="transaction">{{ transaction.trans_id }}</small></h2>
            </b-col>
        </b-row>
        <transaction-view v-if="dataLoaded" v-bind:transaction="transaction" v-bind:step="step"
            v-bind:store="transaction.Store" 
            v-bind:metalInfo="metals" 
            v-bind:itemInfo="transaction.Items" 
            v-bind:summaryInfo="itemSummary" 
            v-bind:customerInfo="transaction.Customer"></transaction-view>
    </section>
</template>

<script>
import metalsData from "@/data/metals.json";

import dataResource from "@/utils/resources";
import helpers from "@/utils/helpers";
import TransactionView from "@/components/Buy/ItemReview";
export default {
  created() {
    this.metals = metalsData;
    this.getTransaction();
  },
  components: {
    "transaction-view": TransactionView
  },
  data() {
    return {
      step: "print",
      transaction: {},
      metals: [],
      items: [],
      store: {},
      itemSummary: {},
      dataLoaded: false
    };
  },
  methods: {
    getTransaction() {     
      let trans_id = this.$route.params.transactionId;
      return dataResource.API.get("/transactions/" + trans_id)
        .then(response => {
          this.transaction = response.data;
          this.itemsTotal();
          this.dataLoaded = true;
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
      var items = this.transaction.Items;
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
    }
  }
};
</script>