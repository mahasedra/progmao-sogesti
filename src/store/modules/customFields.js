import { firestore } from 'firebase';

const collName = 'customFields';
const customFields = {
    namespaced: true,
    state: {
        customFields: [],
    },
    getters: {
        getcustomFields: (state) => {
            return state.customFields;
        }
    },
    mutations: {
        SET_customFields(state, customFields) {
            state.customFields = customFields;
        },
        ADD_customFields(state, order) {
            state.customFields.push(order);
        },
        UPDATE_ORDER(state, payload) {
            Object.assign(state.customFields[payload.index], payload.order);
        },
        REMOVE_customFields(state, order) {
            const index = state.customFields.indexOf(order);
            state.customFields.splice(index, 1);
        }
    },
    actions: {
        async addcustomFields({ commit }, order) {
            var m = new Date();
            var dateString =
                ("0" + m.getUTCDate()).slice(-2) + "-" +
                ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                m.getUTCFullYear() + " " +
                ("0" + m.getUTCHours()).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2);
            order['dateEnvoi'] = dateString;
            const docRef = await firestore().collection(collName).add(order);
            order.id = docRef.id;
            commit('ADD_customFields', order);
        },

        async loadcustomFields({ commit }) {
            const querySnapshot = await firestore().collection(collName).orderBy('dateEnvoi', 'desc').get();
            let order;
            let customFields = querySnapshot.docs.map(function (doc) {
                order = doc.data();
                order.id = doc.id;
                return order;
            });
            commit('SET_customFields', customFields);
        },

        async updatecustomFields({ commit }, payload) {
            await firestore().collection(collName).doc(payload.order.id).set(payload.order);
            commit('UPDATE_ORDER', payload);
        },
        async removecustomFields({ commit }, order) {
            await firestore().collection(collName).doc(order.id).delete();
            commit('REMOVE_customFields', order);
        },
    }
}

export default customFields;