import { firestore } from 'firebase';
import firebase from 'firebase';
import AXIOS from "axios";

const collName = 'inspectionsOp';

const inspectionsOP = {
    namespaced: true,
    state: {
        inspectionsOP: [],
        stats: [{ "dataEnCoursinspectionsOp": 0, "dataValideinspectionsOp": 0, "dataApprouveinspectionsOp": 0 }]
    },
    getters: {
        getinspectionsOP: (state) => {
            return state.inspectionsOP;
        },
        getStats: (state) => {
            state.stats[0]['dataEnCoursinspectionsOp'] = 0;
            state.stats[0]['dataValideinspectionsOp'] = 0;
            state.stats[0]['dataApprouveinspectionsOp'] = 0;
            state.inspectionsOP.forEach(element => {
                if (element["status"] == "En cours") {
                    state.stats[0]['dataEnCoursinspectionsOp']++;
                }
                if (element["status"] == "Validé") {
                    state.stats[0]['dataValideinspectionsOp']++;
                }
                if (element["status"] == "Approuvé") {
                    state.stats[0]['dataApprouveinspectionsOp']++;
                }
            }
            );
            return state.stats[0];
        }
    },
    mutations: {
        SET_inspectionsOP(state, inspectionsOP) {
            state.inspectionsOP = inspectionsOP;
        },
        ADD_inspectionsOP(state, order) {
            state.inspectionsOP.push(order);
        },
        UPDATE_ORDER(state, payload) {
            Object.assign(state.inspectionsOP[payload.index], payload.order);
        },
        REMOVE_inspectionsOP(state, order) {
            const index = state.inspectionsOP.indexOf(order);
            state.inspectionsOP.splice(index, 1);
        }
    },
    actions: {
        async loadinspectionsOP({ commit }) {
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
            let inspectionsOP = querySnapshot.docs.map(function (doc) {
                order = doc.data();
                order.id = doc.id;
                return order;
            });
            commit('SET_inspectionsOP', inspectionsOP);

            
        },
        async addinspectionsOP({ commit }, order) {
            let actualId = 0;
            await firestore()
                .collection("stats")
                .get().then((snapshot) => {
                    const documents = snapshot.docs.map((doc) => doc.data());
                    console.log(documents[0]['inspectionsOpCount'])
                    actualId = documents[0]['inspectionsOpCount'] + 1;
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
            // order['dateIncident'] = moment(order['dateIncident']).format('dd-MM-yyyy HH:mm');
            order['userId'] = firebase.auth().currentUser.uid;
            order['userEmail'] = firebase.auth().currentUser.email;
            order['userName'] = firebase.auth().currentUser.displayName;
            order['dateEnvoi'] = dateString;
            order['idForm'] = 'INSP' + actualId;
            const docRef = await firestore().collection(collName).add(order);
            order.id = docRef.id;
            commit('ADD_inspectionsOP', order);

            var m1 = new Date();
            var dateString1 =
              ("0" + m1.getUTCDate()).slice(-2) + "-" +
              ("0" + (m1.getUTCMonth() + 1)).slice(-2) + "-" +
              m1.getUTCFullYear() + " " +
              ("0" + m1.getUTCHours()).slice(-2) + ":" +
              ("0" + m1.getUTCMinutes()).slice(-2);
            let audit= {};
            audit["date"] = dateString1;
            audit["event"] = 'Inspection opérationnelle';
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
                    "Authorization": "key=AAAALeem-1k:APA91bFi6XX1XOe2gz-VGRBEKI00LfWbXS8TpYRQKzKzc9L3mVKJgZwXWJuNZetn5F316V1ePT_qwFyrR-6q7nwVGs7Hp649JGlEb-wUdpRfDyfvrEcaUxFlsGEjjMXjZY6ap2pQwY-Q"
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
                                documents['nom'] +
                                    "\nNouveau formulaire Inspections opérationnelles soumis par " + role + " " + name + '. \nDate et heure: ' +
                                    dateString,
                            },
                            'to': documents['fcmToken']
                        };
                        postData("https://fcm.googleapis.com/fcm/send", body).then((d) => {
                            console.log("d", d)
                        }).catch((e) => {
                            console.log("e", e);
                        });
                    }

                });
                await firestore().collection("stats").doc("D2zmmdQjpRwFtHunf1zo").update({
                    'inspectionsOpCount': firebase.firestore.FieldValue.increment(1),
                });
        },
        async updateinspectionsOP({ commit }, payload) {
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
            
            await firestore().collection(collName).doc(payload.order.id).set(payload.order);
            commit('UPDATE_ORDER', payload);
        },
        async removeinspectionsOP({ commit }, order) {
            await firestore().collection(collName).doc(order.id).delete();
            commit('REMOVE_inspectionsOP', order);
        }
    }
}

export default inspectionsOP;