<template>
    <section>
        <b-row hidden>
          <b-col><span class="badge badge-info" :disabled="true">{{ filteredItems.length }} shipments</span></b-col>
        </b-row>
        <b-table striped
        :items="filteredItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @row-clicked="rowClick"
        >
            <template slot="shipment_id" scope="field">
                {{ field.item.shipment_id }}
            </template>
            <template slot="purchaser" scope="data">
                {{ data.value.name }}                    
            </template>
            <template slot="insured_value" scope="data">
                {{ data.value | currency }}             
            </template>
            <template slot="Items" scope="data">
                {{ getTotal(data.value) | currency }}             
            </template>
            <template slot="profit" scope="field">
                {{ (field.item.insured_value / getTotal(field.item.Items) * 100 - 100).toFixed(2) }}%     
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
  props: ["shipments", "stores"],
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
            !search.purchaserFilter)
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
          tdClass: "text-left"
        },
        {
          key: "date_created",
          label: "Shipment Date",
          thClass: "text-right",
          tdClass: "text-right small",
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
        },
        {
          key: "Items",
          label: "Cost/Payout",
          thClass: "text-right",
          tdClass: "text-right"
        },
        {
          key: "profit",
          label: "Profit %",
          thClass: "text-right",
          tdClass: "text-right"
        }
      ]
    };
  },
  methods: {
    rowClick(shipment) {
      this.$router.push("shipments/" + shipment.shipment_id);
    },
    getTotal(items) {
      let total = _.sumBy(items, function(i) {
        return Number(i.payout);
      });
      return total;
    }
  }
};
</script>