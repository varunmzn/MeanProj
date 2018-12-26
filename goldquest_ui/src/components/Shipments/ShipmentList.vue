<template>
    <section id="store-list" class="fade-in text-left">
        <b-row style="margin-bottom: 15px">
          <b-col><span class="badge badge-info" :disabled="true">{{ filteredItems.length }} shipments</span></b-col>
          <b-col class="text-right">Sum: <span class="btn btn-lg btn-light"> {{ getTotal() | currency }}</span></b-col>
        </b-row>
        <b-table
        :items="filteredItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        >
            <template slot="shipment_id" scope="field">
                 <b class="pointer" @click="rowClick(field.item)">{{ field.item.shipment_id }}</b><br />
                <small v-if="!$parent.$refs.search.storeFilter">{{ getStore(field.item.store_id) }}</small>
            </template>
            <template slot="purchaser" scope="data">
                {{ data.value.name }} <br /> <small>{{ data.value.address }}</small>                    
            </template>
            <template slot="insured_value" scope="field">
                <span :class="(field.item.status == 'pending') ? 'red' : ''">{{ field.item.insured_value | currency }}</span> 
                <div v-if="field.item.status == 'pending'">
                  <b-btn size="sm" @click="addPayment(field.item)"><icon name="plus-circle" scale=".8" /> Payment</b-btn>    
                </div>
            </template>
            
        </b-table>
        <div class="w-100" style="height: 30px"></div>
        <b-row v-if="filteredItems.length > perPage">
          <b-col> {{ filteredItems.length }} shipments </b-col>
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
  props: ["title", "shipments", "storeInfo"],
  created() {},
  computed: {
    filteredItems() {
      let search = this.$parent.$refs.search;
      let currentTime = Date.now() / 1000;
      return this.shipments.filter(
        item =>
          ((search.statusFilter == "Expired" &&
            item.date_hold_expire < currentTime) ||
            (search.statusFilter == "Hold" &&
              item.date_hold_expire > currentTime) ||
            search.statusFilter == "All") &&
          (item.store_id == search.storeFilter || !search.storeFilter) &&
          (item.user_id == search.userFilter || !search.userFilter) &&
          (item.shipment_id.toLowerCase().indexOf(search.shipmentFilter) > -1 ||
            !search.shipmentFilter) &&
          (item.purchaser.name.toLowerCase().indexOf(search.purchaserFilter) >
            -1 ||
            !search.purchaserFilter) &&
          ((item.date_created >= search.dateRangeFrom &&
            item.date_created <= search.dateRangeTo) ||
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
          key: "shipment_id",
          label: "Shipment ID",
          tdClass: "text-left"
        },
        {
          key: "purchaser",
          label: "Purchaser",
          tdClass: "text-left bigtext"
        },
        {
          key: "date_created",
          label: "Shipment Date",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true,
          formatter: value => {
            return helpers.dateString(value);
          }
        },
        {
          key: "insured_value",
          label: "Insured Value",
          thClass: "text-right",
          tdClass: "text-right",
          sortable: true
        }
      ]
    };
  },
  methods: {
    getStore(store_id) {
      let storeInfo = this.storeInfo;
      let store = _.find(storeInfo, function(s) {
        return s.id == store_id;
      });
      return store.name;
    },
    rowClick(shipment) {
      this.$router.push("shipments/" + shipment.shipment_id);
    },
    addPayment(shipment) {
      console.log(shipment);
    },
    getTotal() {
      let total = _.sumBy(this.filteredItems, function(i) {
        return Number(i.insured_value);
      });
      return total;
    }
  }
};
</script>