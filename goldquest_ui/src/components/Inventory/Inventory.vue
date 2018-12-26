<template>
    <section id="inventory">
        <div class="fade-in">
            <b-row align="left">
              <b-col>
                  <h2 class="header fade-in"><span @click="$router.push('/reports')">Reports</span> <icon name="chevron-right" /> <small>Inventory</small></h2>
              </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <item-search ref="search" v-bind:metalInfo="metals" v-bind:storeInfo="stores"></item-search>
                </b-col>               
            </b-row>
            <div style="height:30px" />
            <!-- Select Items -->
            <item-list ref="list" v-if="dataLoaded" v-bind:itemInfo="items" v-bind:metalInfo="metals"></item-list>
        </div>
    </section>
</template>

<script>
import metalsData from "@/data/metals.json";
import dataResource from "@/utils/resources";
import helpers from "@/utils/helpers";
import ItemList from "@/components/Inventory/ItemList";
import ItemSearch from "@/components/Inventory/ItemSearch";
export default {
  components: {
    "item-list": ItemList,
    "item-search": ItemSearch
  },
  data() {
    return {
      user: { id: null },
      store: {},
      stores: [],
      items: [],
      metals: [],
      dataLoaded: false
    };
  },
  created() {
    this.getStores();
    this.getItems();
    this.metals = this.getMetals();
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
    getMetals() {
      return metalsData;
    },
    getItems() {
      return dataResource.API.get("/items")
        .then(response => {
          this.items = response.data;
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
