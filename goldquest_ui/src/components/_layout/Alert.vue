<template>
    <div class="alert" :class="type" role="alert" v-show="show">
        <span class="close" @click="$emit('close')" style="position: relative; top: -12px; right: -12px">
            <icon name="close" scale=".8" />
        </span>
        <div class="d-flex">
            <icon :name="icon" class="alert-icon" v-if="icon"></icon>
            <slot>
                <div style="padding-right: 15px">
                    <div v-html="message" />
                    <small v-if="subtext">{{subtext}}</small>
                </div>
            </slot>
        </div>     
    </div>
</template>

<script>
export default {
  name: "alert",
  props: {
    type: {
      default: "alert-danger"
    },
    message: {
      default: "Server error, please contact administrator."
    },
    subtext: {
      default: ""
    },
    icon: {
      default: ""
    },
    show: {
      default: false
    }
  }
};
</script>

<style scoped>
.alert {
  font-size: 12px;
}

.alert-icon {
  height: 36px;
  margin-right: 10px;
}
</style>
