<template>
<v-card class="spacing-playground ma-5">
    <v-data-table :headers="headers" :items="settings" :search="search" class="elevation-1" :loading="loading" loading-text="Chargement...Veuillez patienter">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="underline">Liste</v-toolbar-title>

                <v-spacer />
                <v-dialog v-model="dialog" max-width="500px">
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Modifier les réglages
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Affichage des formulaires
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <center>
                                <h2 style="font-weight: bold">
                                    Affichage des formulaires
                                </h2>
                            </center>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-form-select" label="Événements ACT" :disabled="loading" :rules="titleRule" v-model="editedItem.evenementsACT" :items="items2"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-form-select" label="Inspections opérationnelles" :disabled="loading" :rules="titleRule" v-model="editedItem.inspectionsOp" :items="items2">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-form-select" label="Contrôle des opérations LVP" :disabled="loading" :rules="titleRule" v-model="editedItem.controlesOp" :items="items2">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-form-select" label="Compte rendu IBIS ACT" :disabled="loading" :rules="titleRule" v-model="editedItem.compteRenduACT" :items="items2"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-form-select" label="Contrôle des véhicules" :disabled="loading" :rules="titleRule" v-model="editedItem.controleVehi" :items="items2">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-form-select" label="Gestion de la sécurité" :disabled="loading" :rules="titleRule" v-model="editedItem.armesEtMunitions" :items="items2">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-form-select" label="Matériels et véhicules" :disabled="loading" :rules="titleRule" v-model="editedItem.passationVehicule" :items="items2">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <!-- <v-divider/> <br>
                     <center>
                      <h2 style="font-weight: bold">
                       Champs personnalisés
                      </h2>
                    </center> -->
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="save">Validerr</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="close">Quitter</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </base-material-card>
                </v-dialog>
            </v-toolbar>
            <v-divider class="mx-4" inset horizontal />
        </template>

        <template v-slot:[`item.nom`]="{ value }">
            <span class="">{{ value }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon medium class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
        </template>

        <template v-slot:[`item.evenementsACT`]="{ value }">
            <v-chip v-if="value == 'Activé'" class="ma-2" color="green" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Désactivé'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
        </template>
        <template v-slot:[`item.inspectionsOp`]="{ value }">
            <v-chip v-if="value == 'Activé'" class="ma-2" color="green" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Désactivé'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
        </template>
        <template v-slot:[`item.controlesOp`]="{ value }">
            <v-chip v-if="value == 'Activé'" class="ma-2" color="green" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Désactivé'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
        </template>
        <template v-slot:[`item.compteRenduACT`]="{ value }">
            <v-chip v-if="value == 'Activé'" class="ma-2" color="green" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Désactivé'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
        </template><template v-slot:[`item.controleVehi`]="{ value }">
            <v-chip v-if="value == 'Activé'" class="ma-2" color="green" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Désactivé'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
        </template><template v-slot:[`item.armesEtMunitions`]="{ value }">
            <v-chip v-if="value == 'Activé'" class="ma-2" color="green" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Désactivé'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
        </template><template v-slot:[`item.passationVehicule`]="{ value }">
            <v-chip v-if="value == 'Activé'" class="ma-2" color="green" outlined style="color: white">{{ value }}</v-chip>
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
                    text: "Événements ACT",
                    value: "evenementsACT"
                },
                {
                    text: "Inspections Op",
                    align: "start",
                    sortable: true,
                    value: "inspectionsOp",
                },
                {
                    text: "Contrôle des opérations",
                    align: "start",
                    sortable: true,
                    value: "controlesOp",
                },
                {
                    text: "Comptes rendus IBIS",
                    align: "start",
                    sortable: true,
                    value: "compteRenduACT",
                },
                {
                    text: "Contrôle des véhicules",
                    align: "start",
                    sortable: true,
                    value: "controleVehi",
                },
                {
                    text: "Armes et munitions",
                    align: "start",
                    sortable: true,
                    value: "armesEtMunitions",
                },
                {
                    text: "Matériels et véhicules",
                    align: "start",
                    sortable: true,
                    value: "passationVehicule",
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false
                },
            ],
            titleRule: [(v) => !!v || "Champ obligatoire"],
            items2: ["Activé", "Désactivé"],
            items3: ["Texte", "Date", "Numérique", "Menu déroulant"],
            editedIndex: -1,
            editedItem: {
                evenementsACT: "",
                inspectionsOp: "",
                controlesOp: "",
                compteRenduACT: "",
                controleVehi: "",
                armesEtMunitions: "",
                passationVehicule: ""
            },
            defaultItem: {
                evenementsACT: "",
                inspectionsOp: "",
                controlesOp: "",
                compteRenduACT: "",
                controleVehi: "",
                armesEtMunitions: "",
                passationVehicule: ""
            },
        };
    },
    computed: {

        ...mapGetters({
            settings: "settings/getsettings",
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
            loadsettings: "settings/loadsettings",
        }),
        openLink(link) {
            window.open(link, "_blank");
        },
        ...mapActions({
            updatesettings: "settings/updatesettings",
            removesettings: "settings/removesettings",
        }),
        getsettingsById: function (id) {
            let settings = this.settings.filter((c) => c.id == id)[0];

            if (settings === undefined) {
                console.log("undefined qarşim");
                return {
                    nom: "Unknown"
                };
            }
            return settings;
        },
        async initialize() {
            this.loading = true;
            try {
                await this.loadsettings();
            } catch (e) {
                console.error(e);
            }
            this.loading = false;
        },

        editItem(item) {
            this.editedIndex = this.settings.indexOf(item);
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

        async save() {
            if (!this.$refs.dialogForm.validate()) return;
            if (this.editedIndex > -1) {
                this.loading = true;
                try {
                    await this.updatesettings({
                        index: this.editedIndex,
                        order: this.editedItem,
                    });
                    this.loading = false;
                    this.close();
                    this.snack = true;
                    this.snackColor = "success";
                    this.snackText = "Les réglages ont été mise à jour avec succès.";
                } catch (e) {
                    this.loading = false;
                    this.close();

                    this.snack = true;
                    this.snackColor = "error";
                    this.snackText = "Erreur lors de la mise à jour des réglages.";
                    console.error(e);
                }
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
