<template>
    <section>
        <b-card header-bg-variant="dark" header-text-variant="white" align="left">
            <b-row>
                <b-col cols="4">
                    <label>Store</label>
                    <div class="input-group">
                        <select  class="form-control custom-select"  v-model="storeFilter" @change="sendUpdate()">
                            <option :value="null">- All Stores ({{ storeInfo.length }}) -</option>
                            <option :value="store.id" v-for="store in storeInfo" v-bind:key="store.id">{{ store.name | capitalize }}</option>
                        </select>
                    </div>                             
                </b-col>
                <b-col cols="3">
                    <label>Shipment / Tracking ID</label>
                    <div class="input-group">
                        <input class="form-control" v-model="shipmentFilter" @change="sendUpdate()">
                    </div>                  
                </b-col>
                
                <b-col cols="3">                  
                    <label>Purchaser Name</label>
                    <div class="input-group">
                        <input class="form-control" v-model="purchaserFilter" @change="sendUpdate()">
                    </div>
                </b-col>                        
            </b-row>
            <div class="w-100" style="height: 10px"></div>
            <b-row>
                <b-col cols="12" md="auto" style="padding-top: 18px">
                    <b-btn-group>
                        <b-btn @click="setFilter('7days')" :variant="(quickDateFilter == '7days') ? '' : 'light'">7 Days</b-btn>
                        <b-btn @click="setFilter('30days')" :variant="(quickDateFilter == '30days') ? '' : 'light'">30 Days</b-btn>
                        <b-btn @click="setFilter('90days')" :variant="(quickDateFilter == '90days') ? '' : 'light'">90 Days</b-btn>
                        <b-btn @click="setFilter('ytd')" :variant="(quickDateFilter == 'ytd') ? '' : 'light'">Year to Date</b-btn>
                    </b-btn-group>
                </b-col>
                <b-col cols="2">
                    <b-row>                     
                        <b-col ><label class="small no-margin">Date From <span style="padding: 0 10px">&rarr;</span> Date To </label></b-col>
                    </b-row>                
                    <b-row>                     
                        <b-col style="padding-right: 0"> <datepicker v-model="From" input-class="form-control picker" format="MM/dd/yy" /></b-col>
                        <b-col style="padding-right: 0"> <datepicker v-model="To" input-class="form-control picker" format="MM/dd/yy" /></b-col>
                    </b-row>
                </b-col> 
                <b-col v-if="dateRangeTo && dateRangeFrom" style="padding-top: 28px"><span class="small pointer red" @click="resetDate()"><icon name="undo" scale=".7" /> reset</span></b-col> 
            </b-row>
        </b-card>
    </section>
</template>
<script>
export default {
  props: ["storeInfo"],
  watch: {
    To: function() {
      if (this.From) {
        this.quickDateFilter = null;
        this.dateRangeTo = this.To.getTime() / 1000;
        this.dateRangeFrom = this.From.getTime() / 1000;
      }
    },
    From: function() {
      if (this.To) {
        this.quickDateFilter = null;
        this.dateRangeTo = this.To.getTime() / 1000;
        this.dateRangeFrom = this.From.getTime() / 1000;
      }
    }
  },
  data() {
    return {
      store: null,
      users: [],
      storeFilter: null,
      userFilter: null,
      purchaserFilter: null,
      shipmentFilter: null,
      dateFilter: null,
      statusFilter: "All",
      From: null,
      To: null,
      quickDateFilter: null,
      dateRangeFrom: null,
      dateRangeTo: null,
    };
  },
  methods: {
    sendUpdate() {
      let store_id = this.storeFilter;
      this.store = this.storeFilter
        ? _.find(this.storeInfo, function(s) {
            return s.id == store_id;
          })
        : null;
      this.users = this.store ? [] : [];
      this.userFilter = this.storeFilter ? this.userFilter : null;
    },
    setFilter(type) {
      let to = new Date();
      let from = new Date();      

      if (type == "ytd") {
        from = new Date(new Date().getFullYear(), 0, 1);
      } else {
        let days = parseInt(type);  
        from = to.getTime() - (days * 24 * 60 * 60 * 1000); 
      }
      this.dateRangeFrom = from / 1000;
      this.dateRangeTo = to.getTime() / 1000;
      this.quickDateFilter = type;
    },
    resetDate() {
      this.To = null;
      this.From = null;
      this.quickDateFilter = null;
      this.dateRangeTo = null;
      this.dateRangeFrom = null;
    }
  }
};
</script>
