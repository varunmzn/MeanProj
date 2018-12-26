<template>
    <section class="fade-in">
        <b-row align="left">
            <b-col>
                <h3 class="header d-print-none" v-if="step != 'view'">{{ (step == 'print') ? "Transaction Complete" : "Review Transaction" }}</h3>
                <h2 class="header d-none d-print-block" style="margin-bottom: 40px">Shipping / Packing Statement</h2>
            </b-col>
        </b-row>
        <div class="card-deck">
            <b-card class="info" align="left">
                <div slot="header">Company Information</div>
                <div>
                   {{ store.name }}<br/>
                   <div>{{ store.address_1 }} {{ store.address_2 }}</div>
                   <div>{{ store.city }}, {{ store.state }} {{ store.zip }}</div>
                </div>
            </b-card>
            <b-card class="info" align="left">
                <div slot="header">Buyer Information</div>
                <div>                                
                    {{ shipment.purchaser.name }}<br>
                    <div style="white-space: pre; white-space: pre-line;">{{ shipment.purchaser.address }}</div>              
                </div>
            </b-card>
            <b-card class="info" align="left">
                <div slot="header">Statement Details: <span class="float-right">#{{ shipment.id }}</span></div>
                <div>                                
                    Shipment Date: {{  dateString(shipment.date_created) }}<br>
                    Carrier: {{ shipment.carrier_name }}<br>
                    Tracking ID: {{ shipment.tracking_id }}<br>
                    Shipper Name: {{ shipment.user_name }} <br>              
                </div>
            </b-card>
        </div>
        <div class="w-100" style="height: 30px"></div>
        <b-card class="info text-left" header="Statement Summary">
            <b-row class="item-row" v-for="(metal, index) in metalInfo" v-bind:key="index">
                <b-col cols="3">
                    <div style="font-size: 20px"><b-badge :variant="metal.name">{{ metal.name | capitalize }}</b-badge></div>
                </b-col>
                <b-col cols="3">
                    <div style="padding-top: 8px">{{ metalSummary[metal.name].weight }} grams</div>
                </b-col>
                <b-col cols="6" class="text-right  d-print-none" style="padding-top: 8px">
                    <div class="serif">{{ metalSummary[metal.name].total | currency }}</div>
                </b-col>
            </b-row>
            <div class="w-100" style="height: 10px"></div>
            <b-row class="item-row bigtext">
                <b-col><b class="d-print-none">Total</b><b class="d-none">Insured Value</b></b-col>
                <b-col class="serif text-right"><b>{{ shipment.insured_value | currency }}</b></b-col>
            </b-row>
        </b-card>      
        <div v-for="metal in metalsList" v-bind:key="metal.id">
            <div class="w-100" style="height: 30px"></div>
            <b-row class="text-left item-row">
                <b-col><span class="bigtext"><b-badge :variant="metal.name">{{ metal.name | capitalize }}</b-badge></span>  Statement Details </b-col>
                <b-col class="text-right small" style="padding-top: 10px">
                    <b>NY Spot Price</b>
                    <span class="serif" style="padding-left: 20px">{{ $parent.spotPrices[metal.name].Low | currency }}</span>
                </b-col>
            </b-row>
            <b-card class="text-left info">
                <b-row class="item-row fade-in" v-for="(item, index) in metalSummary[metal.name].items" v-bind:key="index" v-if="item.purity_id && item.weight > 0">
                    <b-col cols="3" class="purity">
                        <label v-if="index == 0">Purity</label>
                        <div>
                            {{ $parent.getPurity(item.purity_id) }}
                            <span class="spot d-print-none">@ {{ (item.value / item.weight) | currency }} / gram</span>
                        </div>
                    </b-col>
                    <b-col cols="3" class="weight">
                        <label v-if="index == 0">Weight</label>
                        <div>{{ item.weight }} grams</div>
                    </b-col>
                    <b-col cols="6" class="text-right d-print-none">
                        <label v-if="index == 0">Value</label>
                        <div class="serif">{{ item.value | currency }}</div>
                    </b-col>
                </b-row>
                <b-row class="item-row" style="margin-top: 15px">
                    <b-col cols="3">
                        <b>{{ metal.name | capitalize }} Weight Sum</b>
                    </b-col>
                    <b-col cols="3">
                        {{ metalSummary[metal.name].weight }} grams
                    </b-col>
                    <b-col cols="6" class="text-right d-print-none">
                        <div class="serif">{{ metalSummary[metal.name].total | currency }}</div>
                    </b-col>
                </b-row>
            </b-card>
        </div>
    </section>
</template>
<script>
import helpers from "@/utils/helpers";
export default {
  created() {},
  computed: {
    metalsList() {
      return this.metalInfo.filter(
        metal => this.metalSummary[metal.name].count > 0
      );
    }
  },
  props: ["metalInfo", "metalSummary", "shipment", "store", "step"],
  methods: {
    dateString(date) {
      return helpers.dateString(date);
    }
  }
};
</script>

<style lang="scss" scoped>
.spot {
  padding: 3px 6px;
  color: #666;
}
.payout {
  font-size: 16px;
}
label {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
}
</style>
