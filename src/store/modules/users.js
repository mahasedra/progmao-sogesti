import { firestore } from 'firebase';
import firebase from "firebase";
const collName = 'Users';

const users = {
    namespaced: true,
    state: {
        users: [],
        stats: [],
    },
    getters: {
        getusers: (state) => {
            return state.users;
        },
    },
    mutations: {
        SET_users(state, users) {
            state.users = users;
        }, UPDATE_USERS(state, payload) {
            Object.assign(state.users[payload.index], payload.user);
        }, ADD_USERS(state, user) {
            state.users.push(user);
        },
        REMOVE_USERS(state, user) {
            const index = state.users.indexOf(user);
            state.users.splice(index, 1);
        }
    },
    actions: {
        async loadusers({ commit }) {
            const querySnapshot = await firestore().collection(collName).get();
            let user;
            let users = querySnapshot.docs.map(function (doc) {
                user = doc.data();
                user.id = doc.id;
                console.log(user.data);
                return user;
            });

            commit('SET_users', users);
        },
        async addusers({ commit }, user) {
            const date = new Date(Date.now());
            const formatted = date.toLocaleDateString("fr-FR")
            user['dateInscription'] = formatted;
            user['fcmToken'] = '';
            user['userIdGenerated'] = 'USER' + Math.floor(Date.now() / 1000).toString();
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user['email'].toString().trim(), user['password']).then(function () {
                    firebase
                        .auth().onAuthStateChanged(firebaseUser => {

                            if (firebaseUser) {
                                firebaseUser.updateProfile({
                                    displayName: user['nom']
                                }).then(async function () {
                                    firebaseUser.sendEmailVerification().then(function () {
                                        alert('Utilisateur crée avec succès!\nIl/elle devra vérifier son compte via le mail de confirmation envoyé à sa boîte mail.')

                                    }, function (error) {
                                        console.log('not send Verification ' + error);
                                    });
                                    
                                    const docRef = await firestore().collection(collName).add(user);

                                    await firestore().collection(collName).doc(docRef.id).update({
                                        'userId': firebaseUser.uid,
                                        'password': null
                                    });

                                });
                            } else {
                                console.log('not logged in');
                                document.getElementById('btnLogout').style.display = 'none';
                            }
                        });
                });

            commit('ADD_USERS', user);
            // alert("Action réussie. Veuillez vous reconnecter maintenant svp.")
            // firebase
            //     .auth()
            //     .signOut()
            //     .then(() => {
            //         this.$router.replace({ path: "/" });
            //     });

        },

        async updateUsers({ commit }, payload) {
            await firestore().collection(collName).doc(payload.user.id).set(payload.user);
            commit('UPDATE_USERS', payload);
        },
        async removeUsers({ commit }, user) { 
            await firestore().collection(collName).doc(user.id).delete();
            commit('REMOVE_USERS', user);
        }
    }
}

export default users;