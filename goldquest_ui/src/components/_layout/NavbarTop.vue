<template>
    <header class="d-print-none">
        <b-container>
            <b-row>
                <b-col class="text-left logo"><img src="/static/goldquest-logo.png"></b-col>
                <b-col class="user-panel text-right">
                    <h4>{{ payload.given_name }} {{ payload.family_name }}</h4>
                    <span class="pointer" @click="navigate('/account')">My Account</span> | <span class="pointer" @click="$parent.logout()">Sign out</span>
                </b-col>
            </b-row>
            <b-nav tabs>
                <b-nav-item :active="$route.name == 'Dashboard'" @click="navigate('/')">Dashboard</b-nav-item>
                <b-nav-item :active="$route.path.includes('buy')" @click="navigate('/buy')">Buy</b-nav-item>
                <b-nav-item :active="$route.path.includes('sell')" @click="navigate('/sell')">Sell</b-nav-item>
                <b-nav-item :active="$route.path.includes('customers')" @click="navigate('/customers')">Customers</b-nav-item>
                <b-nav-item :active="$route.path.includes('reports')" @click="navigate('/reports')">Reports</b-nav-item>
                <b-nav-item v-if="admin" :active="$route.path.includes('admin')" @click="navigate('/admin')">Admin</b-nav-item>
            </b-nav>
        </b-container>
    </header>
</template>

<script>
export default {
  props: ["payload"],
  created() {
    this.admin =
      this.payload["cognito:groups"] &&
      this.payload["cognito:groups"].includes("goldquest-admin");
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background: #333333;
  margin-bottom: 20px;
}
a {
  color: #fff;
  font-size: 0.9em;
}
.nav-tabs {
  font-family: "Roboto Slab", sans-serif;
  border-bottom: 0;
  .nav-item {
    margin-right: 10px;
    margin-bottom: 0;
    background: #424242;
    .nav-link:not(.active) {
      &:active,
      &:focus,
      &:hover {
        border-color: transparent;
        background: #666;
      }
    }
  }
}

.logo {
  padding: 20px 15px;
}

.user-panel {
  font-size: 12px;
  color: white;
  padding-top: 15px;
  line-height: 16px;
  h4 {
    margin-bottom: 5px;
    font-size: 16px;
  }
}
</style>
