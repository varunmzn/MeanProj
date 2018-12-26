<template>
    <section id="item-list" class="fade-in">
        <b-row class="text-left">
          <b-col><b-btn class="badge badge-secondary" :disabled="true">{{ filteredItems.length }} items</b-btn></b-col>
        </b-row>
        <b-table striped hover
        :items="filteredItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :small="false"
        ref="table"
        >
        <template slot="checkbox" scope="data">
            <b-form-checkbox v-model="selectedID" :value="data.item.id" :true-value="data.item.id"></b-form-checkbox>
        </template>
        </b-table>
        <div class="w-100" style="height: 30px"></div>
        <b-row v-if="filteredItems.length > perPage">
          <b-col class="d-flex justify-content-end">
              <b-pagination :total-rows="filteredItems.length" :per-page="perPage" :hide-goto-end-buttons="true" v-model="currentPage" />
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
    this.selectedID = this.$parent.selectedID;
  },

  computed: {
    filteredItems() {
      let search = this.$parent.$refs.search;
      return this.itemInfo.filter(
        item =>
          (item.metal_id == search.metalFilter || !search.metalFilter) &&
          (item.purity_id == search.purityFilter || !search.purityFilter) &&
          (item.description.toLowerCase().indexOf(search.descriptionFilter) > -1 || !search.descriptionFilter)
      );
    },
    selectedItems() {
      return this.filteredItems.filter(item =>
        this.selectedID.includes(item.id)
      );
    }
  },
  watch: {
    selectedID: function() {
      this.sendUpdate();
    }
  },
  data() {
    return {
      items: [],
      selectedID: [],
      setID: [],
      currentPage: 1,
      perPage: 20,
      filter: null,
      fields: [
        {
          key: "checkbox",
          tdClass: "checkbox text-left",
          label: " "
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
            return this.$parent.getMetal(value);
          }
        },
        {
          key: "purity_id",
          label: "Purity",
          tdClass: "text-left",
          formatter: value => {
            return this.$parent.getPurity(value);
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
          key: "date_hold_expire",
          label: "Hold Date Expired",
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
