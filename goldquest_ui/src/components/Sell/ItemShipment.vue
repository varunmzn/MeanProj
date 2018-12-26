<template>
    <section>
        <b-row align="left">
            <b-col>
                <h3 class="header d-print-none">How Are You Sending Your Items</h3>
            </b-col>
        </b-row>
        <div class="w-100" style="height: 20px"></div>
        <b-row class="text-left" v-if="!shipmentMethod">
            <b-col>
                <b-card title="Create Shipping / Sales Statement" bg-variant="default pointer" @click="setMethod('carrier')">
                    <p class="card-text">Send Your Items Using Local or National Carrier (e.g Parcel Pro)</p>
                </b-card>
            </b-col>
            <b-col>
                <b-card title="Ship to GoldQuest" bg-variant="goldquest pointer" @click="setMethod('goldquest')">
                    <div class="card-text">
                        Earn more with GoldQuest! If you are not currently using GoldQuest for your needs, click here to learn more.
                        <img src="/static/goldquest-logo.png" style="margin-top: 15px">
                    </div>
                </b-card>
            </b-col>
        </b-row>
        <!--Shipment Form-->
        <b-row class="text-left" v-if="shipmentMethod == 'carrier'">
            <b-col>
                <div class="form-group">
                    <label>Purchaser Name</label>
                    <input class="form-control" v-model="shipment.purchaser.name">
                </div>
                <div class="form-group">
                    <label>Purchaser Address</label>
                    <textarea class="form-control" rows="4" v-model="shipment.purchaser.address"></textarea>                    
                </div>
            </b-col>
            <b-col>
                <div class="form-group">
                    <label>Tracking Number</label>
                    <input class="form-control" v-model="shipment.tracking_id">
                </div>
                <div class="form-group">
                    <label>Carrier Name</label>
                    <input class="form-control" v-model="shipment.carrier_name">
                </div>
                
            </b-col>

            <b-col>
                <div class="form-group">
                    <label>Shipping Cost</label>
                    <input class="form-control" v-model="shipment.shipping_cost">
                </div>
                <div class="form-group">
                    <label>Insurance Cost</label>
                    <input class="form-control" v-model="shipment.insurance_cost">
                </div>
                <div class="form-group">
                    <label>Insured Value</label>
                    <input class="form-control" disabled v-model="shipment.insured_value">
                </div>
            </b-col>
        </b-row>
        <!--GoldQuest Form-->
        <b-row class="text-left" v-if="shipmentMethod == 'goldquest'">
            <b-col cols="3">
                <div class="form-group">
                    <label>Carrier Name</label>
                    <input class="form-control" disabled v-model="shipment.carrier_name">
                </div>
                <div class="form-group">
                    <label>Insured Value</label>
                    <input class="form-control" disabled v-model="shipment.insured_value_text">
                </div>
            </b-col>
            <b-col cols="8" class="ml-auto">
                <small>Ship to:<br /></small>
                <img src="/static/goldquest-logo.png" style="margin-bottom: 15px">
                <div>
                    Gold Refinement Services, LTD<br />
                    One Seneca Tower 28th Floor<br />
                    Buffalo, NY 14203
                </div>
            </b-col>
        </b-row>
        <div class="w-100" style="height: 20px"></div>
        <b-row class="text-left small" v-if="shipmentMethod">
            <b-col><i class="pointer" @click="setMethod(null)">&laquo; Change Shipping Type</i></b-col>
        </b-row>
    </section>
</template>
<script>
import currency from "vue2-filters/src/other/currency";
export default {
  props: ["shipment", "summaryInfo"],
  created() {
    this.shipment.insured_value = this.summaryInfo.total;
    this.shipment.insured_value_text = currency(this.summaryInfo.total);
    this.shipmentMethod = this.shipment.method;
  },
  data() {
    return {
      shipmentMethod: null
    };
  },
  methods: {
    setMethod(option) {
      this.shipmentMethod = option;
      this.shipment.method = option;
      if (option == "goldquest") {
        this.shipment.carrier_name = "Parcel PRO";
        this.shipment.purchaser.name = "Gold Refinement Services, LTD";
        this.shipment.purchaser.address =
          "One Seneca Tower 28th Floor\nBuffalo, NY 14203";
      }
      this.$emit("updateShipment", this.shipment);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  min-height: 180px;
}
</style>
