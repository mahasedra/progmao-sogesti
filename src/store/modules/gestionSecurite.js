import { firestore } from 'firebase';
import firebase from 'firebase';
import AXIOS from "axios";
import moment from 'moment';

const collName = 'armesMunitions';


const gestionSecurite = {
    namespaced: true,
    state: {
        gestionSecurite: [],
        stats: [{ "dataEnCoursarmesMunitions": 0, "dataValidearmesMunitions": 0, "dataApprouvearmesMunitions": 0 }]
    },
    getters: {
        getgestionSecurite: (state) => {
            return state.gestionSecurite;
        },
        getStats: (state) => {
            state.stats[0]['dataEnCoursarmesMunitions'] = 0;
            state.stats[0]['dataValidearmesMunitions'] = 0;
            state.stats[0]['dataApprouvearmesMunitions'] = 0;
            state.gestionSecurite.forEach(element => {
                if (element["status"] == "En cours") {
                    state.stats[0]['dataEnCoursarmesMunitions']++;
                }
                if (element["status"] == "Validé") {
                    state.stats[0]['dataValidearmesMunitions']++;
                }
                if (element["status"] == "Approuvé") {
                    state.stats[0]['dataApprouvearmesMunitions']++;
                }
            }
            );
            return state.stats[0];
        }
    },
    mutations: {
        SET_gestionSecurite(state, gestionSecurite) {
            state.gestionSecurite = gestionSecurite;
        },
        ADD_gestionSecurite(state, order) {
            state.gestionSecurite.push(order);
        },
        UPDATE_ORDER(state, payload) {
            Object.assign(state.gestionSecurite[payload.index], payload.order);
        },
        REMOVE_gestionSecurite(state, order) {
            const index = state.gestionSecurite.indexOf(order);
            state.gestionSecurite.splice(index, 1);
        }
    },
    actions: {
        async loadgestionSecurite({ commit }) {
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
            let gestionSecurite = querySnapshot.docs.map(function (doc) {
                order = doc.data();
                order.id = doc.id;
                return order;
            });
            commit('SET_gestionSecurite', gestionSecurite);
        },
        async addgestionSecurite({ commit }, order) {
            let actualId = 0;
            await firestore()
                .collection("stats")
                .get().then((snapshot) => {
                    const documents = snapshot.docs.map((doc) => doc.data());
                    console.log(documents[0]['passationArmeCount'])
                    actualId = documents[0]['passationArmeCount'] + 1;
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
            order['userId'] = firebase.auth().currentUser.uid;
            order['userEmail'] = firebase.auth().currentUser.email;
            order['userName'] = firebase.auth().currentUser.displayName;
            order['dateEnvoi'] = dateString;
            order['idForm'] = 'ARM' + actualId;

            order['dateRetourArme'] = moment(order['dateRetourArme'], 'YYYY-MM-DD').format('DD-MM-YYYY HH:mm');
            order['dateSortieArme'] = moment(order['dateSortieArme'], 'YYYY-MM-DD').format('DD-MM-YYYY HH:mm');

            const docRef = await firestore().collection(collName).add(order);
            order.id = docRef.id;
            commit('ADD_gestionSecurite', order);

            var m1 = new Date();
            var dateString1 =
              ("0" + m1.getUTCDate()).slice(-2) + "-" +
              ("0" + (m1.getUTCMonth() + 1)).slice(-2) + "-" +
              m1.getUTCFullYear() + " " +
              ("0" + m1.getUTCHours()).slice(-2) + ":" +
              ("0" + m1.getUTCMinutes()).slice(-2);
            let audit= {};
            audit["date"] = dateString1;
            audit["event"] = 'Passation des armes';
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
                                    "\nNouveau formulaire Armes et munitions soumis par " + role + " " + name + '.\nID: ' + 'ARM' + actualId + 'nDate et heure: ' +
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
                'passationArmeCount': firebase.firestore.FieldValue.increment(1),
            });
        },
        async updategestionSecurite({ commit }, payload) {
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

            payload.order['dateRetourArme'] = moment(payload.order['dateRetourArme'], 'YYYY-MM-DD').format('DD-MM-YYYY HH:mm');
            payload.order['dateSortieArme'] = moment(payload.order['dateSortieArme'], 'YYYY-MM-DD').format('DD-MM-YYYY HH:mm');
            await firestore().collection(collName).doc(payload.order.id).set(payload.order);
            commit('UPDATE_ORDER', payload);
        },
        async removegestionSecurite({ commit }, order) {
            await firestore().collection(collName).doc(order.id).delete();
            commit('REMOVE_gestionSecurite', order);
        }
    }
}

export default gestionSecurite;