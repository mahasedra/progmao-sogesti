<template>
<v-card class="spacing-playground ma-5">

    <v-data-table :headers="headers" :items="audit" :search="search" class="elevation-4" :loading="loading" loading-text="Chargement...Veuillez patienter">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="underline">Liste</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <h4 style="color: #ff9800; text-align: center;">Suivi des sessions</h4>
                <v-spacer />
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
        <template v-slot:[`item.event`]="{ value }">

            <v-chip v-if="value == 'Connexion'" color="blue" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value == 'Déconnexion'" color="red" class="ma-2" outlined style="color: white">{{ value }}</v-chip>
            <v-chip v-if="value != 'Déconnexion' && value != 'Connexion'" color="green" class="ma-2" outlined style="color: white">{{
            value
        }}</v-chip>
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
                    text: "Événement",
                    value: "event"
                },
                {
                    text: "Utilisateur",
                    value: "user"
                },
                {
                    text: "Rôle",
                    value: "role"
                },
                {
                    text: "Téléphone",
                    value: "tel"
                },
                {
                    text: "Date et heure",
                    value: "date"
                },
            ],
            titleRule: [(v) => !!v || "Champ obligatoire"],
            editedIndex: -1,
            editedItem: {
                user: "",
                tel: "",
                event: "",
                ip: "",
                date: "",
                role: ""
            },
            defaultItem: {
                user: "",
                event: "",
                ip: "",
                tel: "",
                date: "",
                role: ""
            },
        };
    },
    computed: {

        ...mapGetters({
            audit: "audit/getaudit",
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
    ...mapActions({
        loadaudit: "audit/loadaudit",
    }),
    methods: {
        ...mapActions({
            loadaudit: "audit/loadaudit",
        }),

        getauditById: function (id) {
            let audit = this.audit.filter((c) => c.id == id)[0];

            if (audit === undefined) {
                console.log("undefined qarşim");
                return {
                    nom: "Unknown"
                };
            }
            return audit;
        },
        async initialize() {
            this.loading = true;
            try {
                await this.loadaudit();
                console.log()
            } catch (e) {
                console.error(e);
            }
            this.loading = false;
        }
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
