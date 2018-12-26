<template>
    <section id="item-list" class="fade-in text-left">
        <b-row>
          <b-col>
            <span class="badge badge-info">
              {{ filteredItems.length }} inventory items
            </span>
          </b-col>
        </b-row>
        <b-table striped
        :items="filteredItems"
        :fields="fields"
        :current-page="currentPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :per-page="perPage"
        :filter="filter"
        :small="false"
        ref="table"
        >
        <template slot="status" scope="field">
                <span v-if="(field.item.date_hold_expire > Date.now() / 1000)" style="opacity: .3">
                  <icon name="lock" />
                </span>
            </template>
        </b-table>
        <div class="w-100" style="height: 30px"></div>
        <b-row v-if="filteredItems.length > perPage">
          <b-col> {{ filteredItems.length }} inventory items </b-col>
          <b-col class="d-flex justify-content-end">
              <b-pagination :total-rows="filteredItems.length" :per-page="perPage" :hide-goto-end-buttons="false" v-model="currentPage" />
          </b-col>
        </b-row>
    </section>
</template>
<script>
import currency from "vue2-filters/src/other/currency";
import helpers from "@/utils/helpers";
export default {
  props: ["title", "itemInfo", "metalInfo"],

  created() {
    this.items = this.itemInfo;
  },

  computed: {
    filteredItems() {
      let search = this.$parent.$refs.search;
      let currentTime = Date.now() / 1000;
      return this.items.filter(
        item =>
          ((search.statusFilter == "Expired" &&
            item.date_hold_expire < currentTime) ||
            (search.statusFilter == "Hold" &&
              item.date_hold_expire > currentTime) ||
            search.statusFilter == "All") &&
          (item.store_id == search.storeFilter || !search.storeFilter) &&
          (item.metal_id == search.metalFilter || !search.metalFilter) &&
          (item.purity_id == search.purityFilter || !search.purityFilter)
      );
    }
  },
  data() {
    return {
      sortBy: "date_transaction",
      sortDesc: true,
      items: [],
      selectedID: [],
      setID: [],
      currentPage: 1,
      perPage: 20,
      filter: null,
      fields: [
        {
          key: "status",
          label: " ",
          tdClass: "text-left small"
        },
        {
          key: "id",
          label: "Item ID",
          tdClass: "text-left small"
        },
        {
          key: "metal_id",
          label: "Metal",
          tdClass: "text-left capitalize",
          formatter: value => {
            return helpers.getMetal(value);
          }
        },
        {
          key: "purity_id",
          label: "Purity",
          tdClass: "text-left",
          formatter: value => {
            return helpers.getPurity(value);
          }
        },
        {
          key: "weight",
          label: "Weight",
          tdClass: "text-left",
          formatter: value => {
            return value + " grams";
          }
        },
        {
          key: "description",
          label: "Description",
          tdClass: "text-left"
        },
        {
          key: "date_transaction",
          label: "Transaction Date",
          tdClass: "text-right",
          thClass: "text-right",
          sortable: true,
          formatter: value => {
            return helpers.dateString(value);
          }
        },
        {
          key: "value",
          label: "Value",
          tdClass: "text-right",
          thClass: "text-right",
          sortable: true,
          formatter: value => {
            return currency(value);
          }
        }
      ]
    };
  },
  methods: {
    checkStatus(id) {
      return true;
    },
    sendUpdate() {
      // send selectedItems array to parent
      this.$emit("updateTotal", this.selectedItems);
    }
  }
};
</script>
<style lang="scss">
th:focus,
th:active,
th {
  outline: none;
  text-align: left;
}
</style>
