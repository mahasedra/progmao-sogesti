<template>
<v-card class="spacing-playground ma-5">

    <v-data-table :headers="headers" :items="customFields" :search="search" class="elevation-4" :loading="loading" loading-text="Chargement...Veuillez patienter">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="underline">Liste</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <h4 style="color: #ff9800; text-align: center;">Espace reservé aux informaticiens</h4>
                <v-spacer />

                <v-dialog v-model="dialog" max-width="700px">
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Modifier un champ personnalisé
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-account-outline" :disabled="loading" :rules="titleRule" v-model="editedItem.title" label="Titre"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-key-chain-variant" :disabled="loading" :rules="titleRule" v-model="editedItem.cle" label="Clé"></v-text-field>
                                    <v-checkbox v-model="editedItem.obligatoire" :label="`Champ obligatoire`"></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row style="color: red; font-weight:bold">
                                La clé doit obligatoirement être collée et ne doit contenir aucun caractère accentué
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-format-list-bulleted-type" label="Type" :disabled="loading" :rules="titleRule" v-model="editedItem.type" :items="items3"></v-select>
                                </v-col>
                            </v-row>
                            <v-row v-if="editedItem.type == 'Liste déroulante'">
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-account-outline" :disabled="loading" :rules="titleRule" v-model="editedItem.listData" label="Contenu de la liste déroulante"></v-text-field>
                                    <v-row style="color: red; font-weight:bold">
                                        Entrez les valeurs de la liste déroulante séparés par une virgule ","
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row style="color: black; font-weight:bold">
                                Veuillez cocher les pages concernés par le champ :
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-checkbox v-if="editedItem.type != 'Arme' && editedItem.type != 'Munition' && editedItem.type != 'Véhicule'" v-model="editedItem.evenementsACT" :label="`Événements ACT`"></v-checkbox>
                                    <v-checkbox v-if="editedItem.type != 'Arme' && editedItem.type != 'Munition' && editedItem.type != 'Véhicule'" v-model="editedItem.inspectionsOp" :label="`Inspections opérationnelles`">
                                    </v-checkbox>
                                    <v-checkbox v-if="editedItem.type != 'Arme' && editedItem.type != 'Munition' && editedItem.type != 'Véhicule'" v-model="editedItem.controlesOp" :label="`Contrôle des opérations LVP`">
                                    </v-checkbox>
                                    <v-checkbox v-if="editedItem.type != 'Arme' && editedItem.type != 'Munition' && editedItem.type != 'Véhicule'" v-model="editedItem.compteRenduACT" :label="`Compte rendus IBIS ACT`"></v-checkbox>
                                    <v-checkbox v-if="editedItem.type != 'Arme' && editedItem.type != 'Munition' && editedItem.type != 'Véhicule'" v-model="editedItem.controleVehi" :label="`Contrôle des véhicules`"></v-checkbox>
                                    <v-checkbox v-if="editedItem.type != 'Véhicule'" v-model="editedItem.armesEtMunitions" :label="`Armes et munitions`"></v-checkbox>
                                    <v-checkbox v-if="editedItem.type != 'Arme' && editedItem.type != 'Munition'" v-model="editedItem.passationVehicule" :label="`Suivi de matériels et véhicules`">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-format-list-bulleted-type" label="Statut" :disabled="loading" :rules="titleRule" v-model="editedItem.status" :items="items2"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="save()">Enregistrer</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="close()">Quitter</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </base-material-card>
                </v-dialog>

                <v-dialog v-model="dialog1" max-width="700px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn dark class="mb-2 white--text py-4" v-bind="attrs" v-on="on" color="rgba(0, 157, 160, 0.11)" depressed small>
                            <v-icon color="rgb(0, 144, 146)">
                                mdi-plus
                            </v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </template>
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Ajouter un nouveau champ
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-account-outline" :disabled="loading" :rules="titleRule" v-model="defaultItem.title" label="Titre"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-key-chain-variant" :disabled="loading" :rules="titleRule" v-model="defaultItem.cle" label="Clé"></v-text-field>
                                    <v-checkbox v-model="defaultItem.obligatoire" :label="`Champ obligatoire`"></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row style="color: red; font-weight:bold">
                                La clé doit obligatoirement être collée et ne doit contenir aucun caractère accentué.
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-format-list-bulleted-type" label="Type" :disabled="loading" :rules="titleRule" v-model="defaultItem.type" :items="items3"></v-select>
                                </v-col>
                            </v-row>
                            <v-row v-if="defaultItem.type == 'Liste déroulante'">
                                <v-col cols="12">
                                    <v-text-field prepend-inner-icon="mdi-account-outline" :disabled="loading" :rules="titleRule" v-model="defaultItem.listData" label="Contenu de la liste déroulante"></v-text-field>
                                    <v-row style="color: red; font-weight:bold">
                                        Entrez les valeurs de la liste déroulante séparés par une virgule "," et finir par une
                                        virgule.
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row style="color: black; font-weight:bold">
                                Veuillez cocher les pages concernés par le champ :
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-checkbox v-if="defaultItem.type != 'Arme' && defaultItem.type != 'Munition' && defaultItem.type != 'Véhicule'" v-model="defaultItem.evenementsACT" :label="`Événements ACT`"></v-checkbox>
                                    <v-checkbox v-if="defaultItem.type != 'Arme' && defaultItem.type != 'Munition' && defaultItem.type != 'Véhicule'" v-model="defaultItem.inspectionsOp" :label="`Inspections opérationnelles`">
                                    </v-checkbox>
                                    <v-checkbox v-if="defaultItem.type != 'Arme' && defaultItem.type != 'Munition' && defaultItem.type != 'Véhicule'" v-model="defaultItem.controlesOp" :label="`Contrôle des opérations LVP`">
                                    </v-checkbox>
                                    <v-checkbox v-if="defaultItem.type != 'Arme' && defaultItem.type != 'Munition' && defaultItem.type != 'Véhicule'" v-model="defaultItem.compteRenduACT" :label="`Compte rendus IBIS ACT`"></v-checkbox>
                                    <v-checkbox v-if="defaultItem.type != 'Arme' && defaultItem.type != 'Munition' && defaultItem.type != 'Véhicule'" v-model="defaultItem.controleVehi" :label="`Contrôle des véhicules`"></v-checkbox>
                                    <v-checkbox v-if="defaultItem.type != 'Véhicule'" v-model="defaultItem.armesEtMunitions" :label="`Armes et munitions`"></v-checkbox>
                                    <v-checkbox v-if="defaultItem.type != 'Arme' && defaultItem.type != 'Munition'" v-model="defaultItem.passationVehicule" :label="`Suivi de matériels et véhicules`">
                                    </v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-format-list-bulleted-type" label="Statut" :disabled="loading" :rules="titleRule" v-model="defaultItem.status" :items="items2"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="save1()">Enregistrer</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="close1()">Quitter</v-btn>
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

                </v-col>

            </v-card-title>
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
                    <v-list-item link>
                        <v-list-item-title @click="editItem(item)">Editer</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="deleteItem(item)">Supprimer</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </template>

        <template v-slot:[`item.status`]="{ value }">
            <v-chip v-if="value == 'Activé'" color="green" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Désactivé'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
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
export default {
    data() {
        return {
            snack: false,
            snackColor: "",
            snackText: "",
            search: "",
            loading: true,
            headers: [{
                    text: "Titre",
                    value: "title"
                },
                {
                    text: "Clé",
                    value: "cle"
                },
                {
                    text: "Type",
                    value: "type"
                },
                {
                    text: "Date de création",
                    value: "dateEnvoi"
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
            items2: ["Activé", "Désactivé"],
            items3: ["Texte", "Date", "Numérique", "Zone de texte", "Liste déroulante", "Case à cocher", "Fichier", "Véhicule"],
            editedIndex: -1,
            editedItem: {
                title: "",
                cle: "",
                type: "",
                dateEnvoi: "",
                listData: "",
                obligatoire: false,
                evenementsACT: false,
                inspectionsOp: false,
                controlesOp: false,
                compteRenduACT: false,
                controleVehi: false,
                armesEtMunitions: false,
                passationVehicule: false,
                status: "Activé"
            },
            defaultItem: {
                title: "",
                cle: "",
                type: "",
                dateEnvoi: "",
                listData: "",
                obligatoire: false,
                evenementsACT: false,
                inspectionsOp: false,
                controlesOp: false,
                compteRenduACT: false,
                controleVehi: false,
                armesEtMunitions: false,
                passationVehicule: false,
                status: "Activé"
            },
            defaultItemInit: {
                title: "",
                cle: "",
                type: "",
                dateEnvoi: "",
                listData: "",
                obligatoire: false,
                evenementsACT: false,
                inspectionsOp: false,
                controlesOp: false,
                compteRenduACT: false,
                controleVehi: false,
                armesEtMunitions: false,
                passationVehicule: false,
                status: "Activé"
            },
        };
    },
    computed: {

        ...mapGetters({
            customFields: "customFields/getcustomFields",
        }),
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogView(val) {
            val || this.close();
        },
    },

    created() {
        this.initialize();
    },

    methods: {
        ...mapActions({
            loadcustomFields: "customFields/loadcustomFields",
            removecustomFields: "customFields/removecustomFields",
        }),
        openLink(link) {
            window.open(link, "_blank");
        },
        ...mapActions({
            addcustomFields: "customFields/addcustomFields",
            updatecustomFields: "customFields/updatecustomFields",
            removecustomFields: "customFields/removecustomFields",
        }),
        getcustomFieldsById: function (id) {
            let customFields = this.customFields.filter((c) => c.id == id)[0];

            if (customFields === undefined) {
                console.log("undefined qarşim");
                return {
                    nom: "Unknown"
                };
            }
            return customFields;
        },
        async initialize() {
            this.loading = true;
            try {
                await this.loadcustomFields();
            } catch (e) {
                console.error(e);
            }
            this.loading = false;
        },

        editItem(item) {
            this.editedIndex = this.customFields.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
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
        async deleteItem(item) {
            this.loading = true;
            if (confirm("Etes vous sûr(e) de vouloir supprimer cet champ?")) {
                this.loading = true;
                try {
                    await this.removecustomFields(item);
                    this.loading = false;
                    this.snack = true;
                    this.snackColor = "success";
                    this.snackText = "Champ supprimé";
                } catch (e) {
                    this.loading = false;
                    this.snack = true;
                    this.snackColor = "error";
                    this.snackText = "Champ non supprimé";
                    console.error(e);
                }
            } else {
                this.loading = false;
            }
        },
        async save() {
            if (!this.$refs.dialogForm.validate()) return;
            if (this.editedIndex > -1) {
                this.loading = true;
                try {
                    await this.updatecustomFields({
                        index: this.editedIndex,
                        order: this.editedItem,
                    });
                    this.loading = false;
                    this.close();
                    this.snack = true;
                    this.snackColor = "success";
                    this.snackText = "Le champ a été mise à jour avec succès.";
                } catch (e) {
                    this.loading = false;
                    this.close();

                    this.snack = true;
                    this.snackColor = "error";
                    this.snackText = "Erreur lors de la mise à jour du champ.";
                    console.error(e);
                }
            }
        },
        async save1() {
            if (!this.$refs.dialogForm.validate()) return;
            this.loading = true;
            try {
                await this.addcustomFields(this.defaultItem);
                this.loading = false;
                this.close1();
                this.snack = true;
                this.snackColor = "success";
                this.snackText = "Le champ a été crée avec succès.";
                this.defaultItem = Object.assign({}, this.defaultItemInit);
            } catch (e) {
                this.loading = false;
                this.close1();
                this.snack = true;
                this.snackColor = "error";
                this.snackText = "Le champ n'a pas pu être crée.";
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
