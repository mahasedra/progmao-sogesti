<template>
  <v-app style="
      /* background-image: url('https://www.lenouveaureporter.com/wp-content/uploads/2020/07/A%C3%A9roport-de-Lom%C3%A9.jpg');
      background-repeat: no-repeat;
      background-size: cover; */
    ">
    <v-navigation-drawer v-model="drawer" app expand-on-hover>
      <center>
        <v-img
          lazy-src="https://firebasestorage.googleapis.com/v0/b/sogesti-formapp.appspot.com/o/logo_salt.png?alt=media&token=837aa671-0be4-473c-8349-dadc51297921"
          max-height="150" max-width="150"
          src="https://firebasestorage.googleapis.com/v0/b/sogesti-formapp.appspot.com/o/logo_salt.png?alt=media&token=837aa671-0be4-473c-8349-dadc51297921">
        </v-img>
      </center>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(menu, index) in menus" :key="index" @click="goto(menu.path)">
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app clipped-left dark color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-weight: bold">GES-UPRA Admin</v-toolbar-title>
      <v-spacer />
      <v-btn text icon @click="dark = !dark">
        <v-icon>{{ dark ? "mdi-brightness-4" : "mdi-brightness-6" }}</v-icon>
      </v-btn>
      <v-btn text icon @click="logOut()">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <div class="flex text-center">
        <span class="lead text--secondary text-center">Software & Design with ❤ by
          <a href="https://sogesti.fr/" class="text-decoration-none" target="_blank">SOGESTI</a>
        </span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    dark: false,
    path: "/admin",
    drawer: null,
    menus: [
      { path: "", title: "Tableau de bord", icon: "mdi-view-dashboard" },
      { path: "/users", title: "Utilisateurs", icon: "mdi-account" },
      { path: "/evenementsACT", title: "Événements ACT", icon: "mdi-calendar" },
      {
        path: "/inspectionsOP",
        title: "Inspections opérationnelles",
        icon: "mdi-account-multiple-check",
      },
      {
        path: "/controlesOP",
        title: "Contrôle des opérations LVP",
        icon: "mdi-alarm-light",
      },
      {
        path: "/compteRendus",
        title: "Compte rendus IBIS ACT",
        icon: "mdi-alert-outline",
      },
      {
        path: "/controlesVehi",
        title: "Contrôle des véhicules",
        icon: "mdi-car-wrench",
      },
      {
        path: "/gestionSecurite",
        title: "Armes et munitions",
        icon: "mdi-security-network",
      },
      {
        path: "/passationVehicule",
        title: "Matériels et véhicules",
        icon: "mdi-hammer-screwdriver",
      },
      {
        path: "/profile",
        title: "Profil",
        icon: "mdi-badge-account-outline",
      },
      {
        path: "/settings",
        title: "Réglages",
        icon: "mdi-cog",
      },
    ],
  }),
  created() {
    this.dark = this.$vuetify.theme.dark;
    this.initialize();
  },
  computed: {
    ...mapGetters({
      users: "users/getusers",
      evenementsACT: "evenementsACT/getevenementsACT",
      inspectionsOP: "inspectionsOP/getinspectionsOP",
      controlesOP: "controlesOP/getcontrolesOP",
      controlesVehi: "controlesVehi/getcontrolesVehi",
      compteRendus: "compteRendus/getcompteRendus",
      gestionSecurite: "gestionSecurite/getgestionSecurite",
      passationVehicule: "passationVehicule/getpassationVehicule",
    }),
  },
  methods: {
    ...mapActions({
      loadusers: "users/loadusers",
      loadevenementsACT: "evenementsACT/loadevenementsACT",
      loadinspectionsOP: "inspectionsOP/loadinspectionsOP",
      loadcontrolesOP: "controlesOP/loadcontrolesOP",
      loadcompteRendus: "compteRendus/loadcompteRendus",
      loadcontrolesVehi: "controlesVehi/loadcontrolesVehi",
      loadgestionSecurite: "gestionSecurite/loadgestionSecurite",
      loadpassationVehicule: "passationVehicule/loadpassationVehicule",
    }),
    initialize() {
      // this.loadevenementsACT();
      // this.loadgestionSecurite();
      // this.loadcompteRendus();
      // this.loadusers();
      // this.loadinspectionsOP();
      // this.loadcontrolesOP();
      // this.loadcontrolesVehi();
    },

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
    goto(newPath) {
      this.$router.push({ path: this.path + newPath }).catch(() => { });
    },
  },
  watch: {
    dark: function () {
      this.$vuetify.theme.dark = this.dark;
    },
  },
};
</script>