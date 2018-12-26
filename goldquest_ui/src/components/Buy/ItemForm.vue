<template>
    <section>
        <b-row v-for="metal in metalInfo" v-bind:key="metal.id">
            <b-col>
                <b-card header-bg-variant="primary" header-text-variant="white" align="left">
                    <b-row slot="header">
                        <b-col cols="7">
                            <h5 class="float-left metal">
                                <b-badge :variant="metal.name">&nbsp;&nbsp;&nbsp;</b-badge>
                            </h5>
                            <h4 class="float-left">{{ metal.name | capitalize }}</h4>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col cols="9" class="spot-prices text-right">
                                    <b>NY Spot Price</b>
                                </b-col>
                                <b-col cols="3" class="text-right">
                                    <span class="serif">{{ $parent.spotPrices[metal.name].Low | currency }}</span>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <!-- v-for item-row -->
                            <b-row v-for="(item, index) in itemInfo[metal.name]" v-bind:key="index" class="item-row fade-in">
                                <b-col cols="2" class="purity">
                                    <label v-if="index == 0">Purity</label>
                                    <b-form-select value-field="id" text-field="name" v-model="item.purity_id" :options="metal.options" @input="$parent.updateItem(item)" />
                                    <div class="remove-btn" v-if="index > 0">
                                        <span @click="$parent.removeItem(metal, item)">
                                            <icon name="minus-circle" class="pointer" scale=".8"></icon>
                                        </span>
                                    </div>
                                </b-col>
                                <b-col cols="2" class="weight">
                                    <label v-if="index == 0">Weight</label>
                                    <b-input-group append="grams">
                                        <input class="form-control text-right" v-model="item.weight" @change="$parent.updateItem(item)">
                                    </b-input-group>
                                </b-col>
                                <b-col cols="3" class="description">
                                    <label v-if="index == 0">Description</label>
                                    <b-form-select v-model="item.description" :options="itemOptions" :value="null" />
                                </b-col>
                                <b-col cols="3" class="inscription">
                                    <label v-if="index == 0">&nbsp;</label>
                                    <div class="small" style="padding-top: 8px">
                                        <b-button size="sm" variant="outline-secondary" @click="uploadImage = !uploadImage">
                                            <icon name="file-image-o" class="align-middle" scale=".9"></icon> Images
                                        </b-button>
                                        <b-button size="sm" variant="outline-secondary" @click="addNote = !addNote">
                                            <icon name="list" class="align-middle" scale=".9"></icon> Notes / inscriptions
                                        </b-button>
                                    </div>
                                </b-col>
                                <b-col cols="2" class="text-right">
                                    <label v-if="index == 0">Payout</label>
                                    <div class="payout serif">
                                        <span @click="$parent.resetItem(item)">
                                            <icon name="refresh" scale=".7" v-if="item.reset" />                                               
                                        </span>
                                        <span>{{ item.payout | currency }}</span>
                                        <span :id="metal.name+'-edit-'+index"><icon name="edit" v-if="item.payout > 0" /></span>
                                        <b-popover :target="metal.name+'-edit-'+index" placement="top" triggers="click blur" @shown="onShown(metal.name+'-edit-'+index, item.override)">
                                            <div class="text-center">Max: <b>{{ item.value * storeInfo.payout_max | currency }}</b></div>
                                            <b-input-group prepend="$" class="payout serif" style="padding: 12px 0">
                                                <input v-model="item.override" class="form-control no-focus override" :ref="metal.name+'-edit-'+index" @change="checkOverride(item)">
                                                <b-input-group-append>
                                                    <b-btn :disabled="(item.override == item.payout)" variant="success" @click="$parent.updateItem(item, true)">
                                                        <icon name="check" />
                                                    </b-btn>
                                                </b-input-group-append>
                                            </b-input-group>                                               
                                        </b-popover>
                                    </div>
                                </b-col>
                            </b-row>
                            <!-- End v-for item-row -->
                            <b-row>
                                <b-col colspan="5" style="padding-left: 25px; margin-top: 10px">
                                    <b-button size="sm" variant="info" @click="$parent.addItem(metal)">
                                        <icon name="plus-circle" class="align-middle" scale=".9"></icon> add
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
            <div class="w-100" style="height: 30px"></div>
        </b-row>
        <div>
            <!-- the modal -->
            <b-modal id="imageModalItem" size="sm" v-model="uploadImage">
                Attach images
            </b-modal>
            <!-- the modal -->
            <b-modal id="noteModalItem" size="sm" v-model="addNote">
                Add notes or inscriptions
            </b-modal>
        </div>
    </section>
</template>
<script>
import optionsData from "@/data/options.json";
export default {
  props: ["metalInfo", "itemInfo", "storeInfo"],
  data() {
    return {
      uploadImage: false,
      addNote: false,
      itemOptions: optionsData.item_options
    };
  },
  methods: {
    checkOverride(item) {
      let max = item.value * this.storeInfo.payout_max;
      if (item.override > max) item.override = max.toFixed(2);
    },
    onShown(element, text) {
      let inputActive = this.$refs[element][0];
      inputActive.value = "";
      inputActive.focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.override {
  width: 130px;
  font-size: 20px;
  text-align: right;
  padding-right: 8px;
}
</style>

