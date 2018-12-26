<template>
    <section>
        <b-card header-bg-variant="dark" header-text-variant="white" align="left">
            <b-row>
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
                <b-col>
                    <label>Description</label>
                    <div class="input-group">
                        <input class="form-control" v-model="descriptionFilter" @change="sendUpdate()">
                    </div>
                </b-col>
                
            </b-row>
        </b-card>
    </section>
</template>
<script>
export default {
  props: ["metalInfo"],
  data() {
    return {
      metal: null,
      options: [],
      metalFilter: null,
      purityFilter: null,
      descriptionFilter: null,
      dateFilter: null
    };
  },
  methods: {
    sendUpdate() {
      this.metal = (this.metalFilter) ? this.$parent.getMetal(this.metalFilter, 1) : null;
      this.options = (this.metal) ? this.metal.options : [];
      this.purityFilter = (this.metalFilter) ? this.purityFilter : null;
    }
  }
};
</script>
