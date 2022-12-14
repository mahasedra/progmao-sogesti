import { firestore } from 'firebase';
import firebase from 'firebase';
import moment from 'moment';
import AXIOS from "axios";

const collName = 'evenementsACT';
const evenementsACT = {
    namespaced: true,
    state: {
        evenementsACT: [],
        stats: [{ "dataEnCoursEvACT": 0, "dataValideEvACT": 0, "dataApprouveEvACT": 0 }]
    },
    getters: {
        getevenementsACT: (state) => {
            return state.evenementsACT;
        },
        getStats: (state) => {
            state.stats[0]['dataEnCoursEvACT'] = 0;
            state.stats[0]['dataValideEvACT'] = 0;
            state.stats[0]['dataApprouveEvACT'] = 0;
            state.evenementsACT.forEach(element => {
                if (element["status"] == "En cours") {
                    state.stats[0]['dataEnCoursEvACT']++;
                }
                if (element["status"] == "Validé") {
                    state.stats[0]['dataValideEvACT']++;
                }
                if (element["status"] == "Approuvé") {
                    state.stats[0]['dataApprouveEvACT']++;
                }
            }
            );
            return state.stats[0];
        }

    },
    mutations: {
        SET_evenementsACT(state, evenementsACT) {
            state.evenementsACT = evenementsACT;
        },
        ADD_evenementsACT(state, order) {
            state.evenementsACT.push(order);
        },
        UPDATE_ORDER(state, payload) {
            Object.assign(state.evenementsACT[payload.index], payload.order);
        },
        REMOVE_evenementsACT(state, order) {
            const index = state.evenementsACT.indexOf(order);
            state.evenementsACT.splice(index, 1);
        }
    },

    actions: {

        async loadevenementsACT({ commit }) {
            let keySearch = "";
            if (localStorage.getItem("role") == "Superviseur (Directeur)") {
                keySearch = "Validé";
            }
            let querySnapshot;
            if (keySearch != "") {
                querySnapshot = await firestore().collection(collName).where("status", "==", keySearch).orderBy('dateEnvoi', 'desc').get();
            } else {
                querySnapshot = await firestore().collection(collName).orderBy('dateEnvoi', 'desc').get();
            }
            let order;
            let evenementsACT = querySnapshot.docs.map(function (doc) {
                order = doc.data();
                order.id = doc.id;
                return order;
            });
            commit('SET_evenementsACT', evenementsACT);
        },

        async addevenementsACT({ commit }, order) {
            let actualId = 0;
            await firestore()
                .collection("stats")
                .get().then((snapshot) => {
                    const documents = snapshot.docs.map((doc) => doc.data());
                    console.log(documents[0]['evenementsCount'])
                    actualId = documents[0]['evenementsCount'] + 1;
                    console.log(actualId)
                    if (actualId < 10) {
                        actualId = '000' + actualId.toString();
                    }
                    else if (actualId < 100) {
                        actualId = '00' + actualId.toString();
                    }
                    else if (actualId < 1000) {
                        actualId = '0' + actualId.toString();
                    }
                });
            var m = new Date();
            var dateString =
                ("0" + m.getUTCDate()).slice(-2) + "-" +
                ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                m.getUTCFullYear() + " " +
                ("0" + m.getUTCHours()).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2);
            order['dateIncident'] =moment(order['dateIncident'],'YYYY-MM-DD').format('DD-MM-YYYY HH:mm');
            if (order['dateIncident'] == "Invalid date") {
                order['dateIncident'] = dateString;
            }
            order['userId'] = firebase.auth().currentUser.uid;
            order['userEmail'] = firebase.auth().currentUser.email;
            order['userName'] = firebase.auth().currentUser.displayName;
            order['dateEnvoi'] = dateString;
            order['idForm'] = 'EV' + actualId;

           
            const docRef = await firestore().collection(collName).add(order);
            order.id = docRef.id;

            commit('ADD_evenementsACT', order);

            var m1 = new Date();
            var dateString1 =
              ("0" + m1.getUTCDate()).slice(-2) + "-" +
              ("0" + (m1.getUTCMonth() + 1)).slice(-2) + "-" +
              m1.getUTCFullYear() + " " +
              ("0" + m1.getUTCHours()).slice(-2) + ":" +
              ("0" + m1.getUTCMinutes()).slice(-2);
            let audit= {};
            audit["date"] = dateString1;
            audit["event"] = 'Événements ACT';
            audit["user"] = localStorage.getItem("nom");
            audit["userId"] = localStorage.getItem("userId");
            audit["tel"] = localStorage.getItem("tel");
            audit["role"] = localStorage.getItem("role");
            firebase.firestore().collection("audit").add(audit);

            const postData = function (url, payload) {
                return AXIOS.post(url, payload, config);
            };
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':
                        'key=AAAALeem-1k:APA91bFi6XX1XOe2gz-VGRBEKI00LfWbXS8TpYRQKzKzc9L3mVKJgZwXWJuNZetn5F316V1ePT_qwFyrR-6q7nwVGs7Hp649JGlEb-wUdpRfDyfvrEcaUxFlsGEjjMXjZY6ap2pQwY-Q',
                }
            };
            let role = localStorage.getItem("role");
            let name = localStorage.getItem("nom");
            firestore()
                .collection("Users")
                .get().then((snapshot) => {
                    var m = new Date();
                    var dateString =
                        ("0" + m.getUTCDate()).slice(-2) + "-" +
                        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                        m.getUTCFullYear() + " " +
                        ("0" + m.getUTCHours()).slice(-2) + ":" +
                        ("0" + m.getUTCMinutes()).slice(-2);
                    const documents = snapshot.docs.map((doc) => doc.data());
                    for (let i = 0; i < documents.length; i++) {
                        let body = {
                            'topic': "all",
                            'data': {
                                'via': 'FlutterFire Cloud Messaging!!!',
                                'count': '1',
                            },
                            'notification': {
                                'title': "UPRA Alerte",
                                'body': 'Bonjour Mr/Mme ' +
                                    documents[i]['nom'] +
                                    "\nNouveau formulaire 'Événements ACT' soumis par " + role + " " + name + '.\nID: ' + 'EV' + actualId + '\nDate et heure: ' +
                                    dateString,
                            },
                            'to': documents[i]['fcmToken']
                        };
                        postData("https://fcm.googleapis.com/fcm/send", body).then((d) => {
                            console.log("d", d)
                        }).catch((e) => {
                            console.log("e", e);
                        });
                    }

                }
                );
            await firestore().collection("stats").doc("D2zmmdQjpRwFtHunf1zo").update({
                'evenementsCount': firebase.firestore.FieldValue.increment(1),
            });
        },

        async updateevenementsACT({ commit }, payload) {
            
            var m = new Date();
            var dateString =
                ("0" + m.getUTCDate()).slice(-2) + "-" +
                ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                m.getUTCFullYear() + " " +
                ("0" + m.getUTCHours()).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2);
            if (payload.order["commentaireAdmin"] != '') {
                payload.order["roleCommentateur"] = localStorage.getItem("role");
                payload.order["commentedBy"] = localStorage.getItem("nom");
                payload.order["dateComment"] = dateString;
            }

            payload.order['dateIncident'] = moment(payload.order['dateIncident'],'YYYY-MM-DD').format('DD-MM-YYYY HH:mm');
            if (payload.order['dateIncident'] == "Invalid date") {
                payload.order['dateIncident'] = dateString;
            }
            await firestore().collection(collName).doc(payload.order.id).set(payload.order);
            commit('UPDATE_ORDER', payload);
        },
        async removeevenementsACT({ commit }, order) {
            await firestore().collection(collName).doc(order.id).delete();
            commit('REMOVE_evenementsACT', order);
        }
    }
}

export default evenementsACT;