import { firestore } from 'firebase';

const collName = 'audit';

const audit = {
    namespaced: true,
    state: {
        audit: [],
    },
    getters: {
        getaudit: (state) => {
            return state.audit;
        },

    },
    mutations: {
        SET_audit(state, audit) {
            state.audit = audit;
        },
        ADD_audit(state, order) {
            state.audit.push(order);
        },
        UPDATE_ORDER(state, payload) {
            Object.assign(state.audit[payload.index], payload.order);
        },
        REMOVE_audit(state, order) {
            const index = state.audit.indexOf(order);
            state.audit.splice(index, 1);
        }
    },
    actions: {
        async loadaudit({ commit }) {
            let querySnapshot = await firestore().collection(collName).orderBy('date', 'desc').get();

            let order;
            let audit = querySnapshot.docs.map(function (doc) {
                order = doc.data();
                order.id = doc.id;
                return order;
            });
            commit('SET_audit', audit);
        },

    }
}

export default audit;