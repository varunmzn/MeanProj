
<template>
  <div id="app" :class="(!payload) ? 'login fade-in':''">
    <navbar-top v-if="payload" :payload="payload" @logout="logout"></navbar-top>
    <b-container>
      <router-view :payload="payload"></router-view>
    </b-container>
  </div>
</template>

<script>
import dataResource from "@/utils/resources";
import NavbarTop from "@/components/_layout/NavbarTop";
export default {
  name: "app",
  components: {
    "navbar-top": NavbarTop
  },
  watch: {
    "$route.path"() {
      if (!this.payload)
        dataResource
          .payload()
          .then(payload => (this.payload = payload))
          .catch(errorResponse => {
            // Handle error...
            console.log(errorResponse);
          });
    }
  },
  created() {
    dataResource
      .payload()
      .then(payload => (this.payload = payload))
      .catch(errorResponse => {
        // Handle error...
        console.log(errorResponse);
      });
  },
  data() {
    return {
      dataLoaded: false,
      payload: null,
      spotPrices: null
    };
  },
  methods: {
    logout() {
      this.payload = null;
      this.$router.push("/logout");
    }
  }
};
</script>

<style src="@/styles/main.scss" lang="scss"></style>
