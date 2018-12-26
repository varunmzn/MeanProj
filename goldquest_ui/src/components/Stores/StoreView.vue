<template>
    <section id="stores">
        <b-row align="left">
            <b-col>
                <h2 class="header fade-in"><span @click="$router.push('/admin')">Admin</span> 
                    <icon name="chevron-right" /> <span @click="$router.push('/admin/stores')">Stores</span>
                    <icon name="chevron-right" /> <small v-if="dataLoaded">{{ (!store.id) ? 'Add New Store' : store.name }}</small>
                </h2>
            </b-col>
        </b-row>
        <div class="w-100" style="height: 20px"></div>
      <store-form v-if="dataLoaded" v-bind:storeInfo="store"></store-form>
    </section>
</template>

<script>
import dataResource from "@/utils/resources";
import StoreForm from "@/components/Stores/StoreForm";
export default {
  components: {
    StoreForm
  },
  created() {
    this.getStore();
  },
  data() {
    return {
      user: { id: null },
      store: {},
      dataLoaded: false
    };
  },
  methods: {
    getStore() {
      let _storeId = this.$route.params.storeId;
      return dataResource.API.get("/stores/" + _storeId)
        .then(response => {
          this.store = response.data;
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