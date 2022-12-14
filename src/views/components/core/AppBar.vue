<template>
    <v-app-bar id="app-bar" app fixed flat height="60">
        <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
            <v-icon v-if="drawer">
                mdi-menu-open
            </v-icon>

            <v-icon v-else>
                mdi-menu
            </v-icon>
        </v-btn>

        <v-toolbar-title class="hidden-sm-and-down font-weight-light" v-text="$route.name" />

        <v-spacer />

        <v-btn text icon @click="logOut()">
            <v-icon>mdi-power</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import firebase from "firebase";
// Utilities
import { mapState, mapMutations } from "vuex";

export default {
    name: "DashboardCoreAppBar",

    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState(["drawer"]),
    },

    methods: {
        ...mapMutations({
            setDrawer: "SET_DRAWER",
        }),

        logOut() {
            if (confirm("Êtes vous sûr(e) de vouloir vous déconnecter?")) {
                var m = new Date();
                var dateString =
                    ("0" + m.getUTCDate()).slice(-2) + "-" +
                    ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                    m.getUTCFullYear() + " " +
                    ("0" + m.getUTCHours()).slice(-2) + ":" +
                    ("0" + m.getUTCMinutes()).slice(-2);
                let order = {};
                order["date"] = dateString;
                order["event"] = 'Déconnexion';
                order["user"] = localStorage.getItem("nom");
                order["userId"] = localStorage.getItem("userId");
                order["tel"] = localStorage.getItem("tel");
                order["role"] = localStorage.getItem("role");
                firebase.firestore().collection("audit").add(order);

                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.replace({ path: "/" });
                    });
            }
        },
    },
};
</script>
