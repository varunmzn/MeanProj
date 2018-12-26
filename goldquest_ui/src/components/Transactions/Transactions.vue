<template>
    <section id="transactions">
        <b-row align="left">
            <b-col>
                <h2 class="header fade-in"><span @click="$router.push('/reports')">Reports</span> <icon name="chevron-right" /> <small>Transactions</small></h2>
            </b-col>
        </b-row>
      <transaction-search ref="search" v-bind:storeInfo="stores"></transaction-search>  
      <div class="w-100" style="height: 20px"></div>
      <transaction-list ref="list" v-if="dataLoaded" v-bind:storeInfo="stores" v-bind:transactions="transactions"></transaction-list>
    </section>
</template>

<script>
import helpers from "@/utils/helpers";
import dataResource from "@/utils/resources";
import TransactionList from "@/components/Transactions/TransactionList";
import TransactionSearch from "@/components/Transactions/TransactionSearch";
import TransactionView from "@/components/Buy/ItemReview";
export default {
  created() {
    this.getTransactions();
    this.getStores();
  },
  components: {
    "transaction-list": TransactionList,
    "transaction-search": TransactionSearch
  },
  data() {
    return {
      stores: [],
      transactions: [],
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
    getTransactions() {
      return dataResource.API.get("/transactions")
        .then(response => {
          this.transactions = response.data;
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