import { firestore } from 'firebase';

const collName = 'settings';
const settings = {
    namespaced: true,
    state: {
        settings: [],
    },
    getters: {
        getsettings: (state) => {
            return state.settings;
        }
    },
    mutations: {
        SET_settings(state, settings) {
            state.settings = settings;
        },
        ADD_settings(state, order) {
            state.settings.push(order);
        },
        UPDATE_ORDER(state, payload) {
            Object.assign(state.settings[payload.index], payload.order);
        },
        REMOVE_settings(state, order) {
            const index = state.order.indexOf(order);
            state.settings.splice(index, 1);
        }
    },
    actions: {
        async loadsettings({ commit }) {
            const querySnapshot = await firestore().collection(collName).get();
            let order;
            let settings = querySnapshot.docs.map(function (doc) {
                order = doc.data();
                order.id = doc.id;
                return order;
            });
            commit('SET_settings', settings);
        },

        async updatesettings({ commit }, payload) {
            await firestore().collection(collName).doc(payload.order.id).set(payload.order);
            commit('UPDATE_ORDER', payload);
        },
        async removesettings({ commit }, order) {
            await firestore().collection(collName).doc(order.id).delete();
            commit('REMOVE_settings', order);
        }
    }
}

export default settings;