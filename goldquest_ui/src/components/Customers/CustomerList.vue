<template>
    <section id="customer-list" class="fade-in text-left">
        <b-row class="text-left">
          <b-col><span class="badge badge-info" :disabled="true">{{ filteredItems.length }} customers</span></b-col>
        </b-row>
        <b-table hover
        :items="filteredItems"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
          @row-clicked="rowClick"
        >
            <template slot="name" scope="field">
                {{ field.item.first_name }} {{ field.item.last_name }}
            </template>
            <template slot="address" scope="field">
                {{ field.item.address_1 }} {{ field.item.address_2 }} {{ field.item.city }}, {{ field.item.state }} {{ field.item.postal_code }}
            </template>
            <template slot="actions" scope="field">
                <span class="pointer" :id="field.item.id"><icon name="edit" /></span>
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
export default {
  props: ["title", "customers"],
  created() {
    this.items = this.customers;
  },
  computed: {
    filteredItems() {
      let filter = this.$parent.$refs.search.customerFilter;
      let store_id = this.$parent.$refs.search.storeFilter;
      return this.items.filter(
        item =>
          (item.ident_num.toLowerCase().indexOf(filter.toLowerCase()) != -1 ||
          item.first_name.toLowerCase().indexOf(filter.toLowerCase()) != -1 ||
          item.last_name.toLowerCase().indexOf(filter.toLowerCase()) != -1) &&
          (item.store_id == store_id || !store_id)
      );
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      filter: null,
      fields: [
        {
          key: "ident_num",
          label: "ID Number",
          tdClass: "text-left"
        },
        {
          key: "name",
          label: "Customer Name",
          tdClass: "text-left bigtext"
        },
        {
          key: "address",
          label: "Address",
          tdClass: "text-left"
        },
        {
          key: "phone",
          label: "Phone",
          tdClass: "text-left"
        },
        {
          key: "actions",
          label: " ",
          tdClass: "text-right"
        }
      ]
    };
  },
  methods: {
    rowClick(customer) {
      this.$router.push("/customers/" + customer.id);
    }
  }
};
</script>
