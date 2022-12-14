import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
import Login from "../views/Login";
import Users from "../views/admin/Users";
import Dashboard from "../views/admin/Dashboard";
import evenementsACT from "../views/admin/evenementsACT";
import evenementsACTClientGest from "../views/admin/evenementsACTClient";
import inspectionsOP from "../views/admin/inspectionsOP";
import controlesOP from "../views/admin/controlesOP";
import settings from "../views/admin/settings";
import compteRendus from "../views/admin/compteRendus";
import controlesVehi from "../views/admin/controlesVehi";
import gestionSecurite from "../views/admin/gestionSecurite";
import passationVehicule from "../views/admin/passationVehicule";
import profile from "../views/admin/profile";
import audit from "../views/admin/audit";
import customFields from "../views/admin/customFields";

Vue.use(VueRouter);

const routes = [
    {
        // Login Page
        path: "/",
        component: Login,
    },
    {
        path: "/admin",
        component: () => import("@/views/Index"),
        children: [
            // Dashboard
            {
                path: "",
                redirect: "dashboard",
            },
            {
                name: "Tableau de bord",
                path: "dashboard",
                component: Dashboard,
            },
            { name: "Utilisateurs", path: "users", component: Users },
            {
                name: "Événements ACT",
                path: "evenementsACT",
                component: evenementsACT,
            },
            {
                name: "Inspections opérationnelles",
                path: "inspectionsOP",
                component: inspectionsOP,
            },
            {
                name: "Contrôle des opérations LVP",
                path: "controlesOP",
                component: controlesOP,
            },
            {
                name: "Compte rendus IBIS ACT",
                path: "compteRendus",
                component: compteRendus,
            },
            {
                name: "Contrôle des véhicules",
                path: "controlesVehi",
                component: controlesVehi,
            },
            {
                name: "Armes et munitions",
                path: "gestionSecurite",
                component: gestionSecurite,
            },
            {
                name: "Matériels et véhicules",
                path: "passationVehicule",
                component: passationVehicule,
            },
            {
                path: "customFields",
                name: "Champs personnalisés",
                component: customFields,
            },

            { name: "Profil", path: "profile", component: profile },
            { name: "Audit", path: "audit", component: audit },
            { name: "Réglages", path: "settings", component: settings },
            {
                name: "Incidents déclarés par les clients",
                path: "evenementsACTClientGest",
                component: evenementsACTClientGest,
            },
            {
                path: "",
                redirect: "dashboard",
            },
        ],
        meta: {
            requiresAuth: true,
        },
    },

    {
        // Not found Page
        path: "/*",
        redirect: "/",
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!firebase.auth().currentUser) {
            next({ name: "/" });
        } else {
            next();
        }
    } else if (to.path == "/") {
        if (firebase.auth().currentUser) {
            next({ path: "/admin/dashboard" });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
