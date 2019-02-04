import Vue from 'nativescript-vue'
import App from './pages/login'
import VueDevtools from 'nativescript-vue-devtools'
import Vuex from 'vuex'
import counter from './state'
import user from './store/user'
import './plugins/rest'
import * as app_global from './store/app_global'
import * as wallets from './store/wallets'
import * as transactions from './store/transactions'
import * as withdrawal from './store/withdrawal'
import * as merchants from './store/merchants'
import * as fee from './store/fee'
import * as exchange from './store/exchange'

Vue.use(require('vue-moment'));

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import {messaging, Message} from "nativescript-plugin-firebase/messaging";

messaging.registerForPushNotifications({
    onPushTokenReceivedCallback(token) {
        console.log("Firebase plugin received a push token-------------------------: " + token);
    },

    onMessageReceivedCallback(message) {
        console.log("Push message received: " + message.title);
    },

    // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
    showNotifications: true,

    // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
    showNotificationsWhenInForeground: true
}).then(() => console.log("Registered for push"));
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView);
Vue.registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView)
require("nativescript-localstorage");

Vue.use(Vuex);
if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools)
}
const store = new Vuex.Store({
    modules: {
        app_global,
        withdrawal,
        counter,
        user,
        wallets,
        transactions,
        merchants,
        fee,
        exchange
    }
});
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

new Vue({
    store,
    render: h => h('frame', [h(App)])
}).$start();
