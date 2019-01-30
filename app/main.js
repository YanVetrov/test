import Vue from 'nativescript-vue'
import App from './pages/login'
import VueDevtools from 'nativescript-vue-devtools'
import Vuex from 'vuex'
import counter from './state'
import user from './store/user'
import * as wallets from './store/wallets'
import * as transactions from './store/transactions'
import * as merchants from './store/merchants'
import VueDevtools from 'nativescript-vue-devtools'
Vue.use(VueDevtools, { host: '192.168.1.42' })
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView);
require("nativescript-localstorage");

Vue.use(Vuex);
if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
const store = new Vuex.Store({
  modules: {
    counter,
    user,
    wallets,
    transactions,
    merchants
  }
});
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start();
