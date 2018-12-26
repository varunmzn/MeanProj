<template>
    <section id="stores">
        <b-row align="left">
            <b-col>
                <h2 class="header fade-in">
                  <span @click="$router.push('/admin')">Admin</span> <icon name="chevron-right" /> <small>Stores</small>
                  <b-button size="sm" variant="default" class="float-right open-sans" :disabled="addStore" @click="addStore = !addStore">
                    <icon name="plus-circle" scale=".8" />NEW STORE
                  </b-button>
                </h2>              
            </b-col>
        </b-row>
      <store-list v-show="!addStore" v-if="dataLoaded" ref="list" v-bind:stores="stores"></store-list>
      <store-form v-show="addStore" ref="form" v-bind:storeInfo="store" @hideForm="hideForm" @getStores="getStores"></store-form>
    </section>
</template>

<script>
import dataResource from "@/utils/resources";
import StoreList from "@/components/Stores/StoreList";
import StoreForm from "@/components/Stores/StoreForm";
export default {
  components: {
    StoreList,
    StoreForm
  },
  created() {
    this.getStores();
  },
  data() {
    return {
      store: { id: null, name: null, address_1: null },
      stores: [],
      dataLoaded: false,
      addStore: false
    };
  },
  methods: {
    getStores() {
      return dataResource.API.get("/stores")
        .then(response => {
          this.stores = response.data;
          this.dataLoaded = true;
        })
        .catch(errorResponse => {
          // Handle error...
          console.log("API responded with:", errorResponse);
        });
    },
    hideForm() {
      this.addStore = false;
    }
  }
};
</script>