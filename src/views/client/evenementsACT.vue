<template>

  <base-material-card>
    <template v-slot:heading>
      <v-row>
        <v-col cols="20">
          <div class="display-2 font-weight-light">
            Faire une déclaration d'incident
          </div>

          <div class="subtitle-1 font-weight-light">
            Veuillez remplir tous les champs suivants
          </div>
        </v-col>
        <v-avatar color="indigo" size="100"> <img src="@/assets/logo_salt.png" /></v-avatar>

      </v-row>

    </template>

    <v-card-text>
      <v-container>
        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field outlined prepend-inner-icon="mdi-account-details-outline" v-model="defaultItem.userName"
                    label="Nom et prénoms" :rules="titleRule"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field outlined prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.intitule"
                    label="Intitulé" :rules="titleRule"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field prepend-inner-icon="mdi-cellphone" v-model="defaultItem.tel" label="Téléphone"
                    :rules="titleRule">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.organisme"
                    label="Organisme" :rules="titleRule"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="10">
                  <v-select prepend-inner-icon="mdi-apps" label="Temps" :disabled="loading" v-model="defaultItem.temps"
                    :items="items3" :rules="titleRule"></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.residence"
                    label="Résidence" :rules="titleRule"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <h4>Date de l'incident</h4>
                  <input type="date" v-model="defaultItem.dateIncident" class="datepicker" :rules="titleRule" />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.detailsMateriel"
                    label="Détails de l'appareil" :rules="titleRule">
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-textarea filled prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.meteo"
                    label="Conditions météorologiques" :rules="titleRule">
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-textarea filled prepend-inner-icon="mdi-format-align-justify"
                    v-model="defaultItem.detailsPersonnesImpliques" label="Détails des personnes impliquées"
                    :rules="titleRule">
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field prepend-inner-icon="mdi-format-align-justify" :disabled="loading"
                    v-model="defaultItem.lieuAccidnent" label="Lieu de l'accident" :rules="titleRule">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-textarea filled prepend-inner-icon="mdi-format-align-justify"
                    v-model="defaultItem.descriptionEvenement" label="Description" :rules="titleRule">
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-textarea filled prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.dommagesCauses"
                    label="Effets/dommages causés" :rules="titleRule">
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-textarea filled prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.mesuresPrises"
                    label="Mesures prises" :rules="titleRule"></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <h4>Votre commentaire</h4>
                  <vue-editor v-model="defaultItem.commentaires" label="Commentaires de l'admin">
                  </vue-editor>

                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <input type="file" class="d-none" ref="uploader" accept="image/*" @change="selectFile()" />
                  <v-text-field :disabled="loading" v-model="defaultItem.documentAccompagne"
                    label="FICHIER (IMAGE/PDF) 1" prepend-icon="mdi-image" @click:prepend="$refs.uploader.click()">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <input type="file" class="d-none" ref="uploader1" accept="image/*" @change="selectFile1()" />
                  <v-text-field :disabled="loading" v-model="defaultItem.documentAccompagne1"
                    label="FICHIER (IMAGE/PDF) 2" prepend-icon="mdi-image" @click:prepend="$refs.uploader1.click()">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <input type="file" class="d-none" ref="uploader2" accept="image/*" @change="selectFile2()" />
                  <v-text-field :disabled="loading" v-model="defaultItem.documentAccompagne2"
                    label="FICHIER (IMAGE/PDF) 3" prepend-icon="mdi-image" @click:prepend="$refs.uploader2.click()">
                  </v-text-field>
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="loading" color="blue" text depressed @click="closeAdd">Annuler</v-btn>
      <v-btn :disabled="loading" color="blue" text depressed @click="save">Enregistrer</v-btn>
      <v-spacer></v-spacer>
      <v-progress-circular class="mt-3" v-if="this.loading3 == true" indeterminate color="info"> </v-progress-circular>
    </v-card-actions>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">Fermer</v-btn>
      </template>
    </v-snackbar>
  </base-material-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { firestore } from "firebase";
import { storage } from "firebase";
import jsPDF from "jspdf";
import { VueEditor } from "vue2-editor";
const smtp = require('../../../services/smtp.js')

export default {
  components: { VueEditor },
  data() {
    return {
      done: false,
      menu1: false,
      modal: false,
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      snack: false,
      snackColor: "",
      snackText: "",
      search: "",
      loading: true,
      loading1: false,
      loading2: false,
      loading3: false,
      dialog: false,
      dialogAdd: false,
      dialogView: false,
      dialogMail: false,
      email: "",
      formId: "",

      titleRule: [(v) => !!v || "Champ obligatoire"],
      items2:
        localStorage.getItem("role") == "Superviseur (Chef Service)"
          ? ["Validé", "Non validé", "En cours"]
          : ["Ouvert", "Ouvert", "Approuvé", "Refusé", "Réglé", "Non réglé(pièces en commande)", "Non réglé (matériel à changer)", "Non réglé (pas de contrat)", "En cours"],
      items3:
        ["Jour", "Nuit"]
      ,
      editedIndex: -1,
      defaultItem: {
        detailStatut: "",
        idForm: "",
        commentaires: "",
        roleCommentateur: "",
        commentedBy: "",
        tel: "",
        organisme: "",
        dateIncident: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        residence: "",
        temps: "",
        intitule: "",
        meteo: "",
        detailsMateriel: "",
        detailsPersonnesImpliques: "",
        lieuAccidnent: "",
        descriptionEvenement: "",
        dommagesCauses: "",
        mesuresPrises: "",
        customFieldsData: "",
        documentAccompagne: "",
        documentAccompagne1: "",
        documentAccompagne2: "",
        userName: "",
        userId: "",
        status: "En cours",
        dateEnvoi: "",
        commentaireAdmin: "",
      },
      defaultItemInit: {
        detailStatut: "",
        idForm: "",
        commentaires: "",
        roleCommentateur: "",
        commentedBy: "",
        tel: "",
        organisme: "",
        dateIncident: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        residence: "",
        temps: "",
        intitule: "",
        meteo: "",
        detailsMateriel: "",
        detailsPersonnesImpliques: "",
        lieuAccidnent: "",
        descriptionEvenement: "",
        dommagesCauses: "",
        mesuresPrises: "",
        customFieldsData: "",
        documentAccompagne: "",
        documentAccompagne1: "",
        documentAccompagne2: "",
        userName: "",
        userId: "",
        status: "En cours",
        dateEnvoi: "",
        commentaireAdmin: "",
      },
    };
  },
  computed: {

    ...mapGetters({
      evenementsACTClient: "evenementsACTClient/getevenementsACT",
    }),
    formTitle() {
      return "Détails du formulaire";
    },
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
    async deleteItem(item) {
      this.loading = true;
      if (confirm("Etes vous sûr(e) de vouloir supprimer ce formulaire?")) {
        this.loading = true;
        try {
          await this.removeevenementsACT(item);
          this.loading = false;
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Formulaire supprimé avec succès.";
        } catch (e) {
          this.loading = false;
          this.snack = true;
          this.snackColor = "error";
          this.snackText = "Formulaire non supprimé";
          console.error(e);
        }
      } else {
        this.loading = false;
      }
    },

    selectFile() {
      let file = this.$refs.uploader.files[0];
      if (file != null && file.name) {
        this.loading = true;
        let ref = storage()
          .ref()
          .child("photos_forms/" + file.name);
        let vm = this;
        ref.put(file).then((snapshot) => {
          this.loading = false;
          if (snapshot.state === "success") {
            snapshot.ref.getDownloadURL().then(function (downloadURL) {
              vm.defaultItem.documentAccompagne = downloadURL;
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
    selectFile1() {
      let file = this.$refs.uploader.files[0];
      if (file != null && file.name) {
        this.loading = true;
        let ref = storage()
          .ref()
          .child("photos_forms/" + file.name);
        let vm = this;
        ref.put(file).then((snapshot) => {
          this.loading = false;
          if (snapshot.state === "success") {
            snapshot.ref.getDownloadURL().then(function (downloadURL) {
              vm.defaultItem.documentAccompagne1 = downloadURL;
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
    selectFile2() {
      let file = this.$refs.uploader.files[0];
      if (file != null && file.name) {
        this.loading = true;
        let ref = storage()
          .ref()
          .child("photos_forms/" + file.name);
        let vm = this;
        ref.put(file).then((snapshot) => {
          this.loading = false;
          if (snapshot.state === "success") {
            snapshot.ref.getDownloadURL().then(function (downloadURL) {
              vm.defaultItem.documentAccompagne2 = downloadURL;
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

    async exportFormToPDF(idForm) {
      this.loading = true;
      var m = new Date();
      var dateString =
        ("0" + m.getUTCDate()).slice(-2) + "-" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
        m.getUTCFullYear() + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2);
      const snapshot = await firestore().collection("evenementsACTClient").where("idForm", "==", idForm).get();
      const documents = snapshot.docs.map((doc) => doc.data());
      const doc = new jsPDF();
      let pageHeight = doc.internal.pageSize.height;
      doc.addImage("data:image/png;base64,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",
        'JPEG', 20, 0, 25, 25)
      doc.setFontSize(16);
      doc.setFont("helvetica");
      doc.setTextColor(255, 0, 0);
      doc.text("Evènements ACT (Code: " + idForm + ")", 105, 15, null, null, "center");
      doc.setTextColor(0, 2, 3);
      doc.text("Statut: " + documents[0]["status"], 10, 35, { align: "left", });
      doc.text("Intitulé: " + documents[0]["intitule"], 10, 45, { align: "left", });
      doc.text("Nom et prénoms: " + documents[0]["userName"], 10, 55, { align: "left", });
      doc.text("Téléphone: " + documents[0]["tel"], 10, 65, { align: "left", });
      doc.text("Organisme: " + documents[0]["organisme"], 10, 75, { align: "left", });
      doc.text("Temps: " + documents[0]["temps"], 10, 85, { align: "left", });
      doc.text("Résidence: " + documents[0]["residence"], 10, 95, { align: "left", });
      doc.text("Date de l'incident: " + documents[0]["dateIncident"], 10, 105, { align: "left", });
      doc.text("Détails de l'appareil: " + documents[0]["detailsMateriel"], 10, 115, { align: "left", });
      doc.text("Conditions météorologiques: " + documents[0]["meteo"], 10, 125, { align: "left", });
      doc.text("Détails des personnes impliquées: " + documents[0]["detailsPersonnesImpliques"], 10, 135, { align: "left", });
      doc.text("Lieu de l'accident: " + documents[0]["lieuAccidnent"], 10, 145, { align: "left", });
      doc.text("Description: " + documents[0]["descriptionEvenement"], 10, 155, { align: "left", });
      doc.text("Effets/dommages causés: " + documents[0]["dommagesCauses"], 10, 165, { align: "left", });
      doc.text("Mesures prises: " + documents[0]["mesuresPrises"], 10, 175, { align: "left", });
      doc.text("Commentaire de l'agent: " + documents[0]["commentaires"], 10, 185, { align: "left", });
      doc.setTextColor(51, 10, 199);
      doc.text("Ce document a été généré par le système GES-UPRA au " + dateString, 105, pageHeight - 20, { align: "center", });
      doc.save("UPRA FORM (" + idForm + ").pdf");
      this.loading = false;
    },

    async printForm(idForm) {
      this.loading = true;
      var m = new Date();
      var dateString =
        ("0" + m.getUTCDate()).slice(-2) + "-" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
        m.getUTCFullYear() + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2);
      const snapshot = await firestore().collection("evenementsACTClient").where("idForm", "==", idForm).get();
      const documents = snapshot.docs.map((doc) => doc.data());
      const doc = new jsPDF();
      let pageHeight = doc.internal.pageSize.height;
      doc.addImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAC5CAMAAABa+IDIAAABIFBMVEX////3/PYAjzb8/vv1/fUCkDn5+/b39AD///34/PX3/PgAkTbXIxYAjjoAfL35+/j68wAAer3u9/ICjDsKlEAhisAAe7Y1pmEMf73M5+ux3MGy2OOGwNrh8ebO6djV7Nwem08Ae8OVyNs0lcYZmkvX6+rj8vGBx5274Mkpj8Sm0eFBrGt5w5Z9vNM8mcmDxSZXqM9Enca+3hlmvIkPljRwviZatn6d1LJKrXFtstKVzR7a6QiSz6pgqsYinjJCqy5Wsyut1hbV5wzepZ/UJh349DveHRQtdTHRNSjoycGgO0HeVUrZRDnbhnowZpdySWHs29TadGpRXoJdhTD1zQw1lJVutcjNU0LhixMAi16gzkzQ5kPbZVdEh7VlrGwAgYkp1n3kAAAbJklEQVR4nO1dC3vaOLNGluxa8tpeCwzmYjDBBBIIJSUl0NL0tvud7r273/Wc71z+/784M7IhkIQExzTZp08mbRJIYvRac3lnNBKFwp9IzMcewH7ENL8OIE84/lxifh1AzCccfyr5mnA89hj2IV8Rjscewn7kK4HxJE/yJE/yJE/yJE/ysEIpRT4IpBC+eezBZBNmuIQxQgwhqGBhs7ZY9Hq9xXmtGboUhRGDMEM89jjvFByoIVvN8+EsKtkaiG2BaDZIXJn2as2WpNQgjz3Ou4QWaL83rcSWpum2peuagqDDQ03XbcCklaLBZNF87HFuFcYEB4Wh/Wlc0nEeEIEGSKx0PgAGfIVn4Ae6XoqHLdMlhJE/m44ZhivC/qSk7j3CUOOOo6gym0565yiLxXAyG1SiuITQNDvqNaUQ7LFHfkVooT+pwG0HZdJ0+LC1ymRx3gd7gB+a6LzwAzyYRPsfzmLEog16rcce+KWAC2LCqFVQo2xdobCiSU1KsiWFxSelbC0GNuheadoSRIg/g+0zl4W1ip2qlK7H0bBZMF3h3vZHJiG0IM8HccnWp6Bht/7yAwmVi4qNRoE2bg96fWK6rkHusmJeIMI0W+cTgDKrPW6wJBy8Dq1FGC3Qfq3ipCWzKokMF7GmzUJwYe5jeTBGXKM11c/QvnVLj4eS3qFRN19ELCJLX8jHsxSDhr0S6hNqVWURmoKAZL0KkBmT1AZ2dE4fZUbACGgTtEpXISOuSUFzXE3IfsWeScofHgsTsmdBnAbr0EsTQt1ceiGYy3tx3CcPHx/N5gxUykIc02YBqG4+BaeCmK2JNpR55jW7wKvWYsVELDvqy3tdQn0SQPmXTBgCSz+qtAyY3QebF0P2EkJraVOZgy4xLqtdZqweEz6Nm8RlfB+D3EXkRFcRUI/OTXGvl6XJHxF52l3zukS4i2jhsofRL0OEAzRzYOizljDu/oNrAoyfwD8I7+aJL8nGjaCtwRCcOLvPdTMKCytakltM7hmLAQRRBJ7I4OgKEGbIwVCQBzATs1WBuQDriBdm9vCnhArelRgy6NzrXAECEMlkIr94lCeiGSGv0q24f+/gBYoz7zLGSNdvdyS7cvOJS86n0iDsi2IRIVBdjB5R6N7bJDmtB11CuGw4AIRcu45rLIZ30uecElaQ5up6JczBjAjz/SpEEBk4ztHhNUMTxKCLofyCZkJcCfaBVLcS3huG4NxsOEGVE3PueI7fvcnQqFvrZc4Idhcip4gDUtkctmgIcdhxfAAiPSfw/OqNjlaI7KnN7kIhnqOdw3zkeBHBjwOYEcEb5WDeDuri5sn9YukJF+Y52jnMR0sUchgIYSOv3K4T2fFGXc873ubDc9LQ7QMQzZLSK6uVi0EwXvectncg4MsBDcon8oGpu5ADHSuHpT7NRR8I7zgj35uTuRNIcwwR8cEoIoiAfHQI7kovWr170atLoTAT9bHTEb4zNvFB9yGBEEL7qqRrzfK+LB07R926U663nSpnPHDmD1kLYiKMVeUqknkDbtcvjzkDv1U+YkBDIJbIB0RCyETDqk/czOcUCTfrgVcnfOy0nRNOBKsG3onJH4C0J2I0S6o4vTALuXyMAVPQDrjgAMerC4NSeQrB/eFq8mSGKzdWRd6fKSbX4bLjjCG6wxcfklyTGnWwkgeqAhFinqvKj97K+4KMHTpenQMrPG2PkMCbnL+BuaHkIVwXc2Ws41LTgvKc2TQjx57DOIGw3h5Tlc8K5jte1RAPgIS5Q7UGVZG5X00UICcEHAJSqkYChJFqAA6ZPwAQEUZo6aXze1R2rwgzjxxwvgSclXNMVe5EuDjwyqdMumuWgv6ME67WuXO+5JqQBS4c2JU9kDhhBk6DGESAiVeX4yZ87pVHlK/NNyOcG9ygpnE1Ec4jMlLLUffP0S+Fccc55oKQuuN1l3EQkt5x2zmVZLUkQWX1eD7yfX/UqO6tiCrMBS7jWLN90GohHadOBBHHyBiXzxIhx453Kg21dGTQ6nwESbDn4H/v9JjzfZS5DOHChJxpdsvdg7a6IXhfmBAA4qyXjDk7dTxfokbx6giCZdvxx/P5HDIXJxhzvof83aAYQyxrKvdhdkbYVkBQtdaBEEbHngqRVdAyLzg9ltiIY1LZ8D3Quj2UhpjEoK6VaqKwB2VlzEMbEaLuON216wlQn7nndeonMBt+owrsizDwWwY3D8eBM95D/i5aMZKTaD8UlaHXAmMXwBXrmzeGkAPPCRyv3JCMq0U8tCX4xMbgIPIDcc/V8kFvP1SbFjreGNeuqz7EkY0fge86Djyn04X4IcjyA35V8iMwn9wvTQY6ZoZ7qs0Ic+z4EAjJ4ZEzv7JiCACAEyMQtj4hYP9dz5sX8ppoaIPz1Sb58vSVEAONQ8AAR86pca1rC+sSRxx4F1F9HfDB0FIYmE9uDtNTjUnNPS0dA1sMvLlJBJ0Hfte4MjbKDXDLp0gq0wkBSLIrJRCak1y9ahCHInS+FZmbZaUXZHLsBVIwo+4F9WvaQtB3OSdyNSFYBCuPGTl1OrmUm5JQLekM8wx+QwQ/LoPfYpyD3t8UHeTIc6rGckKIUW0HHuMHTlDNA0QYC1U7qeW4xoYYgnU77VEoOB0DSbmu9pBCBmUf5iN1W5yeeifCkJ7XyAOEUKw56FHLEHTF4QUBcnrPq1KD0IbjHcMFug4S+WvX4bTuYTkinRLGTckNVoA8LA9LMcIB5uoDTAw56gOkEhR5ncEoveeFOR/BXDDJT50AE45rvwBW5B+yZSQB9wvzwueOn8drGa0I212HUoZrIkEIce/ZLEYgbXc6cEvgzjeoedUbmiapB+WGuzQSmBSDSXmFZO70QuApCoKaBRo2+9j9Y2tRVMJeS8tWLXKluFKZTXqLWjNkQOwg6ca2rQxASMNz5oQfdpzOIb8yI9iyzTptoImJzwIFqB7MR50jxzksZCPzarle1npT7AdNmkZ11chka2m3H/bLaZZdKkWVWa9PCtj3mmkLnhyVPfC9B23v+MpKIeKgYEW4xKhwGPWRD5weKJg34ltWUrYIEefTyMYoiGvQSeexrl0VPWl9wO7kSq+ZMcww6XtBlXPfOdp0XAoHOC7wAy4C4d0Rknp/dBpApjW/On13vIpQ67ZqFnAdAfvKsA1ZTwQrp/DD5ElbTY6mxdNFP4RRCHRnd983iA4KSb3snECUX2FROMC6TeAv4FoEO0AWOa/ij+rjIKhjrrgzEFdUknuu+hSxjcm+lGIRP9nKYFRjbNIiBKDiaLYIC4BF3G0vnGN90a9ySHCrYMsbOAAIbXg+TTKU4OAwWYPjEjLHQ5ahSkxpRU+HVwQTPzu7ePvu5fNX718k8v7V8+fv3p6daar7IdU51TiOi3LDJji0O2cEJk4cgMZIYLvArJa/n8wHiFt1HCYg+21DzgiunyENA/54MOIZdJiDatlF/ewtjP/V+w/Pvt2Q1cPXH94DoLeQzIOd4JK1WrfW7HjWq7WkiX4VIg69cXaIwLgIc+KDDdeX1BEnRPF2Ig5hpuQp5rgwL1T5EQDP6WE3A3XkpHLx7tWLD6+fqUE/U/It/ls+wB8kgJ69/vDi+buSVVRWpSXtphr458l5iBRAufIbBeh5I2g7Y9/rSGM1IQkORZGP521vLK8oUqZN1pJ9n4w/+fRsm3yb/AZi+vD8Qk+1TFkWapkdTWoh8vGb6wZg4lUfmDykJwd8hUMoJELII6fjlEf59jIw8v3GaJMZWFOqbzd/lvz4wyswnCLuFAG70tIdIwDm48fPnyUMkeHdxkCbDg3cz9jz6iZwR0/is6lipTPS8TxcJc1VBSLi+/RGpwgSFfqAhg7/P4DOrezlEg1azYtX7y6Kto5gEh9gW//xl+8+/fzT7x9/CEHT4YZjLVclhoQeOE7DhHkJPCwGXyqWmpGOh04tBwqcEfH95fhevHr+7iLWzrSirhWT2KEVtRI4sufvX6/PSmJEz56BlqFyqc0XCsg3qXz3z18+fpZIahkGGqMLEQLScSFHMOQlkLTcwEG1gmOesyhHCMzI6xfgky4wcBeLSltQ99Gci8k3+HxRuwA4L9QErWvZ6/cv316gdoFXBiDffbOSv3zz6Z+///Lx4w8/fP48bkN8I1wAr4VUgy81S02KcQJkzLzWK0mznUTA+H+9e3tR0oqoJeBZbS3d3bJJUbCTHAK7fnHx9uX7Z6mirVyAUjO4xOWMrKEBcJ9+BI1imAhSDI2SKFNPZ8Q8Bsd7Ta9oIWPjE7hfsFbdOtOXNDFRlRTL6pNCZ6sNYJb29tXrb5+tsCwn6P3Lv25g+CXVMvj/q+N1mcux2BOUnTpfmxAs3vndaxGchotsKRAEROTsul1UYQ53ecGdR4eEBa4iEhTdVlvYEJAiXbaOevbyxYdEy5b2Ag/+to7ju88/L7/90StDFqjqV+bYccbm0kTgn4SMq06vzgih/WHGPZluBS1COVG7qCFDeff81av3S3n16uXLRPeQfFnIK1UJD7GAlr1OPHWCZRPIT+HHJaRfgfeyxCB4HfhtGkVwDyYFoznh7jUDobWemYn9EpgRte3u4q0y5TWXtKE4r188f3mhJWASDgzmbZesi+cfLknABpBf+Of0u9880KbURTERQCihS+HHDvrjaxSamIuFmSmxYqwCk/DqQ0pQVma8QrE0BPVzMOq3FxZqm9I31MaiFgPFea1+cQnk559AfnD57/Dl528+/eqNJHETi+BkBLCoOjuIKAMB0sKupR7MHGbcYML4v19/e2X4G7xk9cwyLgJ9fKuBSQGYNJ20ixBqXsLNWAH5iPHQEECWPv/3N79h4mSkUZwYoEsH1AAcgvGur9odb1CUwrSWzdhVZF8PDRsYtvKv9+809MapV1MuwLJKf12630+/y6Q0/cMncFlexzSMlJBw98CDGK+0hkvfcerGTd0DolBpZlug4RDZ12iu+va1kg/qA2TTWFbh4wUEQnRmlq1yLfTha3HkJ1Wq+gWe+KMNFpLURBWpxHIKAFEcyykfUHFTRwcxS2E2DikUkGXOARQFso63by8uzkpnmlY6u4AIiKkKOoLlvK2opdKyUtHG/BHj/zqQTwwN+3dwvYEzZ2QVxoUBbuvAVHswRp53soX4s9Cm2QpQMCM4QBjRxVl6Y4vFNN9VGa6luK11BsmjCupXFfDZC/RmSH91DUjjymcJ8VGKH8DSsSB9WbYCINiMAok86FV7zrd0pdBalLEjlPB/Q66kGIqlNkFjgpGkf6r6YCefIcxYSfB4B2nkJntUfAvmULPXZuTz59+/+fSD+O4PCHeu0qwlaQdGUoV8FvLeYG6SLVyR92aFbHVaiCNFZbaatiycaKs90apIhMWV9GeWKkiU0F0vg/rKnX148Qopyneffvvttx8//fTxZ2BZ3338H+CIZjoXCgfjc8/hVM4DJ2hsL/jQ2SQTDEysKklNMXVBaTVFWz5jW8nXZd1B0WHbOrt49+Lb687ub//616+4+F/2//jxxx9/+6PsgfYsC7uJjfCONzLr4K6COtvenyejWsZVZY7lIGUcy/GWosF0Mhn2UIaTybQSRVFcSs5BSCcNSQ2o2btX4NKuZJCv/+60veSf58H/U8mNNIFSxUR+6HjzcdkJRhJp/bZhNUthNhyoWmgXdowF3qHaQb/80YqzUdnq1xbD6SBW3gk/1KEIoGVYuNgIQ6//7gXjRmM+Pu10OqN5XeIaoVpcgy8cOMm8jd0ao4Pbm6hqcdaVDABiVybnrTCUgjRjGGdxs7OUmi4uURrgZmTYPJ/GtpUSR+0MeyR08GbPP1yqGQCBsMGwhn8osdxNeUqrktYZr+y0/bok12nJugwHWZdjKW8CkxBAhUCXwwpaem3jGuBgBAGCASQDdARIUrgY4EEP4J0xgmAWA7S/BPafMM7/9bwDhpwKojiMfRx4HvDdIIDPoHD4becYe5zcW/s0KsPsyxh0pUQGmaGPmtyZB4T93ixSFdSk6o35CnozLPE999pjtAsM4tVTr132sCLtgMV4TuCP5sfVa8nHVSFGaNdyVVSMHgKp3AUEBwlqNozSorby2Jjf23Z8EQeBf4hNAIxXAUHnoNrtdqv1+nG9Wu1K7Ai6ad1q8/qiFzfznEJARB9dUrw8xmTLeYouMQz8R83wfBbj2hCmJsi4UM3sctJsJgyg6EHDBBMHPXOBUhmu2nEo7tySTwpRJdemBi4MPC7DOl/CuLNmaRZkfzGplPSkXq+KW//pOL7kzOj6YNT3Wvd3m9rEzFPmcllhgsqijGS3Y1OJ4RosbPWHFTsJpMBmyk55XiBs7gTHt7umbWJOtFpGynhFDNpEWhLLFMcOQBjDZUIuXAJg0JtZOCUQtcFAOnQbJ7xdwqhE8radG2jAdo2S7OfY4lok6NmsUvo/UK4T3/GO76UeplGzpvf5ww0RPSwtVGBu7nFyqmG41JWgaL6HfZbB/XosBZnZ+U9NIk3FDVviHjgoeFwkAVwc+tgzegu5vU1YqFV2T0W2jZNIXFK0JjTPSbbMleOg3blfSzopzLTerpa+3QAY7WEoiVp5egGB5srqQfd+LSxGX4+bO1r6LR7JJWEJ61WLewxhJdilSFTv0j3+WMys2a5/aNLtmmMWpshpK19+i/lNAregX9J3DiK34GDUDVUF8fxL7dS8VZjLZna083liW4EAn6fEnWCqHuc7wuWeIty+bdVurHTdJNtxqAxI7RSzhg979koiQkZ6JUO3w204TC6nSP/ixzjKj050vZYliNz8rMIB2tVX/U6TR9AteOVBBgJ/Mw6a4EDONFXrH7fspoSknFFDsEuWDswRve7qocpIkoemUIs8Qnllsv2ihMiBDbw3X/P0CkeBFVwZ42pOxLZOckJq+frITSyRiMuH9HLzEVPMjapP5tU25kth5tDSBzd0cGaBcYmjIODWnKvy4tbkndLq/PT0zYG8LHjKRqNxfEmu8OHhckjMrTdW0t0aI4yabmvAa3IQ+HUcKDDHai97Tdx0/5jojrAe4rXLyy0IgtfLba98mX1gul5NW69Bm+ae57STAkT9Zm/IXNKKNGuRK59amvnaVftYvTqrhDelqmo9IBiPR47XoCkOMcdKycHqEgpIuhUeTOkkCLCWEgR+UL9ZXw0mZppWydVJfg0H7mcfopXY05ssj1W9clBlTFZHKRDVQwp3fLQOBLvlkt/nBMt1MIsNKbdtOyJgILbWz7NN7DoOFFFRRZ7eDRUPfgw3vw72wXi4HCoMPPBx4T81k2rQ9qobfypHkKFsyXzBKtyFbWnDwv07nZQ7uSHUiyaecWYVz8k1rRVdsJDgFOu6ac8hJyeOMx+3gwOWMBszUa11c7gNCCSktZKlz4xMu7U3xrx0i9d+i7kLVUGMW9fO/wMbcbwymK5/nC68cu577W6j7I1l6rIVEGNXIIK1SroWtViWLGhj0ObW1AQMFc+p0ez42nEihHVPA8xlnaXXItW24+Pg/cPEwIWyEeXyIBAatwIx1BY1y9LOM2WUG8O+reZjuHKAnEsd8LIhzOC8ejzvgL8dpR3sY8c5OpkHbaeeNmMkqpXatXkNyPq9oYLiKoDVo9caOW6FsdYJelvJBwZPkm3UWnSl3552wdDBE80dryMpcIKCBAhg3WXPG5sE6ZqpZkQNm6UWeAkExsDWVjoNPCnD1iau2L2HfPMc9LsqV4z04zO0k0roCuMy3vLGUfWQSQBSHokT32+YeDqQDwKmI+nI96tMea3D7uGh5PA8to/KUdlpQNh2674/NpdzgrssMG2wBlkiSGrZKxR3mBZ3aS1pjI2aVFyeNsAbXrkzHp/CTT8ozNvOnGLrUihl6DvtgwJ2M+Due8c/6hx15hSs6dBIZwTP1Tsue53L1yDuOR4NHoUZpyP1UDsVRA1G3Jpq0LAQyUqx+QGMrVyGTwfE/AcAkUeOdyzBcuZe+6jgAw0BY2+3PWQxYwDiITNPgRDj2Gl3VvGC0IWq2gCF2HVG1gOGoqG7uDpwwiW1/KHVxKqll/HufHQEN7vLOD8ej+vdN2/mXSwRdsdv5vIfb8ZV3v3H+I2SA/5mPMZNCuwEfhP7OqrjNydJQQCX8zCv1qMMBy2tB4wtMfAmEeYiaSTQe8RNtQss3VRzikd68oLJXbggHsMI6scpGrf6Lpl1ynHXDsE1PhNXSrBnKDVTSszWQHmT5u4BfSPwZcABM94vJd0Ds2XHN6RTHASXFAl+hk8cYwUYADOwMs9w1w8XwhXUJQI7GbH1F9d2edoAkU4AmIdu2eDfM+jV+tjVg11vgTBqsVXEhcK4KYlr5Du75lKICCe4AceuhDv7q6s8JNOKgWBmP9KS/r9h7jORVkJprYJNFvZs94PhrvGpTJV2oIEiHKRNAlH/5p0V2UVOS7p+putDufOpJYmLylOUZkLOLNUwZBWH4R1L/XeIwHMZhazFOrZOxYss05H7TRQharmLOD1lPVrIPPUBARyG1gZ4LUgIa3TXA9X2gQO4CjjaZpS8lwXE+QXNo2Bmv1JSB7Zbk9Dd9VzZfcBIRYhJ0o+GhLgm8VBoChR59783wNpcIpsDtSFAt0rndOd3itkjDsyqa5Wz9ERpu7Jomdn6cglzhYnvFZH2sk1b5s7n9O0TBlYkXLkoYdcZtgpq8ayf7dq00J9GqFHYWBj11QLMTrdir9ORCDjiGZJI1U8Ho+lJiW0ZVLCtRUmh3giGEBkuolULXtzLcDbF/mEgy3PN2izdhKFUbNCrAeGjxtadjxTPaGrVegN1KoaCEk9adPf1sN1hZJg5FxtiZH+mmk5VL51ul6LKpBYi77kBBVw1PJ9UIrXikrzrSnHYBLvfuX6169jMlex44QLOS3NWSrbDJptegTDFg+F5SyZCsB6H/5u14aBk28lvpSdrT7KxnN1hpEXfLDpIhWs2JxU1Pn3ZWKslO3grs0TwXYbUluulHuIvxINFaGZa0tsNxxJGVgJDDODoFN80ybb0dNO42iC3HHOqdEnjI8ZQdA/qbZNckmnxfUcY9F4w1sQAw8cQjdqjLZuFN7eYqV29ACmeNK+XLPch952NDWG0IGuTQaQ06wYg6kk9jma9PgVfYH6BAzP3MB0FVcuBJFC2+ufDQWxfWsxyfmw7mg5rzZCYkFMaO4a/LLKX6dgUInmz1lNvJRbhG4wNpsNFLWSFfRw3tl32DgOFCeMyBU1e5Iu/L9ISx94uKArAhJO9LrjDAlch1RsRfekF7v1PxyPJVwLj6Y3en+RJnuRJ9iL7T80fR75EkeEx5AsUfR5FnnD8ueQrgfF14bjH3/0/lk5u9D4FEIEAAAAASUVORK5CYII=",
        'JPEG', 20, 0, 25, 25)
      doc.setFontSize(16);
      doc.setFont("helvetica");
      doc.setTextColor(255, 0, 0);
      doc.text("Evènements ACT (Code: " + idForm + ")", 105, 15, null, null, "center");
      doc.setTextColor(0, 2, 3);
      doc.text("Statut: " + documents[0]["status"], 10, 35, { align: "left", });
      doc.text("Intitulé: " + documents[0]["intitule"], 10, 45, { align: "left", });
      doc.text("Nom et prénoms: " + documents[0]["userName"], 10, 55, { align: "left", });
      doc.text("Téléphone: " + documents[0]["tel"], 10, 65, { align: "left", });
      doc.text("Organisme: " + documents[0]["organisme"], 10, 75, { align: "left", });
      doc.text("Temps: " + documents[0]["temps"], 10, 85, { align: "left", });
      doc.text("Résidence: " + documents[0]["residence"], 10, 95, { align: "left", });
      doc.text("Date de l'incident: " + documents[0]["dateIncident"], 10, 105, { align: "left", });
      doc.text("Détails de l'appareil: " + documents[0]["detailsMateriel"], 10, 115, { align: "left", });
      doc.text("Conditions météorologiques: " + documents[0]["meteo"], 10, 125, { align: "left", });
      doc.text("Détails des personnes impliquées: " + documents[0]["detailsPersonnesImpliques"], 10, 135, { align: "left", });
      doc.text("Lieu de l'accident: " + documents[0]["lieuAccidnent"], 10, 145, { align: "left", });
      doc.text("Description: " + documents[0]["descriptionEvenement"], 10, 155, { align: "left", });
      doc.text("Effets/dommages causés: " + documents[0]["dommagesCauses"], 10, 165, { align: "left", });
      doc.text("Mesures prises: " + documents[0]["mesuresPrises"], 10, 175, { align: "left", });
      doc.text("Commentaire de l'agent: " + documents[0]["commentaires"], 10, 185, { align: "left", });
      doc.setTextColor(51, 10, 199);
      doc.setTextColor(51, 10, 199);
      doc.text("Ce document a été généré par le système GES-UPRA au " + dateString, 105, pageHeight - 20, { align: "center", });
      doc.autoPrint({ variant: 'non-conform' });
      doc.output('dataurlnewwindow');
      this.loading = false;
    },


    openLink(link) {
      window.open(link, "_blank");
    },
    ...mapActions({
      loadevenementsACT: "evenementsACTClient/loadevenementsACT",
    }),
    ...mapActions({
      addevenementsACT: "evenementsACTClient/addevenementsACT",
      updateevenementsACT: "evenementsACTClient/updateevenementsACT",
      removeevenementsACT: "evenementsACTClient/removeevenementsACT",
    }),
    getevenementsACTById: function (id) {
      let evenementsACTClient = this.evenementsACTClient.filter((c) => c.id == id)[0];
      if (evenementsACTClient === undefined) {
        console.log("undefined qarşim");
        return { nom: "Unknown" };
      }
      return evenementsACTClient;
    },

    async initialize() {
      this.loading = true;
      try {
        await this.loadevenementsACT();
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.evenementsACTClient.indexOf(item);
      this.editedItem = Object.assign({}, item);

      this.dialog = true;
    },

    addItem() {
      this.editedIndex = -1;
      this.dialogAdd = true;
    },

    viewItem(item) {
      this.editedIndex = this.evenementsACTClient.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogView = true;
    },



    closeAdd() {
      this.$nextTick(() => {
        this.defaultItem = Object.assign({}, this.defaultItemInit);
        this.editedIndex = -1;
      });
    },

    //mail sending//
    viewMail(item) {
      this.editedIndex = this.evenementsACTClient.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.formId = this.editedItem.idForm;
      this.dialogMail = true;
    },
    closeMail() {
      this.dialogMail = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async sendMail() {
      if (!this.$refs.dialogForm.validate()) return;
      this.loading = true;
      var m = new Date();
      var dateString =
        ("0" + m.getUTCDate()).slice(-2) + "-" +
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
        m.getUTCFullYear() + " " +
        ("0" + m.getUTCHours()).slice(-2) + ":" +
        ("0" + m.getUTCMinutes()).slice(-2);
      const snapshot = await firestore().collection("evenementsACTClient").where("idForm", "==", this.formId).get();
      const documents = snapshot.docs.map((doc) => doc.data());
      const doc = new jsPDF();
      let pageHeight = doc.internal.pageSize.height;
      doc.addImage("data:image/png;base64,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",
        'JPEG', 20, 0, 25, 25)
      doc.setFontSize(16);
      doc.setFont("helvetica");
      doc.setTextColor(255, 0, 0);
      doc.text("Evènements ACT (Code: " + this.formId + ")", 105, 15, null, null, "center");
      doc.setTextColor(0, 2, 3);
      doc.text("Statut: " + documents[0]["status"], 10, 35, { align: "left", });
      doc.text("Intitulé: " + documents[0]["intitule"], 10, 45, { align: "left", });
      doc.text("Nom et prénoms: " + documents[0]["userName"], 10, 55, { align: "left", });
      doc.text("Téléphone: " + documents[0]["tel"], 10, 65, { align: "left", });
      doc.text("Organisme: " + documents[0]["organisme"], 10, 75, { align: "left", });
      doc.text("Temps: " + documents[0]["temps"], 10, 85, { align: "left", });
      doc.text("Résidence: " + documents[0]["residence"], 10, 95, { align: "left", });
      doc.text("Date de l'incident: " + documents[0]["dateIncident"], 10, 105, { align: "left", });
      doc.text("Détails de l'appareil: " + documents[0]["detailsMateriel"], 10, 115, { align: "left", });
      doc.text("Conditions météorologiques: " + documents[0]["meteo"], 10, 125, { align: "left", });
      doc.text("Détails des personnes impliquées: " + documents[0]["detailsPersonnesImpliques"], 10, 135, { align: "left", });
      doc.text("Lieu de l'accident: " + documents[0]["lieuAccidnent"], 10, 145, { align: "left", });
      doc.text("Description: " + documents[0]["descriptionEvenement"], 10, 155, { align: "left", });
      doc.text("Effets/dommages causés: " + documents[0]["dommagesCauses"], 10, 165, { align: "left", });
      doc.text("Mesures prises: " + documents[0]["mesuresPrises"], 10, 175, { align: "left", });
      doc.text("Commentaire de l'agent: " + documents[0]["commentaires"], 10, 185, { align: "left", });
      doc.setTextColor(51, 10, 199);
      doc.setTextColor(51, 10, 199);
      doc.text("Ce document a été généré par le système GES-UPRA au " + dateString, 105, pageHeight - 20, { align: "center", });
      var pdfBase64 = doc.output('datauristring');
      this.loading = false;
      smtp.Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'noreply@saltupra.com',
        Password: '8F75509E390E0B135B3E63B82E7127CB3457',
        Port: 2525,
        To: this.email,
        From: this.email,
        Subject: 'RECEPTION DU FORMULAIRE ID:' + this.formId + ' DE GES-UPRA',
        Body: 'Bonjour.\n\nVeuillez trouver ci-joint le rapport de l\'évènement ACT ' + this.formId + '.\n\nCordialement,\n\nL\'équipe GES-UPRA.',
        Attachments: [
          {
            name: "UPRA FORM (" + this.formId + ").pdf",
            data: pdfBase64,
            contentType: 'application/pdf'
          }
        ]
      });
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Mail envoyé avec succès.";
      this.dialogMail = false;
    },
    //send mail to user finish//

    closeView() {
      this.dialogView = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },



    async save() {
      this.done = false;
      this.loading3 = true;
      if (!this.$refs.dialogForm.validate()) return;
      this.loading = true;
      try {
        await this.addevenementsACT(this.defaultItem);
        this.loading = false;
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Formulaire ajouté avec succès.'
        this.defaultItem = Object.assign({}, this.defaultItemInit);
        this.done = true;
        this.loading3 = false;
      } catch (e) {
        this.loading = false;
        this.close();
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Le formulaire n\'a pas été ajouté.'
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