<template>
    <section id="store-list" class="fade-in text-left">
        <b-row style="margin-bottom: 15px">
          <b-col><span class="badge badge-info" :disabled="true">{{ filteredItems.length }} transactions</span></b-col>
          <b-col class="text-right">Sum: <span class="btn btn-lg btn-light"> {{ getTotal() | currency }}</span></b-col>
        </b-row>
        <b-table hover
        :items="filteredItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @row-clicked="rowClick"
        >
            <template slot="trans_id" scope="field">
                <b-badge v-if="(field.item.date_hold_expire > Date.now() / 1000)" variant="warning"><icon name="lock" /></b-badge>
                <b>{{ field.item.trans_id }}</b><br />
                <small v-if="!$parent.$refs.search.storeFilter">{{ field.item.Store.name }}</small>
            </template>
            <template slot="customer_name" scope="field">
                {{ field.item.Customer.first_name }}  {{ field.item.Customer.last_name }}                      
            </template>
            <template slot="payout" scope="field">
                {{ field.item.payout | currency }}             
            </template>
            
        </b-table>
        <div class="w-100" style="height: 30px"></div>
        <b-row v-if="filteredItems.length > perPage">
          <b-col> {{ filteredItems.length }} transactions </b-col>
          <b-col class="d-flex justify-content-end">
              <b-pagination :total-rows="filteredItems.length" :per-page="perPage" :hide-goto-end-buttons="false" v-model="currentPage" />
          </b-col>
        </b-row>
    </section>
</template>
<script>
import helpers from "@/utils/helpers";
import currency from "vue2-filters/src/other/currency";
export default {
  props: ["title", "transactions", "storeInfo"],
  created() {
    //this.items = this.transactions;
  },
  computed: {
    filteredItems() {
      let search = this.$parent.$refs.search;
      let currentTime = Date.now() / 1000;
      return this.transactions.filter(
        transaction =>
          ((search.statusFilter == "Expired" &&
            transaction.date_hold_expire < currentTime) ||
            (search.statusFilter == "Hold" &&
              transaction.date_hold_expire > currentTime) ||
            search.statusFilter == "All") &&
          (transaction.store_id == search.storeFilter || !search.storeFilter) &&
          (transaction.user_id == search.userFilter || !search.userFilter) &&
          (transaction.trans_id.toLowerCase().indexOf(search.transactionFilter) > -1 ||
            !search.transactionFilter) &&
          (transaction.Customer.first_name
            .toLowerCase()
            .indexOf(search.customerFilter) > -1 ||
            transaction.Customer.last_name
              .toLowerCase()
              .indexOf(search.customerFilter) > -1 ||
            !search.customerFilter) &&
          ((transaction.date_created >= search.dateRangeFrom &&
            transaction.date_created <= search.dateRangeTo) ||
            !search.dateRangeFrom ||
            !search.dateRangeTo)
      );
    }
  },
  data() {
    return {
      sortBy: "date_created",
      sortDesc: true,
      currentPage: 1,
      perPage: 20,
      filter: "",
      items: [],
      fields: [
        {
          key: "trans_id",
          label: "Transaction ID",
          tdClass: "text-left"
        },
        {
          key: "customer_name",
          label: "Customer",
          tdClass: "text-left bigtext"
        },
        {
          key: "date_created",
          label: "Transaction Date",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
          formatter: value => {
            return helpers.dateString(value);
          }
        },
        {
          key: "payout",
          label: "Payout",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true
        }
      ]
    };
  },
  methods: {
    rowClick(transaction) {
      this.$router.push("transactions/" + transaction.trans_id);
    },
    getTotal() {
      let total = _.sumBy(this.filteredItems, function(i) {
        return Number(i.payout);
      });
      return total;
    }
  }
};
</script>