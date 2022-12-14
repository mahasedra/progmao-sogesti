<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">

                <base-material-card>
                    <template v-slot:heading>
                        <v-row>
                            <v-col cols="12">
                                <div class="display-2 font-weight-light">
                                    Modifier le profil
                                </div>

                                <div class="subtitle-1 font-weight-light">
                                    Compléter votre profil
                                </div>
                            </v-col>
                        </v-row>

                    </template>
                    <!-- alert -->
                    <v-row>
                        <v-alert text type="success" border="left" width="100%" dismissible
                            v-if="this.formData.done == true">
                            <strong>Profil mis à jour avec succès !</strong>
                        </v-alert>
                    </v-row>
                    <!-- avatar -->

                    <v-row class="justify-center">
                        <v-avatar size="150px" class="my-2">
                            <img :src="formData.imgUrl" />
                        </v-avatar>
                    </v-row>
                    <v-row class="justify-center">
                        <v-btn :loading="loading1" :disabled="loading1" color="info" class="my-2 white--text"
                            @click="$refs.uploader.click()">
                            CHANGER LA PHOTO
                            <v-icon right dark> mdi-pencil-outline </v-icon>
                        </v-btn>
                        <input type="file" class="d-none" ref="uploader" accept="image/*" @change="selectFile()" />
                        &nbsp; &nbsp;<v-progress-circular class="mt-3" v-if="this.formData.loading == true"
                            indeterminate color="info">
                        </v-progress-circular>
                    </v-row>

                    <v-text-field label="Nom et prénoms" shaped prepend-inner-icon="mdi-account" v-model="formData.nom">
                    </v-text-field>
                    <v-text-field label="Email" shaped prepend-inner-icon="mdi-email" v-model="formData.email" disabled>
                    </v-text-field>

                    <v-text-field label="Téléphone" shaped prepend-inner-icon="mdi-phone" v-model="formData.tel">
                    </v-text-field>
                    <v-text-field label="Ancien mot de passe" prepend-inner-icon="mdi-lock-outline"
                        v-model="formData.OldPassword" :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showPassword = !showPassword">
                    </v-text-field>
                    <!-- alert -->
                    <v-row>
                        <v-alert text type="error" border="left" width="100%" dismissible
                            v-if="this.formData.error == true">
                            <strong>Ce n'est pas votre ancien mot de passe !</strong>
                        </v-alert>
                    </v-row>

                    <v-text-field label="Nouveau mot de passe" shaped prepend-inner-icon="mdi-lock-outline"
                        v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showPassword = !showPassword">
                    </v-text-field>

                    <v-text-field label="Confirmer le mot de passe" shaped prepend-inner-icon="mdi-lock-outline"
                        v-model="formData.ConfirmPassword" :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showPassword = !showPassword">
                    </v-text-field>
                    <!-- alert -->
                    <v-row>
                        <v-alert text type="error" border="left" width="100%" dismissible
                            v-if="this.formData.error1 == true">
                            <strong>Les mots de passe ne se correspondent pas!</strong>
                        </v-alert>
                    </v-row>
                    <!-- alert -->
                    <v-row>
                        <v-alert text type="success" border="left" width="100%" dismissible
                            v-if="this.formData.done1 == true">
                            <strong>Le mot de passe a été mis à jour avec succès!</strong>
                        </v-alert>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-btn color="green" class="pa-6 font-weight-bold" block tile elevation="10"
                                @click="updateInfo()">
                                Mettre à jour
                            </v-btn>

                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-btn color="green" class="pa-6 font-weight-bold" block tile elevation="10"
                                @click="updatePassword()">
                                Mettre à jour le mot de passe
                            </v-btn>
                        </v-col>
                    </v-row>
                </base-material-card>
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
import {
    firestore
} from 'firebase';
import {
    storage
} from "firebase";
import firebase from 'firebase';
export default {
    data() {
        return {
            showPassword: false,
            formData: {
                done: false,
                done1: false,
                error: false,
                error1: false,
                loading: false,
                password: "",
                ConfirmPassword: "",
                OldPassword: "",
                ActualPassword: localStorage.getItem("ActualPassword").toString(),
                tel: localStorage.getItem("tel").toString(),
                nom: firebase.auth().currentUser.displayName,
                imgUrl: localStorage.getItem("imgUrl") == null || localStorage.getItem("imgUrl") == '' ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/OOjs_UI_icon_userAvatar-progressive.svg/1024px-OOjs_UI_icon_userAvatar-progressive.svg.png" : localStorage.getItem("imgUrl"),
                collectionId: localStorage.getItem("collectionId").toString(),
                email: firebase.auth().currentUser.email,
            },
        }
    },
    computed: {},
    methods: {
        backToPreviousPage() {
            this.$router.back();
        },
        async updateInfo() {
            this.formData.loading = true;
            this.formData.done = false;
            let vm = this;
            await firebase.auth().currentUser.updateProfile({
                displayName: this.formData.nom
            });
            await firestore().collection('Users').doc(this.formData.collectionId).update({
                tel: this.formData.tel,
                nom: this.formData.nom,
                imgUrl: this.formData.imgUrl,
            }).then(() => {
                vm.formData.done = true;
                vm.formData.loading = false;
                localStorage.setItem("imgUrl", this.formData.imgUrl);
                localStorage.setItem("tel", this.formData.tel);
                localStorage.setItem("nom", this.formData.nom);
            })
        },
        async updatePassword() {
            this.formData.loading = true;
            this.formData.done1 = false;
            if (this.formData.OldPassword != this.formData.ActualPassword) {
                this.formData.error = true;
            } else if (this.formData.ConfirmPassword != this.formData.password) {
                this.formData.error1 = true;
            } else {
                this.formData.error = false;
                this.formData.error1 = false;
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.formData.email, this.formData.ActualPassword)
                    .then(async () => {
                        var user = firebase.auth().currentUser;
                        await user.updatePassword(this.formData.password).then(function () { });
                    });
                this.formData.done1 = true;
                this.formData.loading = false;
                localStorage.setItem("ActualPassword", this.formData.password);
            }
        },
        selectFile() {
            let file = this.$refs.uploader.files[0];
            if (file != null && file.name) {
                this.formData.loading = true;
                let ref = storage()
                    .ref()
                    .child("users_profiles/" + file.name);
                let vm = this;
                ref.put(file).then((snapshot) => {
                    vm.loading = true;
                    if (snapshot.state === "success") {
                        snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            vm.formData.imgUrl = downloadURL;
                        });
                        vm.formData.loading = false;
                    } else {
                        this.snack = true;
                        this.snackColor = "error";
                        this.snackText = "Impossible d'uploader l'image.";
                    }
                    file = null;
                });
            }
            this.loading = false;
        },
    },
};
</script>