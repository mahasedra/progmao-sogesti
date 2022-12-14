import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import "./plugins/tiptap-vuetify";
import VueHtmlToPaper from "vue-html-to-paper";

import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import i18n from "./i18n";

Vue.config.productionTip = false;
const options = {
    name: "_blank",
    specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
    styles: [
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
        "https://unpkg.com/kidlat-css/css/kidlat.css",
    ],
};

Vue.use(firestorePlugin);
Vue.use(VueHtmlToPaper, options);
const configOptions = {
    apiKey: "AIzaSyDMtT-sCw6zTzXmLFKwhuEjgwk5UviSUrc",
    authDomain: "sogesti-formapp.firebaseapp.com",
    databaseURL: "https://sogesti-formapp-default-rtdb.firebaseio.com",
    projectId: "sogesti-formapp",
    storageBucket: "sogesti-formapp.appspot.com",
    messagingSenderId: "197160008537",
    appId: "1:197160008537:web:fd67136f4136c145b2ea48",
    measurementId: "G-Q1F3WJSR9S",
};

firebase.initializeApp(configOptions);

let app;

firebase.auth().onAuthStateChanged((user) => {
    store.dispatch("auth/fetchUser", user);
    if (!app) {
        new Vue({
            store,
            router,
            vuetify,
            i18n, data: {
                search: ''
            },
            render: (h) => h(App),
        }).$mount("#app");
    }
});
