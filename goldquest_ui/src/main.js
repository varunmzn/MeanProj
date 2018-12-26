// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue'
import lodash from 'lodash'
import Vue2Filters from 'vue2-filters'
import Datepicker from 'vuejs-datepicker'
import VueLodash from 'vue-lodash'
import vSelect from 'vue-select'
import Toasted from 'vue-toasted';
import Amplify, { Auth } from 'aws-amplify'

const identityPoolId = process.env.IDENTITY_POOL_ID;
const region = process.env.REGION;
const userPoolId = process.env.USER_POOL_ID;
const userPoolWebClientId = process.env.USER_POOL_WEB_CLIENT_ID;

Amplify.configure({
    Auth: {
        identityPoolId,
        region,
        userPoolId,
        userPoolWebClientId
    }
});

Vue.config.productionTip = false
Vue.use(Vue2Filters)
Vue.use(VueLodash, lodash)
Vue.use(BootstrapVue)
Vue.use(Toasted)
Vue.component('datepicker', Datepicker)
Vue.component('icon', Icon)
Vue.component('v-select', vSelect)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        Auth.currentAuthenticatedUser().then(user => {
            next();
        }).catch(err => {
            console.error(err);
            next('/login');
        });
    } else {
        next();
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
