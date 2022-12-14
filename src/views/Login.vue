<template>
    <v-app style="background-image: url('https://cdn.vuetifyjs.com/images/parallax/material.jpg'); background-repeat: no-repeat;
  background-size: auto;">

        <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="3">
                <base-material-card class="v-card-profile"
                    avatar="https://firebasestorage.googleapis.com/v0/b/sogesti-formapp.appspot.com/o/logo_salt.png?alt=media&token=837aa671-0be4-473c-8349-dadc51297921">
                    <v-card-text class="text-center">

                        <h4 class="display-2 font-weight-bold mb-1 black--text">
                            GES-UPRA SALT Admin
                        </h4>
                    </v-card-text>
                    <v-card-text>
                        <v-form ref="form" v-bind:disabled="disabled" lazy-validation>
                            <v-text-field type="text" v-model="email" label="E-mail" :rules="emailRules"
                                prepend-icon="mdi-at" />
                            <v-text-field :type="showPassword ? 'text' : 'password'" v-model="password"
                                label="Mot de passe" :rules="passwordRules" prepend-icon="mdi-lock"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="showPassword = !showPassword" />
                        </v-form>

                        <p class="red--text">{{ error }}</p>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn v-bind:disabled="disabled" block @click="validate" color="primary">
                            <span v-show="!disabled">Se connecter</span>
                            <span v-show="disabled">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </span>
                        </v-btn>
                    </v-card-actions>
                </base-material-card>
            </v-col>

        </v-row>

    </v-app>
</template>

<script>
import firebase from "firebase";

export default {
    data() {
        return {
            disabled: false,
            email: "",
            emailRules: [
                (v) => !!v || "Un e-mail est requis",
                (v) => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
            ],
            showPassword: false,
            password: "",
            passwordRules: [(v) => !!v || "Un mot de passe est requis"],
            error: "",
        };
    },
    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.disabled = true;
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        const firestore = firebase.firestore();
                        firestore
                            .collection("Users")
                            .where("userId", "==", firebase.auth().currentUser.uid)
                            .get()
                            .then((snapshot) => {
                                const documents = snapshot.docs.map((doc) => doc.data());
                                if (documents[0]["role"] == "Agent") {
                                    this.disabled = false;
                                    this.error =
                                        "Désolé, seuls les superviseurs et administrateurs sont autorisés à accéder à ce interface.";
                                } else if (documents[0]["status"] == "Inactif") {
                                    this.disabled = false;
                                    this.error =
                                        "Désolé, vous avez été bloqué. Veuillez prendre attache avec d'autres responsables, merci.";
                                } else {
                                    this.disabled = false;

                                    var m = new Date();
                                    var dateString =
                                        ("0" + m.getUTCDate()).slice(-2) + "-" +
                                        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                                        m.getUTCFullYear() + " " +
                                        ("0" + m.getUTCHours()).slice(-2) + ":" +
                                        ("0" + m.getUTCMinutes()).slice(-2);
                                    let order = {};
                                    order["date"] = dateString;
                                    order["event"] = 'Connexion';
                                    order["user"] = documents[0]["nom"];
                                    order["userId"] = documents[0]["userId"];
                                    order["tel"] = documents[0]["tel"];
                                    order["role"] = documents[0]["role"];
                                    firestore.collection("audit").add(order);
                                    localStorage.setItem(
                                        "dateInscription",
                                        documents[0]["dateInscription"]
                                    );

                                    localStorage.setItem("ActualPassword", this.password.toString());
                                    localStorage.setItem("fcmToken", documents[0]["fcmToken"]);
                                    localStorage.setItem("tel", documents[0]["tel"]);
                                    localStorage.setItem("status", documents[0]["status"]);
                                    localStorage.setItem("imgUrl", documents[0]["imgUrl"]);
                                    localStorage.setItem("email", documents[0]["email"]);
                                    localStorage.setItem("nom", documents[0]["nom"]);
                                    localStorage.setItem("userId", documents[0]["userId"]);
                                    localStorage.setItem("collectionId", documents[0].id);
                                    localStorage.setItem("role", documents[0]["role"]);
                                    this.$router.replace({
                                        path: "/admin/dashboard"
                                    });
                                }
                                // do something with documents
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        this.disabled = false;
                        this.error = "Email ou mot de passe incorrect.";
                    });
            }
        },
    },
};
</script>
