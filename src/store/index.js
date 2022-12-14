import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import users from "./modules/users";
import evenementsACT from "./modules/evenementsACT";
import evenementsACTClient from "./modules/evenementsACTClient";
import inspectionsOP from "./modules/inspectionsOP";
import controlesOP from "./modules/controlesOP";
import compteRendus from "./modules/compteRendus";
import controlesVehi from "./modules/controlesVehi";
import gestionSecurite from "./modules/gestionSecurite";
import passationVehicule from "./modules/passationVehicule";
import settings from "./modules/settings";
import customFields from "./modules/customFields";
import audit from "./modules/audit";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
        barImage: require("@/assets/clint-mckoy.jpg"),
        drawer: null,
    },
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload;
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload;
        },
    },
    actions: {},
    modules: {
        auth,
        users,
        inspectionsOP,
        evenementsACT,
        controlesOP,
        compteRendus,
        controlesVehi,
        gestionSecurite,
        passationVehicule,
        customFields,
        evenementsACTClient,
        audit,
        settings,
    },
});
