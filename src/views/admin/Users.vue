<template>
<v-card class="spacing-playground ma-5">

    <v-data-table :headers="headers" :items="users" :search="search" class="elevation-4" :loading="loading" loading-text="Chargement...Veuillez patienter">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="underline">Liste</v-toolbar-title>

                <v-spacer />

                <v-dialog v-model="dialog" max-width="700px">
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Modifier un utilisateur
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>

                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-account-outline" :disabled="true" :rules="titleRule" v-model="editedItem.nom" label="Nom et prénoms"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-email-check-outline" :disabled="true" :rules="titleRule" v-model="editedItem.email" label="Adresse e-mail"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-cellphone" :rules="phoneRule" v-model="editedItem.tel" label="Téléphone"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-account-tie-outline" label="Rôle" :disabled="loading" :rules="titleRule" v-model="editedItem.role" :items="items3"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-list-status" label="Statut" :disabled="loading" :rules="titleRule" v-model="editedItem.status" :items="items2"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="save">Enregistrer</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="close">Quitter</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </base-material-card>
                </v-dialog>

                <v-dialog v-model="dialog1" max-width="700px">

                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-if="
                role.includes('Superviseur (Directeur)') ||
                role.includes('Administrateur')
              " color="rgba(0, 157, 160, 0.11)" depressed dark class="mb-2 white--text py-4" small v-bind="attrs" v-on="on">
                            <v-icon color="rgb(0, 144, 146)">
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </template>
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Ajouter un utilisateur
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-account-outline" :disabled="loading" :rules="titleRule" v-model="editedItem.nom" label="Nom et prénoms"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-email-check-outline" :disabled="loading" :rules="titleRule" v-model="editedItem.email" label="Adresse e-mail"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-cellphone" :disabled="loading" :rules="phoneRule" v-model="editedItem.tel" label="Téléphone"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-lock" :disabled="loading" :rules="titleRule" type="password" v-model="editedItem.password" label="Mot de passe"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-account-tie-outline" label="Rôle" :disabled="loading" :rules="titleRule" v-model="editedItem.role" :items="items3"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-list-status" label="Statut" :disabled="loading" :rules="titleRule" v-model="editedItem.status" :items="items2"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <input type="file" class="d-none" ref="uploader" accept="image/*" @change="selectFile()" />
                                    <v-text-field :disabled="loading" v-model="editedItem.imgUrl" label="Photo de profil" prepend-icon="mdi-image" @click:prepend="$refs.uploader.click()">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="save1">Enregistrer</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="close1">Quitter</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </base-material-card>
                </v-dialog>

                <v-btn text icon class="mb-2 ml-2" @click="initialize()">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider class="mx-4" inset horizontal />
            <v-card-title>
                <v-spacer></v-spacer>

                <v-col class="d-flex align-baseline" cols="12" sm="6" md="4">
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher ici" single-line hide-details></v-text-field>

                    <v-btn outlined class="mx-2 py-4" dark small color="red" :loading="loading2" :disabled="loading2" @click="exportPDF()">
                        <v-icon color="red">
                            mdi-file-pdf-box
                        </v-icon>
                    </v-btn>

                    <v-btn outlined class="mx-2 py-4" dark small color="green" :loading="loading1" :disabled="loading1" @click="exportToExcel()">
                        <v-icon color="green">
                            mdi-cloud-upload
                        </v-icon>
                    </v-btn>
                </v-col>

            </v-card-title>

        </template>

        <template v-slot:[`item.nom`]="{ value }">
            <span class="">{{ value }}</span>
        </template>
        <template v-slot:[`item.imgUrl`]="{ value }">
            <v-avatar v-if="value != '' && value != null">
                <img :src="value" alt="Photo de profil">
            </v-avatar>
            <v-avatar color="indigo" v-if="value == '' || value == null">
                <v-icon color="white">
                    mdi-account-circle
                </v-icon>
            </v-avatar>
            <v-spacer></v-spacer>
        </template>
        <template v-slot:[`item.actions`]="{ item }">

            <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">

                    <v-btn class="mx-2 " outlined fab dark small color="black" v-bind="attrs" v-on="on">
                        <v-icon color="black">
                            mdi-dots-vertical
                        </v-icon>
                    </v-btn>

                </template>

                <v-list>
                    <v-list-item link v-if="
          role.includes('Superviseur (Directeur)') || role.includes('Admin')
        ">
                        <v-list-item-title @click="editItem(item)">Editer</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="deleteItem(item)">Supprimer</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <!-- <v-icon v-if="
          role.includes('Superviseur (Directeur)') || role.includes('Admin')
        " medium class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon medium color="red" class="mr-2" @click="deleteItem(item)">
                mdi-delete
            </v-icon> -->
        </template>
        <template v-slot:[`item.id`]="{ item }">
            <v-chip color="blue" class="ma-2" outlined style="color: white" @click="editItem(item)">{{ item.id }}</v-chip>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Réinitialiser</v-btn>
        </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <template v-slot:action="{ attrs }">
            <v-btn v-bind="attrs" text @click="snack = false">Fermer</v-btn>
        </template>
    </v-snackbar>
</v-card>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
import {
    storage
} from "firebase";
const Excel = require("exceljs");
import {
    firestore
} from "firebase";
import * as fs from "file-saver";
import AXIOS from "axios";
import "jspdf-autotable";

export default {
    data() {
        return {
            role: localStorage.getItem("role").toString(),
            snack: false,
            snackColor: "",
            snackText: "",
            search: "",
            loading: true,
            loading1: false,
            loading2: false,
            dialog: false,
            headers: [
                // { text: "ID", value: "id" },
                {
                    text: "Photo",
                    align: "start",
                    sortable: true,
                    value: "imgUrl",
                },
                {
                    text: "Nom et prénoms",
                    align: "start",
                    sortable: true,
                    value: "nom",
                },
                {
                    text: "E-mail",
                    value: "email"
                },
                {
                    text: "Téléphone",
                    value: "tel"
                },
                {
                    text: "Date d'inscription",
                    value: "dateInscription"
                },
                {
                    text: "Rôle",
                    value: "role"
                },
                {
                    text: "Statut",
                    value: "status"
                },

                {
                    text: "Actions",
                    value: "actions",
                    sortable: false
                },
            ],

            titleRule: [(v) => !!v || "Champ obligatoire"],
            phoneRule: [(v) => v.startsWith('00228') && v.length == 13 || "Numéro de téléphone invalide"],
            items2: ["Actif", "Inactif"],
            items3: [
                "Agent",
                "Superviseur (Chef Service)",
                "Superviseur (Directeur)",
                "Administrateur",
            ],
            editedIndex: -1,
            editedItem: {
                imgUrl: "",
                nom: "",
                tel: "",
                password: "",
                role: "",
                status: "",
                userId: "",
                email: "",
            },
            defaultItem: {
                imgUrl: "",
                nom: "",
                tel: "",
                password: "",
                role: "",
                status: "",
                userId: "",
                email: "",
            },
            defaultItemInit: {
                imgUrl: "",
                nom: "",
                tel: "",
                password: "",
                role: "",
                status: "",
                userId: "",
                email: "",
            },
        };
    },
    computed: {

        ...mapGetters({
            users: "users/getusers",
        }),
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    created() {
        this.initialize();
    },

    methods: {
        ...mapActions({
            loadusers: "users/loadusers",
            addusers: "users/addusers",
            removeusers: "users/removeUsers",
            updateUsers: "users/updateUsers",
        }),
        getUserById: function (id) {
            let user = this.users.filter((c) => c.id == id)[0];
            console.log(user.email);
            if (user === undefined) {
                console.log("undefined qarşim");
                return {
                    nom: "Unknown"
                };
            }
            return user;
        },

        async initialize() {
            this.loading = true;
            try {
                await this.loadusers();
            } catch (e) {
                console.error(e);
            }
            this.loading = false;
        },

        async exportToExcel() {
            this.loading1 = true;
            let workbook = new Excel.Workbook();
            let worksheet = workbook.addWorksheet("Utilisateurs");
            worksheet.columns = [{
                    header: "ID",
                    key: "userId"
                },
                {
                    header: "Nom et prénoms",
                    key: "nom"
                },
                {
                    header: "Téléphone",
                    key: "tel"
                },
                {
                    header: "Adresse email",
                    key: "email"
                },
                {
                    header: "Date d'inscription",
                    key: "dateInscription"
                },
                {
                    header: "Rôle",
                    key: "role"
                },
                {
                    header: "Statut",
                    key: "status"
                },
            ];
            worksheet.columns.forEach(function (column) {
                var maxLength = 0;
                column["eachCell"]({
                    includeEmpty: true
                }, function (cell) {
                    var columnLength = cell.value ? cell.value.toString().length : 10;
                    if (columnLength > maxLength) {
                        maxLength = columnLength;
                    }
                });
                column.width = 30;
            });
            worksheet.getRow(1).font = {
                bold: true,
                color: {
                    argb: "0047AB"
                }
            };
            const snapshot = await firestore().collection("Users").get();
            snapshot.forEach((doc) => {
                let e = doc.data();
                worksheet.addRow({
                    ...e,
                });
            });
            workbook.xlsx.writeBuffer().then((data) => {
                const blob = new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                fs.saveAs(blob, `utilisateurs.xlsx`);
            });
            this.loading1 = false;
        },

        exportPDF() {
            this.loading2 = true;
            let exportColumns = [{
                    title: "ID",
                    dataKey: "userId"
                },
                {
                    title: "Nom et prénoms",
                    dataKey: "nom"
                },
                {
                    title: "Téléphone",
                    dataKey: "tel"
                },
                {
                    title: "Adresse email",
                    dataKey: "email"
                },
                {
                    title: "Date d'inscription",
                    dataKey: "dateInscription"
                },
                {
                    title: "Rôle",
                    dataKey: "role"
                },
                {
                    title: "Statut",
                    dataKey: "status"
                },
            ];
            import("jspdf").then(jsPDF => {
                import("jspdf-autotable").then(() => {
                    const doc = new jsPDF.default('l', 'pt', "a4");
                    doc.setFontSize(16);
                    doc.setFont("helvetica");
                    doc.text("Liste des utilisateurs", 30, 30, {
                        align: "justify",
                    });
                    doc.autoTable(exportColumns, this.users);
                    doc.save("Utilisateurs.pdf");
                    this.loading2 = false;
                })
            });
        },

        selectFile() {
            let file = this.$refs.uploader.files[0];
            if (file != null && file.name) {
                this.loading = true;
                let ref = storage()
                    .ref()
                    .child("users_profiles/" + file.name);
                let vm = this;
                ref.put(file).then((snapshot) => {
                    this.loading = false;
                    if (snapshot.state === "success") {
                        snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            vm.editedItem.imgUrl = downloadURL;
                        });
                    } else {
                        this.snack = true;
                        this.snackColor = "error";
                        this.snackText = "Impossible d'uploader l'image.";
                    }
                    file = null;
                });
            }
        },
        editItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        async deleteItem(item) {
            if (confirm("Etes vous sûr(e) de vouloir supprimer cet utilisateur?")) {
                this.loading = true;
                try {
                    let config = {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "key=AAAALeem-1k:APA91bFi6XX1XOe2gz-VGRBEKI00LfWbXS8TpYRQKzKzc9L3mVKJgZwXWJuNZetn5F316V1ePT_qwFyrR-6q7nwVGs7Hp649JGlEb-wUdpRfDyfvrEcaUxFlsGEjjMXjZY6ap2pQwY-Q"
                        }
                    };
                    let body = {
                        userId: item.userId,
                    };
                    AXIOS.post("https://thawing-badlands-05581.herokuapp.com/deleteUser", body, config);
                    await this.removeusers(item);

                    this.loading = false;
                    this.snack = true;
                    this.snackColor = "success";
                    this.snackText = "Utilisateur supprimé";
                } catch (e) {
                    this.loading = false;
                    this.snack = true;
                    this.snackColor = "error";
                    this.snackText = "Utilisateur non supprimé";
                    console.error(e);
                }
            } else {
                this.loading = false;
            }
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        close1() {
            this.dialog1 = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        async save() {
            if (!this.$refs.dialogForm.validate()) return;
            if (this.editedIndex > -1) {
                this.loading = true;
                try {
                    await this.updateUsers({
                        index: this.editedIndex,
                        user: this.editedItem,
                    });
                    this.loading = false;
                    this.close();

                    this.snack = true;
                    this.snackColor = "success";
                    this.snackText = "L'utilisateur a été mise à jour";
                } catch (e) {
                    this.loading = false;
                    this.close();

                    this.snack = true;
                    this.snackColor = "error";
                    this.snackText = "L'utilisateur n'a pas pu être mise à jour";

                    console.error(e);
                }
            }
        },

        async save1() {
            if (!this.$refs.dialogForm.validate()) return;

            this.loading = true;
            try {
                await this.addusers(this.editedItem);
                this.loading = false;
                this.close1();
                this.snack = true;
                this.snackColor = "success";
                this.snackText = "L'utilisateur a été crée avec succès.";
                this.defaultItem = Object.assign({}, this.defaultItemInit);
            } catch (e) {
                this.loading = false;
                this.close1();

                this.snack = true;
                this.snackColor = "error";
                this.snackText = "L'utilisateur n'a pas pu être crée.";

                console.error(e);
            }
        },
    },

    filters: {
        truncate: function (text, length, suffix) {
            if (text.length > length) {
                return text.substring(0, length) + suffix;
            } else {
                return text;
            }
        },
    },
};
</script>
