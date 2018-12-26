<template>
    <section>
        <b-card align="left">
            <b-row style="padding: 10px">
                <b-col cols="4">
                    <label>Store</label>
                    <div class="input-group">
                        <select  class="form-control custom-select"  v-model="storeFilter">
                            <option :value="null">- All Stores ({{ storeInfo.length }}) -</option>
                            <option :value="store.id" v-for="store in storeInfo" v-bind:key="store.id">{{ store.name | capitalize }}</option>
                        </select>
                    </div>                             
                </b-col>
                <b-col cols="6">
                    <label>Find customer</label>
                    <div role="group" class="input-group">
                        <input class="form-control" v-model="customerFilter" placeholder="Search by ID number, name or phone number">
                        <div class="input-group-append">
                            <div class="input-group-text"><icon name="search"/></div>
                        </div>
                    </div>                 
                </b-col>
            </b-row>
        </b-card>
        <div style="height:30px" />
    </section>
</template>
<script>
export default {   
  props: ["storeInfo"],
  data() {
    return {
      storeFilter: null,
      customerFilter: ""
    };
  }
};
</script>
