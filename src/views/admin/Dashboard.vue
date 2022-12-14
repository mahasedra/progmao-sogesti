<template>
    <v-container id="dashboard" fluid tag="section">
        <v-row>
            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Événements ACT'" color="linear-gradient(45deg,#843cf7,#38b8f2)"
                    :data="evenementsACT.length" :icon="'mdi-calendar'"
                    :dataEnCours="dataStatsEvenements['dataEnCoursEvACT']"
                    :dataValide="dataStatsEvenements['dataValideEvACT']"
                    :dataApprouve="dataStatsEvenements['dataApprouveEvACT']" :path="'/evenementsACT'"
                    class="buble-background" />
            </v-col>

            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Inspections opérationnelles'"
                    color="linear-gradient(45deg,#9b3cb7,#ff396f)" :data="inspectionsOP.length"
                    :icon="'mdi-account-multiple-check'" :path="'/inspectionsOP'" :dataEnCours="
                        dataStatsinspectionsOP['dataEnCoursinspectionsOp']
                    " :dataValide="
    dataStatsinspectionsOP['dataValideinspectionsOp']
" :dataApprouve="
    dataStatsinspectionsOP['dataApprouveinspectionsOp']
" class="buble-background" />
            </v-col>

            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Contrôles des opérations LVP'"
                    color="linear-gradient(45deg,#004b91,#78cc37)" :data="controlesOP.length" :icon="'mdi-alarm-light'"
                    :path="'/controlesOP'" :dataEnCours="dataStatscontrolesOP['dataEnCourscontroleOp']"
                    :dataValide="dataStatscontrolesOP['dataValidecontroleOp']" :dataApprouve="
                        dataStatscontrolesOP['dataApprouvecontroleOp']
                    " class="buble-background" />
            </v-col>

            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Compte rendus IBIS ACT'"
                    color="linear-gradient(45deg,#ee0979,#ff6a00)" :data="compteRendus.length"
                    :icon="'mdi-alert-outline'" :path="'/compteRendus'" :dataEnCours="
                        dataStatscompteRendus['dataEnCourscompteRendusOp']
                    " :dataValide="
    dataStatscompteRendus['dataValidecompteRendusOp']
" :dataApprouve="
    dataStatscompteRendus['dataApprouvecompteRendusOp']
" class="buble-background" />
            </v-col>

            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Contrôle des véhicules'"
                    color="linear-gradient(45deg,#c33764,#1d2671)" :data="controlesVehi.length" :icon="'mdi-car-wrench'"
                    :path="'/controlesVehi'" :dataEnCours="
                        dataStatscontrolesVehi['dataEnCourscontroleVehicule']
                    " :dataValide="
    dataStatscontrolesVehi['dataValidecontroleVehicule']
" :dataApprouve="
    dataStatscontrolesVehi['dataApprouvecontroleVehicule']
" class="buble-background" />
            </v-col>

            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Armes et munitions'" color="linear-gradient(45deg,#bf360c,#f57c00)"
                    :data="gestionSecurite.length" :icon="'mdi-security-network'" :path="'/gestionSecurite'"
                    :dataEnCours="
                        dataStatsgestionSecurite['dataEnCoursarmesMunitions']
                    " :dataValide="
    dataStatsgestionSecurite['dataValidearmesMunitions']
" :dataApprouve="
    dataStatsgestionSecurite['dataApprouvearmesMunitions']
" class="buble-background" />
            </v-col>
        </v-row>
        <v-row class="d-flex align-stretch justify-space-between">
            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Matériels et véhicules'"
                    color="linear-gradient(45deg,#ff5252,#f48fb1)" :data="passationVehicule.length"
                    :icon="'mdi-hammer-screwdriver'" :path="'/passationVehicule'" :dataEnCours="
                        dataStatsMaterielsVehicules[
                        'dataEnCourspassationVehicule'
                        ]
                    " :dataValide="
    dataStatsMaterielsVehicules[
    'dataValidepassationVehicule'
    ]
" :dataApprouve="
    dataStatsMaterielsVehicules[
    'dataApprouvepassationVehicule'
    ]
" class="buble-background" />
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <base-material-stats-card :title="'Utilisateurs'" color="white" iconColor="green" :data="users.length"
                    :icon="'mdi-account'" :path="'/users'" />
            </v-col>
        </v-row>
        <v-row class="mt-10">
            <v-col cols="12" sm="6" md="4">
                <base-material-chart-card :data="evenementChartData.data" :options="evenementChartData.options"
                    :responsive-options="evenementChartData.responsiveOptions" hover-reveal type="Bar">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info"> mdi-refresh </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Événements ACT
                    </h4>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-chart-bar
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">Statistiques mensuelles</span>
                    </template>
                </base-material-chart-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <base-material-chart-card :data="inspectionsOpChartData.data" :options="inspectionsOpChartData.options"
                    :responsive-options="
                        inspectionsOpChartData.responsiveOptions
                    " hover-reveal type="Bar">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info"> mdi-refresh </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Inspections opérationnelles
                    </h4>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-chart-bar
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">Statistiques mensuelles</span>
                    </template>
                </base-material-chart-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <base-material-chart-card :data="controleOpChartData.data" :options="controleOpChartData.options"
                    :responsive-options="controleOpChartData.responsiveOptions" hover-reveal type="Bar">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info"> mdi-refresh </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Contrôles des opérations LVP
                    </h4>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-chart-bar
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">Statistiques mensuelles</span>
                    </template>
                </base-material-chart-card>
            </v-col>
            <v-col cols="12" sm="6">
                <base-material-chart-card :data="compteRendusOpChartData.data"
                    :options="compteRendusOpChartData.options" :responsive-options="
                        compteRendusOpChartData.responsiveOptions
                    " hover-reveal type="Bar">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info"> mdi-refresh </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Compte rendus IBIS ACT
                    </h4>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-chart-bar
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">Statistiques mensuelles</span>
                    </template>
                </base-material-chart-card>
            </v-col>
            <v-col cols="12" sm="6">
                <base-material-chart-card :data="controleVehiculeChartData.data"
                    :options="controleVehiculeChartData.options" :responsive-options="
                        controleVehiculeChartData.responsiveOptions
                    " hover-reveal type="Bar">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info"> mdi-refresh </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Contrôle des véhicules
                    </h4>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-chart-bar
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">Statistiques mensuelles</span>
                    </template>
                </base-material-chart-card>
            </v-col>
            <v-col cols="12" sm="6">
                <base-material-chart-card :data="armesMunitionsChartData.data"
                    :options="armesMunitionsChartData.options" :responsive-options="
                        armesMunitionsChartData.responsiveOptions
                    " hover-reveal type="Bar">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info"> mdi-refresh </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Armes et munitions
                    </h4>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-chart-bar
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">Statistiques mensuelles</span>
                    </template>
                </base-material-chart-card>
            </v-col>
            <v-col cols="12" md="6">
                <base-material-chart-card :data="passationVehiculeChartData.data"
                    :options="passationVehiculeChartData.options" :responsive-options="
                        passationVehiculeChartData.responsiveOptions
                    " hover-reveal type="Bar">
                    <template v-slot:reveal-actions>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" color="info" icon v-on="on">
                                    <v-icon color="info"> mdi-refresh </v-icon>
                                </v-btn>
                            </template>

                            <span>Refresh</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <v-btn v-bind="attrs" light icon v-on="on">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </template>

                            <span>Change Date</span>
                        </v-tooltip>
                    </template>

                    <h4 class="card-title font-weight-light mt-2 ml-2">
                        Matériels et véhicules
                    </h4>

                    <template v-slot:actions>
                        <v-icon class="mr-1" small>
                            mdi-chart-bar
                        </v-icon>
                        <span class="text-caption grey--text font-weight-light">Statistiques mensuelles</span>
                    </template>
                </base-material-chart-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { firestore } from "firebase";

export default {
    name: "DashboardDashboard",

    data() {
        return {
            evenementChartData: {
                data: {
                    labels: [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 6,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                },
                            },
                        },
                    ],
                ],
            },
            inspectionsOpChartData: {
                data: {
                    labels: [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 6,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                },
                            },
                        },
                    ],
                ],
            },
            controleOpChartData: {
                data: {
                    labels: [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 6,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                },
                            },
                        },
                    ],
                ],
            },
            compteRendusOpChartData: {
                data: {
                    labels: [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 6,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                },
                            },
                        },
                    ],
                ],
            },
            controleVehiculeChartData: {
                data: {
                    labels: [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 6,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                },
                            },
                        },
                    ],
                ],
            },
            armesMunitionsChartData: {
                data: {
                    labels: [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 6,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                },
                            },
                        },
                    ],
                ],
            },
            passationVehiculeChartData: {
                data: {
                    labels: [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                    ],
                    series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                },
                options: {
                    axisX: {
                        showGrid: false,
                    },
                    low: 0,
                    high: 6,
                    chartPadding: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0,
                    },
                },
                responsiveOptions: [
                    [
                        "screen and (max-width: 640px)",
                        {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                },
                            },
                        },
                    ],
                ],
            },
        };
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

            dataStatsEvenements: "evenementsACT/getStats",
            dataStatsinspectionsOP: "inspectionsOP/getStats",
            dataStatscontrolesOP: "controlesOP/getStats",
            dataStatscontrolesVehi: "controlesVehi/getStats",
            dataStatscompteRendus: "compteRendus/getStats",
            dataStatsgestionSecurite: "gestionSecurite/getStats",
            dataStatsMaterielsVehicules: "passationVehicule/getStats",
        }),
    },

    created() {
        this.initialize();
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
        async displayevenementsACT() {
            let evenementChartDataTemp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let forms = await firestore().collection("evenementsACT").get();
            forms.forEach((doc) => {
                let data = doc.data();
                let date = data.dateEnvoi;
                let d = date.split("-");
                let yearGet = d[2].split(" ");

                let convertedDate = new Date(yearGet[0], d[1], d[0]);
                let purchase_month = convertedDate.getMonth();
                evenementChartDataTemp[purchase_month - 1] += 1;
            });
            this.evenementChartData.options.high =
                Math.max(...evenementChartDataTemp) + 1;
            this.evenementChartData.data.series = [evenementChartDataTemp];
        },
        async displayinspectionsOp() {
            let inspectionsOpChartDataTemp = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ];
            let forms = await firestore().collection("inspectionsOp").get();
            forms.forEach((doc) => {
                let data = doc.data();
                let date = data.dateEnvoi;
                let d = date.split("-");
                let yearGet = d[2].split(" ");

                let convertedDate = new Date(yearGet[0], d[1], d[0]);
                let purchase_month = convertedDate.getMonth();
                inspectionsOpChartDataTemp[purchase_month - 1] += 1;
            });
            this.inspectionsOpChartData.options.high =
                Math.max(...inspectionsOpChartDataTemp) + 1;
            this.inspectionsOpChartData.data.series = [
                inspectionsOpChartDataTemp,
            ];
        },
        async displaycontroleOp() {
            let controleOpChartDataTemp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let forms = await firestore().collection("controleOp").get();
            forms.forEach((doc) => {
                let data = doc.data();
                let date = data.dateEnvoi;
                let d = date.split("-");
                let yearGet = d[2].split(" ");

                let convertedDate = new Date(yearGet[0], d[1], d[0]);
                let purchase_month = convertedDate.getMonth();
                controleOpChartDataTemp[purchase_month - 1] += 1;
            });
            this.controleOpChartData.options.high =
                Math.max(...controleOpChartDataTemp) + 1;
            this.controleOpChartData.data.series = [controleOpChartDataTemp];
        },
        async displaycompteRendusOp() {
            let compteRendusOpChartDataTemp = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ];
            let forms = await firestore().collection("compteRendusOp").get();
            forms.forEach((doc) => {
                let data = doc.data();
                let date = data.dateEnvoi;
                let d = date.split("-");
                let yearGet = d[2].split(" ");

                let convertedDate = new Date(yearGet[0], d[1], d[0]);
                let purchase_month = convertedDate.getMonth();
                compteRendusOpChartDataTemp[purchase_month - 1] += 1;
            });
            this.compteRendusOpChartData.options.high =
                Math.max(...compteRendusOpChartDataTemp) + 1;
            this.compteRendusOpChartData.data.series = [
                compteRendusOpChartDataTemp,
            ];
        },
        async displaycontroleVehicule() {
            let controleVehiculeChartDataTemp = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ];
            let forms = await firestore().collection("controleVehicule").get();
            forms.forEach((doc) => {
                let data = doc.data();
                let date = data.dateEnvoi;
                let d = date.split("-");
                let yearGet = d[2].split(" ");

                let convertedDate = new Date(yearGet[0], d[1], d[0]);
                let purchase_month = convertedDate.getMonth();
                controleVehiculeChartDataTemp[purchase_month - 1] += 1;
            });
            this.controleVehiculeChartData.options.high =
                Math.max(...controleVehiculeChartDataTemp) + 1;
            this.controleVehiculeChartData.data.series = [
                controleVehiculeChartDataTemp,
            ];
        },
        async displayarmesMunitions() {
            let armesMunitionsChartDataTemp = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ];
            let forms = await firestore().collection("armesMunitions").get();
            forms.forEach((doc) => {
                let data = doc.data();
                let date = data.dateEnvoi;
                let d = date.split("-");
                let yearGet = d[2].split(" ");
                console.log(yearGet[0] + " " + d[1] + " " + d[0]);
                let convertedDate = new Date(yearGet[0], d[1], d[0]);
                let purchase_month = convertedDate.getMonth();
                armesMunitionsChartDataTemp[purchase_month - 1] += 1;
            });
            this.armesMunitionsChartData.options.high =
                Math.max(...armesMunitionsChartDataTemp) + 1;
            this.armesMunitionsChartData.data.series = [
                armesMunitionsChartDataTemp,
            ];
        },
        async displaypassationVehicule() {
            let passationVehiculeChartDataTemp = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ];
            let forms = await firestore().collection("passationVehicule").get();
            forms.forEach((doc) => {
                let data = doc.data();
                let date = data.dateEnvoi;
                let d = date.split("-");
                let yearGet = d[2].split(" ");
                let convertedDate = new Date(yearGet[0], d[1], d[0]);
                let purchase_month = convertedDate.getMonth();
                passationVehiculeChartDataTemp[purchase_month - 1] += 1;
            });
            this.passationVehiculeChartData.options.high =
                Math.max(...passationVehiculeChartDataTemp) + 1;
            this.passationVehiculeChartData.data.series = [
                passationVehiculeChartDataTemp,
            ];
        },
        initialize() {
            //charts
            this.displayevenementsACT();
            this.displayinspectionsOp();
            this.displaycontroleOp();
            this.displaycompteRendusOp();
            this.displaycontroleVehicule();
            this.displaycontroleVehicule();
            this.displayarmesMunitions();
            this.displaypassationVehicule();

            //load data
            this.loadusers();
            this.loadcompteRendus();
            this.loadevenementsACT();
            this.loadinspectionsOP();
            this.loadcontrolesOP();
            this.loadcontrolesVehi();
            this.loadgestionSecurite();
            this.loadpassationVehicule();
        },
    },
};
</script>
<style>
.buble-background {
    overflow: hidden;
}

.buble-background::before {
    position: absolute;
    left: 80%;
    top: -14%;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    color: #fff;
    opacity: 0.2;
    background: currentColor;
    content: "";
    pointer-events: none;
    transition: 0.2s opacity;
}

.buble-background::after {
    position: absolute;
    left: 72%;
    top: 36%;
    width: 159px;
    height: 160px;
    border-radius: 50%;
    color: #fff;
    opacity: 0.2;
    background: currentColor;
    content: "";
    pointer-events: none;
    transition: 0.2s opacity;
}
</style>
