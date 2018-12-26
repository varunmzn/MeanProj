<template>
    <section>
        <div class="card info">
            <div class="card-body" style="padding: 20px">
                <b-row align="left" v-if="step == 'print'">
                 <b-col cols="8">                        
                        <div>
                            <h4 style="margin: 0">{{ store.name }}</h4>
                            {{ store.address_1 }} {{ store.address_2 }} {{ store.city }}, {{ store.state }} {{ store.postal_code }}<br />
                            {{ store.phone }}<br />
                            LICENSE: {{ store.license }}
                        </div>
                        <div class="w-100" style="height: 20px" />                       
                        <div>
                            <h5 style="margin:0">{{ customerInfo.first_name }} {{ customerInfo.last_name }}</h5>
                            {{ customerInfo.address_1 }}<br /> {{ customerInfo.city }} {{ customerInfo.state }} {{ customerInfo.postal_code }}
                        </div>
                    </b-col>
                    <b-col>
                        <div>
                            <label>Transaction ID:</label>
                            <span class="float-right">{{ transaction.trans_id }}</span>
                        </div>
                        <div>
                            <label>Bill of Sale</label>
                            <span class="float-right">{{ dateString(transaction.date_created) }}</span>
                        </div>
                        <div>
                            <label>Eligible for Sale: </label>
                            <span class="float-right">{{ dateString(transaction.date_hold_expire) }}</span>
                        </div>
                    </b-col>
                </b-row>
                <hr style="margin: 25px 0" v-if="step == 'print'" />
                <!-- v-for metals -->
                <div class=" text-left" v-for="metal in metalInfo" v-bind:key="metal.id" v-if="summaryInfo[metal.name].count > 0">
                    <b-row class="item-row">
                        <b-col><div style="font-size: 20px"><b-badge :variant="metal.name">{{ metal.name | capitalize }}</b-badge></div></b-col>
                    </b-row>
                    <!-- v-for item-row -->
                    <b-row class="item-row fade-in" v-for="(item, index) in summaryInfo[metal.name].items" v-bind:key="index">
                        <b-col cols="4" class="purity">
                            <label v-if="index == 0">Purity</label>
                            <div>
                                {{ showSelected(metal.options, item.purity_id) }}
                                <span class="spot">@ {{ Number(item.payout / item.weight) | currency }} / gram</span>
                            </div>
                        </b-col>
                        <b-col cols="2" class="weight">
                            <label v-if="index == 0">Weight</label>
                            <div>{{ item.weight }} grams</div>
                        </b-col>
                        <b-col cols="4" class="description">
                            <label v-if="index == 0">Description</label>
                            <div>{{item.description }}</div>
                        </b-col>
                        <b-col cols="2" class="text-right">
                            <label v-if="index == 0">Payout</label>
                            <div class="serif">{{ item.payout | currency }}</div>
                        </b-col>
                    </b-row>
                    <!-- End v-for item-row -->
                    <div class="w-100" style="height: 20px"></div>
                </div>
                <!-- End v-for metals -->
                <div v-if="step == 'print'">
                    <b-row>
                        <b-col class="text-left" style="padding-left: 25px">
                            {{ summaryInfo.count }} {{ summaryInfo.count | pluralize('item')}}
                        </b-col>
                        <b-col class="payout text-right">
                            Total Payout
                            <span style="padding-left: 60px">{{ summaryInfo.total | currency }}</span>
                        </b-col>
                    </b-row>
                    <hr />
                    <div class="w-100" style="height: 40px"></div>
                    <b-row>
                        <b-col class="text-left">
                            By signing this document, seller certifies that he or she is legally empowered to sell or dispose of the above
                            property and that said property is free and clear of all liens and encumberances. Seller will be responsible for any
                            legal fees incurred by purchaser resulting from the transaction. All transactions are final.
                        </b-col>
                    </b-row>
                    <div class="w-100" style="height: 80px"></div>
                    <b-row>
                        <b-col class="text-left">
                            <hr />
                            <h5 style="margin:0"><small>Buyer:</small> {{ store.name }}</h5>
                        </b-col>
                        <b-col cols="2" />
                        <b-col class="text-left">
                            <hr />
                            <h5 style="margin:0"><small>Seller:</small> {{ customerInfo.first_name }} {{ customerInfo.last_name }}</h5>
                        </b-col>
                    </b-row>
                </div>
                <div class="w-100" style="height: 40px"></div>
            </div>
        </div>
    </section>
</template>
<script>
import helpers from "@/utils/helpers";
export default {
  created() {},
  props: [
    "step",
    "store",
    "transaction",
    "metalInfo",
    "customerInfo",
    "summaryInfo"
  ],
  methods: {
    dateString(value) {
      return helpers.dateString(value);
    },
    showSelected(options, _id, _get = null) {
      let opt = _.find(options, o => o.id == _id);
      return _get ? opt[_get] : opt.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.spot {
  padding: 3px 6px;
  color: #666;
}
label {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
}
</style>
