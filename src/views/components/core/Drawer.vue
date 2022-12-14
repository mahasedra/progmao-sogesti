<template>
    <v-navigation-drawer id="core-navigation-drawer" v-model="drawer"
        :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'" :expand-on-hover="expandOnHover"
        :right="$vuetify.rtl" :src="barImage" mobile-break-point="960" mini-variant app width="260" v-bind="$attrs">
        <template v-slot:img="props">
            <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
        </template>

        <v-divider class="mb-1" />

        <v-list dense>
            <v-list-item style="padding: 0 10px">
                <v-list-item-avatar class="align-self-center" color="white" contain>
                    <v-img lazy-src="@/assets/logo_salt.png"
                        src="https://firebasestorage.googleapis.com/v0/b/sogesti-formapp.appspot.com/o/logo_salt.png?alt=media&token=837aa671-0be4-473c-8349-dadc51297921"
                        max-height="150" max-width="150" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="display-1" v-text="profile.title" />
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider class="mb-2" />

        <v-list expand>
            <template v-for="(item, i) in computedItems">
                <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
                    <!--  -->
                </base-item-group>

                <base-item v-else :key="`item-${i}`" :item="item" />
            </template>
            <div />
        </v-list>
    </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
    name: "DashboardCoreDrawer",

    props: {
        expandOnHover: {
            type: Boolean,
            default: true,
        },
    },

    data: () => ({
        path: "/admin",
        items: [
            {
                to: "/dashboard",
                title: "Tableau de bord",
                icon: "mdi-view-dashboard",
            },
            { to: "/users", title: "Utilisateurs", icon: "mdi-account" },
            {
                to: "/evenementsACT",
                title: "Événements ACT",
                icon: "mdi-calendar",
            },
            {
                to: "/inspectionsOP",
                title: "Inspections opérationnelles",
                icon: "mdi-account-multiple-check",
            },
            {
                to: "/controlesOP",
                title: "Contrôle des opérations LVP",
                icon: "mdi-alarm-light",
            },
            {
                to: "/compteRendus",
                title: "Compte rendus IBIS ACT",
                icon: "mdi-alert-outline",
            },
            {
                to: "/controlesVehi",
                title: "Contrôle des véhicules",
                icon: "mdi-car-wrench",
            },
            {
                to: "/gestionSecurite",
                title: "Armes et munitions",
                icon: "mdi-security-network",
            },
            {
                to: "/passationVehicule",
                title: "Matériels et véhicules",
                icon: "mdi-hammer-screwdriver",
            },
            {
                to: "/evenementsACTClientGest",
                title: "Incidents déclarés par les clients",
                icon: "mdi-text-account",
            },
            {
                to: "/customFields",
                title: "Champs personnalisés",
                icon: "mdi-focus-field",
            },
            {
                to: "/profile",
                title: "Profil",
                icon: "mdi-badge-account-outline",
            },
            {
                to: "/audit",
                title: "Audit",
                icon: "mdi-comment-account-outline",
            },
            {
                to: "/settings",
                title: "Réglages",
                icon: "mdi-cog",
            },
        ],
    }),

    computed: {
        ...mapState(["barColor", "barImage"]),
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.commit("SET_DRAWER", val);
            },
        },
        computedItems() {
            return this.items.map(this.mapItem);
        },
        profile() {
            return {
                avatar: true,
                title: this.$t("avatar"),
            };
        },
    },

    methods: {
        mapItem(item) {
            return {
                ...item,
                children: item.children
                    ? item.children.map(this.mapItem)
                    : undefined,
                title: this.$t(item.title),
                to: this.path + item.to,
            };
        },
    },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

.v-navigation-drawer__content
  height: 100%
  overflow: hidden
  &:hover
    overflow-y: scroll
  &::-webkit-scrollbar
    width: 10px
  &::-webkit-scrollbar-thumb
    background: grey
    border-radius: 20px

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item  
    padding:0 12px
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
