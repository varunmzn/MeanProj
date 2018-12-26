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
                <b-col>
                    <label>Metal</label>
                    <div class="input-group">
                        <select  class="form-control"  v-model="metalFilter" @change="sendUpdate()">
                            <option :value="null">-All-</option>
                            <option :value="metal.id" v-for="metal in metalInfo" v-bind:key="metal.id">{{ metal.name | capitalize }}</option>
                        </select>
                    </div>
                </b-col>
                <b-col>
                    <label>Purity</label>
                    <div class="input-group">
                        <select class="form-control"  v-model="purityFilter" @change="sendUpdate()">
                            <option :value="null">-All-</option>
                            <option v-if="metalFilter" :value="option.id" v-for="option in options" v-bind:key="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                </b-col>
                <b-col cols="3">
                    <label>Status</label>
                    <div class="form-control small">
                    <b-form-group style="margin-bottom: 0">
                            <b-form-radio-group v-model="statusFilter" @change="sendUpdate()"
                                                :options="['All', 'Hold', 'Expired']"
                                                name="status">
                            </b-form-radio-group>
                        </b-form-group>    
                    </div>            
                </b-col>  
            </b-row>
        </b-card>
    </section>
</template>
<script>
import helpers from "@/utils/helpers";
export default {
  props: ["metalInfo", "storeInfo"],
  data() {
    return {
      metal: null,
      options: [],
      storeFilter: null,
      statusFilter: 'All',
      metalFilter: null,
      purityFilter: null,
      descriptionFilter: null,
      dateFilter: null
    };
  },
  methods: {
    sendUpdate() {
      this.metal = (this.metalFilter) ? helpers.getMetal(this.metalFilter, 1) : null;
      this.options = (this.metal) ? this.metal.options : [];
      this.purityFilter = (this.metalFilter) ? this.purityFilter : null;
    }
  }
};
</script>
