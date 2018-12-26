<template>
    <section id="store-list" class="fade-in text-left">
        <b-row>
            <b-col>
                <b-table hover
                :items="filteredItems"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                @row-clicked="rowClick"
                >
                    <template slot="address" scope="field">
                        {{ field.item.address_1 }} {{ field.item.address_2 }} {{ field.item.city }}, {{ field.item.state }}
                    </template>
                    <template slot="action" scope="field">
                        <span class="pointer" @click="$router.push('stores/' + field.item.id)"><icon name="edit" /></span>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </section>
</template>
<script>
export default {
  props: ["title", "stores"],
  created() {
    this.items = this.stores;
  },
  computed: {
    filteredItems() {
      let filter = this.filter;
      return this.items.filter(
        item => item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1
      );
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      filter: "",
      fields: [
        {
          key: "id",
          label: "ID",
        },
        {
          key: "name",
          label: "Store Name",
          sortable: true,
          tdClass: "text-left"
        },
        {
          key: "address",
          label: "Address",
          tdClass: "text-left"
        },
        {
          key: "action",
          tdClass: "text-right",
          label: " "
        }
      ]
    };
  },
  methods:{
    rowClick(store){
      this.$router.push('stores/' + store.id)
    }
  }
};
</script>