<template>
<v-card class="spacing-playground ma-5">
    <v-data-table :options="{ openLink }" :headers="headers" :items="compteRendus" :search="search" class="elevation-4" :loading="loading" loading-text="Chargement...Veuillez patienter">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class="underline">Liste</v-toolbar-title>
                <v-spacer />

                <v-dialog v-model="dialogAdd" max-width="700px">
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Ajouter un compte rendu IBIS ACT
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Intitulé</h4>
                                            <v-text-field outlined prepend-inner-icon="mdi-account-details-outline" v-model="defaultItem.titleCompteRendus" label="Titre du compte rendu" :rules="titleRule">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field outlined prepend-inner-icon="mdi-account-details-outline" v-model="defaultItem.compagnieEtnumVol" label="Compagnie / exploitant et numéro de vol">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.marqueModelAeronef" label="Marque / Modèle de l'aéronef">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.marqueModelMoteur" label="Marque / Modèle du moteur">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.immatriculationAeronef" label="Immatriculation de l'aéronef">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Date de l'incident</h4>
                                            <input type="date" v-model="defaultItem.dateIncident" class="datepicker" />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.descriptionDommages" label="Description des dommages causés">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.effetSurVolText" label="Effets sur le vol">
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items4" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.momentIncident" label="Temps"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items5" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.piste" label="Piste utilisée"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items3" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.incidentSurPlace" label="L'incident a-t-il eu lieu sur place">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-if="defaultItem.incidentSurPlace != 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.lieuIncident" label="Lieu de l'incident"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.agl" label="Hauteur au-dessus du niveau du sol (AGL)"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.ias" label="Vitesse indiquée (IAS), en KT">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items6" v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.phaseVol" label="Phase de vol"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items9" v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.partieHeurte" label="Partie(s) heurtée(s)">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items10" v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.effetVol" label="Effet(s) sur le vol">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items8" v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.etatCiel" label="Etat du ciel et précipitation">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items12" v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.especeAnimaux" label="Espèce d'oiseaux ou d'animaux"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items13" v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.nombreOiseauVu" label="Nombre d'oiseaux/animaux">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items13" v-if="defaultItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.nombreOiseauHeurte" label="Nombre d'oiseaux/animaux heurtés">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.evenement" label="Evenement lié à l'impact de l'animal"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items3" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.pilotePrevenu" label="Pilote prévenu">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items7" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.addresseEmail" label="Adresse email d'autorité à contacter">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items2" prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.status" label="Statut"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            Détails du statut
                                            <vue-editor v-model="defaultItem.detailStatut" label="Détails du statut"> </vue-editor>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.commentaire1" label="Autres renseignements pertinents"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.commentaire2" label="Adresse de l'état">
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="defaultItem.commentaire3" label="Evènements liés à l'impact d'animal"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Votre commentaire</h4>
                                            <!-- <v-textarea prepend-inner-icon="mdi-format-align-justify" 
                               v-model="defaultItem.commentaireAdmin" label="Commentaires de l'admin">
                            </v-textarea> -->
                                            <vue-editor v-model="editedItem.commentaireAdmin" label="Commentaires de l'admin">
                                            </vue-editor>

                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12">
                                            <input type="file" multiple class="d-none" ref="uploader" accept="image/*" @change="uploadTaskImages()" />
                                            <v-btn :disabled="loading" color="primary" v-model="imagePret" @click="$refs.uploader.click()">
                                                <v-icon dark>
                                                    mdi-image-multiple
                                                </v-icon> <b>Ajouter des images</b>
                                            </v-btn>
                                        </v-col>

                                    </v-row>

                                    <v-row>
                                        <v-col cols="12">
                                            <input type="file" multiple class="d-none" ref="uploader1" accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf" @change="uploadTaskDocuments()" />
                                            <v-btn :disabled="loading" color="red" v-model="documentPret" @click="$refs.uploader1.click()">
                                                <v-icon dark>
                                                    mdi-file-arrow-up-down
                                                </v-icon> <b>Ajouter des documents</b>
                                            </v-btn>

                                        </v-col>

                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="save">Enregistrer</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="closeAdd">Quitter</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </base-material-card>
                </v-dialog>

                <v-dialog v-model="dialog" max-width="700px">
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                {{ formTitle }}
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-select prepend-inner-icon="mdi-apps" label="Status" :disabled="loading" v-model="editedItem.status" :items="items2"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <h4>Votre commentaire</h4>
                                    <vue-editor v-model="editedItem.commentaireAdmin" label="Commentaires de l'admin"></vue-editor>

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

                <v-dialog v-model="dialogView" max-width="700px">
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Détails d'un compte rendu IBIS ACT
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field outlined prepend-inner-icon="mdi-account-details-outline" v-model="editedItem.userName" label="Nom et prénoms" disabled="true"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Intitulé</h4>
                                            <v-text-field outlined prepend-inner-icon="mdi-account-details-outline" v-model="editedItem.titleCompteRendus" label="Titre du compte rendu" :rules="titleRule">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field outlined prepend-inner-icon="mdi-account-details-outline" v-model="editedItem.compagnieEtnumVol" label="Compagnie / exploitant et numéro de vol">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.marqueModelAeronef" label="Marque / Modèle de l'aéronef">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.marqueModelMoteur" label="Marque / Modèle du moteur"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.immatriculationAeronef" label="Immatriculation de l'aéronef">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Date de l'incident</h4>
                                            <input type="date" v-model="editedItem.dateIncident" class="datepicker" />

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.descriptionDommages" label="Description des dommages causés">
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items10" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.effetSurVol" label="Effet sur le vol"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.effetSurVolText" label="Effets sur le vol">
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items4" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.momentIncident" label="Temps"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items5" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.piste" label="Piste utilisée"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items3" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.incidentSurPlace" label="L'incident a-t-il eu lieu sur place">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-if="editedItem.incidentSurPlace != 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.lieuIncident" label="Lieu de l'incident"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.agl" label="Hauteur au-dessus du niveau du sol (AGL)"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.ias" label="Vitesse indiquée (IAS), en KT">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items6" v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.phaseVol" label="Phase de vol"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items9" v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.partieHeurte" label="Partie(s) heurtée(s)">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items10" v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.effetVol" label="Effet(s) sur le vol">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items8" v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.etatCiel" label="Etat du ciel et précipitation">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items12" v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.especeAnimaux" label="Espèce d'oiseaux ou d'animaux"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-btn v-if="
                      editedItem.oiseauxImg != '' &&
                      editedItem.oiseauxImg != null
                    " class="ma-2" color="primary" @click="() => openLink(editedItem.oiseauxImg)" download>
                                        IMAGE DE L'ANIMAL
                                    </v-btn>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items13" v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.nombreOiseauVu" label="Nombre d'oiseaux/animaux">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items13" v-if="editedItem.incidentSurPlace == 'Oui'" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.nombreOiseauHeurte" label="Nombre d'oiseaux/animaux heurtés">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.evenement" label="Evenement lié à l'impact de l'animal"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items3" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.pilotePrevenu" label="Pilote prévenu">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items7" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.addresseEmail" label="Adresse email d'autorité à contacter">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-select :items="items2" prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.status" label="Statut"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            Détails du statut
                                            <vue-editor v-model="editedItem.detailStatut" label="Détails du statut"> </vue-editor>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.commentaire1" label="Autres renseignements pertinents"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.commentaire2" label="Adresse de l'état">
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-textarea prepend-inner-icon="mdi-format-align-justify" v-model="editedItem.commentaire3" label="Evènements liés à l'impact d'animal"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-divider></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-col cols="12" v-if="editedItem.customFieldsData && editedItem.customFieldsData.length > 0">
                                        <h2 style="color: red; text-align: center;">Champs personnalisés</h2>
                                        <div v-for="item of editedItem.customFieldsData" v-bind:key="item.cle" v-bind:video="item">

                                            <v-row v-if="item.type == 'Zone de texte'">
                                                <v-col cols="12">
                                                    <h4>{{ item.titre }}</h4>
                                                    <vue-editor v-model="editedItem.customFieldsData[editedItem.customFieldsData.indexOf(item)].valeur">
                                                    </vue-editor>

                                                </v-col>
                                            </v-row>

                                            <v-row v-if="item.type == 'Texte' || item.type == 'Numérique'">
                                                <v-col cols="12">
                                                    <h4>{{ item.titre }}</h4>
                                                    <v-text-field prepend-inner-icon="mdi-format-align-justify" :disabled="loading" v-model="editedItem.customFieldsData[editedItem.customFieldsData.indexOf(item)].valeur">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row v-if="item.type == 'Date'">
                                                <v-col cols="12">
                                                    <h4>{{ item.titre }}</h4>

                                                    <v-text-field v-model="editedItem.customFieldsData[editedItem.customFieldsData.indexOf(item)].valeur" readonly v-bind="attrs" v-on="on"></v-text-field>

                                                </v-col>
                                            </v-row>

                                            <v-row v-if="item.type == 'Case à cocher'">
                                                <v-col cols="12">
                                                    <v-checkbox v-model="editedItem.customFieldsData[editedItem.customFieldsData.indexOf(item)].valeur" :label="item.titre"></v-checkbox>
                                                </v-col>
                                            </v-row>

                                            <v-row v-if="item.type == 'Liste déroulante'">
                                                <v-col cols="12">
                                                    <v-select prepend-inner-icon="mdi-apps" :label="item.titre" :disabled="loading" v-model="editedItem.customFieldsData[editedItem.customFieldsData.indexOf(item)].valeur" :items="item.listData"></v-select>
                                                </v-col>
                                            </v-row>

                                            <v-row v-if="item.type == 'Fichier'">
                                                <v-col cols="12">
                                                    <h4>{{ item.titre }}</h4>
                                                    <v-btn class="ma-2" color="primary" @click="() => openLink(editedItem.customFieldsData[editedItem.customFieldsData.indexOf(item)].valeur)" download>
                                                        VOIR LE FICHIER
                                                    </v-btn>
                                                </v-col>
                                            </v-row>

                                        </div>
                                    </v-col>
                                    <v-divider></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Commentaire de l'agent</h4>
                                            <!-- <v-textarea prepend-inner-icon="mdi-format-align-justify" 
                               v-model="editedItem.commentaireAdmin" label="Commentaires de l'admin">
                            </v-textarea> -->
                                            <vue-editor v-model="editedItem.commentaires"></vue-editor>

                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <h4>Votre commentaire</h4>
                                            <!-- <v-textarea prepend-inner-icon="mdi-format-align-justify" 
                               v-model="editedItem.commentaireAdmin" label="Commentaires de l'admin">
                            </v-textarea> -->
                                            <vue-editor v-model="editedItem.commentaireAdmin" label="Commentaires de l'admin">
                                            </vue-editor>
                                        </v-col>
                                        <v-row v-if="editedItem.commentaireAdmin != '' && editedItem.commentedBy != '' && editedItem.commentedBy != null" style="color: red; font-weight:bold">
                                            Ce commentaire a été laissé par {{ editedItem.roleCommentateur }} {{ editedItem.commentedBy
                        }}
                                            à {{ editedItem.dateComment }}.
                                        </v-row>
                                    </v-row>

                                    <br>
                                    <div v-if="editedItem.imagesJoined != null && editedItem.imagesJoined.length > 0">
                                        <v-divider></v-divider>
                                        <h4> Images envoyées </h4>
                                        <v-row>
                                            <div v-for="item of editedItem.imagesJoined" v-bind:key="item.cle" v-bind:video="item">
                                                <v-avatar size="100px" class="my-2" @click="() => openLink(item)">
                                                    <img :src="item" />
                                                </v-avatar>
                                                &nbsp;&nbsp;
                                            </div>

                                        </v-row>
                                    </div>
                                    <br>
                                    <div v-if="editedItem.documentsJoined != null && editedItem.documentsJoined.length > 0">
                                        <v-divider></v-divider>
                                        <h4> Documents envoyées</h4>
                                        <v-row>
                                            <div v-for="item of editedItem.documentsJoined" v-bind:key="item.cle" v-bind:video="item">
                                                <v-btn class="ma-2" color="error" @click="() => openLink(item)" download>
                                                    <b> VOIR LE FICHIER {{ editedItem.documentsJoined.indexOf(item) + 1 }}</b>
                                                </v-btn>
                                                &nbsp;&nbsp;
                                            </div>
                                        </v-row>
                                    </div>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="save">Enregistrer</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="closeView">Quitter</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </base-material-card>
                </v-dialog>

                <v-dialog v-model="dialogMail" max-width="450px">
                    <base-material-card>
                        <template v-slot:heading>
                            <div class="display-2 font-weight-light">
                                Envoyer le formulaire par email
                            </div>

                            <div class="subtitle-1 font-weight-light">
                                Completer les informations
                            </div>
                        </template>
                        <v-form v-bind:disabled="loading" lazy-validation ref="dialogForm">
                            <v-row>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field prepend-inner-icon="mdi-email-outline" v-model="email" label="Email du destinataire" :rules="titleRule"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="text-right">
                                    <v-btn :disabled="loading" class="success" color="" text @click="sendMail">Enregistrer</v-btn>
                                    <v-btn :disabled="loading" color="" text @click="closeMail">Quitter</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </base-material-card>
                </v-dialog>

                <v-spacer></v-spacer>
                <v-btn :disabled="loading1" class="mb-2 white--text py-4" @click="addItem()" color="rgba(0, 157, 160, 0.11)" depressed dark small v-bind="attrs" v-on="on">
                    <v-icon color="rgb(0, 144, 146)">
                        mdi-plus
                    </v-icon>
                </v-btn>
                <v-btn text icon class="mb-2 ml-2" @click="initialize">
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
        <template v-slot:[`item.idForm`]="{ item }">
            <v-chip color="blue" style="color: aliceblue" class="ma-2" outlined @click="viewItem(item)">{{ item.idForm }}
            </v-chip>
        </template>
        <template v-slot:[`item.status`]="{ value }">
            <v-chip v-if="value == 'En cours'" color="green" class="ma-2" outlined style="color: aliceblue">{{ value }}</v-chip>
            <v-chip v-if="value == 'Validé'" color="blue" class="ma-2" outlined style="color: aliceblue">{{ value }}</v-chip>
            <v-chip v-if="value == 'Non validé'" color="red" class="ma-2" outlined style="color: aliceblue">{{ value }}</v-chip>
            <v-chip v-if="value == 'Non approuvé'" color="red" class="ma-2" outlined style="color: aliceblue">{{ value }}</v-chip>
            <v-chip v-if="value == 'Approuvé'" color="blue" class="ma-2" outlined style="color: aliceblue">{{ value }}</v-chip>
            <v-chip v-if="value != 'Approuvé' && value != 'Non approuvé' && value != 'Validé' && value != 'Non validé' && value != 'En cours'" color="grey" class="ma-2" outlined style="color: aliceblue">{{ value }}</v-chip>
        </template>
        <template v-slot:[`item.documentAccompagne`]="{ value }">
            <v-btn v-if="value != ''" class="ma-2" color="error" @click="() => openLink(value)" download>
                VOIR
            </v-btn>
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
                        <v-list-item-title @click="exportFormToPDF(item.idForm)">Exporter</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="printForm(item.idForm)">Imprimer</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="viewItem(item)">Editer</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="viewMail(item)">Envoyer</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-title @click="deleteItem(item)">Supprimer</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

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
import moment from 'moment';
import {
    mapActions,
    mapGetters
} from "vuex";
const Excel = require("exceljs");
import {
    firestore
} from "firebase";
import * as fs from "file-saver";
import {
    storage
} from "firebase";
import "jspdf-autotable";
import jsPDF from "jspdf";
import {
    VueEditor
} from "vue2-editor";
import AXIOS from "axios";

export default {
    components: {
        VueEditor
    },
    data() {
        return {
            menu1: false,
            modal: false,
            menu2: false,

            snack: false,
            snackColor: "",
            snackText: "",
            search: "",
            loading: true,
            loading1: false,
            loading2: false,
            dialog: false,
            dialogView: false,
            dialogAdd: false,
            dialogMail: false,
            email: "",
            formId: "",
            headers: [{
                    text: "ID",
                    value: "idForm"
                },
                {
                    text: "Titre du compte rendu",
                    value: "titleCompteRendus"
                },
                {
                    text: "Nom et prénoms",
                    align: "start",
                    sortable: true,
                    value: "userName",
                },

                {
                    text: "Date et heure d'envoi",
                    value: "dateEnvoi"
                },

                // { text: "Commentaires", value: "commentaireAdmin" },
                {
                    text: "Statut",
                    value: "status",
                    sortable: true
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false
                },
            ],
            titleRule: [(v) => !!v || "Champ obligatoire"],

            items4: ["Aube", "Jour", "Crépuscule", "Nuit"],
            items5: ["04", "02"],
            items6: ['Stationnée',
                'Circulation au sol',
                'Course de décollage',
                'Montée',
                'Croisière',
                'Descente ',
                'Approche ',
                'Roulement à l’atterrissage'
            ],
            items7: ['secretariat@anac-togo.tg', 'anactogo@gmail.com'],
            items8: ['Dégagé',
                'Quelques nuages',
                'Couvert',
                'Brouillard',
                'Pluie',
                'Neige',
            ],
            items9: ['Radôme',
                'Pare-brise',
                'Nez (autre que radôme)',
                'Moteur 1',
                'Moteur 2',
                'Moteur 3',
                'Moteur 4',
                'Hélice',
                'Aile/rotor',
                'Fuselage ',
                'Train d’atterrissage',
                'Queue',
                'Feux ',
                'Autre (à préciser)'
            ],
            items10: ['Aucun',
                'Décollage interrompu',
                'Atterrissage de précaution',
                'Arrêt des moteurs',
                'Autres à préciser'
            ],
            items11: ['Dégagé',
                'Quelques nuages',
                'Couvert',
                'Brouillard',
                'Pluie',
                'Neige',
            ],
            items12: ['Corbeau pie',
                'Milan noir',
                'Pigeon simple',
                'Milan royal',
                'Tourterelle maillée',
                'Pigeon ramier', 'Hirondelle',
                'Effraie',
                'Elanion blanc',
                'Faucon',
                'Perdrix', 'Rouge gorge',
                'Canard sauvage',
                'Capucin nonnette', 'Chauve-souris',
                'Inconnu'
            ],
            items13: ['1', '2 à 10', '11 à 100', 'Plus que 100'],
            items3: ["Oui", "Non"],
            items2: localStorage.getItem("role") == "Superviseur (Chef Service)" ? ["Terminé", "Validé", "Non validé", "En cours"] : ["Terminé", "Ouvert", "Ouvert", "Approuvé", "Refusé", "Réglé", "Non réglé(pièces en commande)", "Non réglé (matériel à changer)", "Non réglé (pas de contrat)", "En cours"],
            editedIndex: -1,
            editedItem: {
                commentaires: "",
                detailStatut: "",
                roleCommentateur: "",
                commentedBy: "",
                effetSurVolText: "",
                descriptionDommages: "",
                lieuIncident: "",
                nombreOiseauHeurte: "",
                titleCompteRendus: "",
                imagesJoined: "",
                documentsJoined: "",
                compagnieEtnumVol: "",
                evenement: "",
                addresseEmail: "",
                addresseEtat: "",
                incidentSurPlace: "",
                effetSurVol: "",
                marqueModelAeronef: "",
                immatriculationAeronef: "",
                marqueModelMoteur: "",
                momentIncident: "",
                agl: "",
                ias: "",
                phaseVol: "",
                piste: "",
                partieHeurte: "",
                effetVol: "",
                etatCiel: "",
                especeAnimaux: "",
                nombreOiseauVu: "",
                pilotePrevenu: "",
                userEmail: "",
                commentaire1: "",
                commentaire2: "",
                commentaire3: "",
                userId: "",
                userName: "",
                status: "",
                oiseauxImg: "",
                commentaireAdmin: "",
                dateIncident: "",
                dateEnvoi: "",
                id: "",
            },
            defaultItem: {
                detailStatut: "",
                commentaires: "",
                roleCommentateur: "",
                commentedBy: "",
                descriptionDommages: "",
                effetSurVolText: "",
                effetSurVol: "",
                lieuIncident: "",
                incidentSurPlace: "",
                nombreOiseauHeurte: "",
                dateIncident: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                titleCompteRendus: "",
                imagesJoined: [],
                documentsJoined: [],
                compagnieEtnumVol: "",
                evenement: "",
                addresseEmail: "",
                addresseEtat: "",
                marqueModelAeronef: "",
                immatriculationAeronef: "",
                marqueModelMoteur: "",
                momentIncident: "",
                agl: "",
                ias: "",
                phaseVol: "",
                piste: "",
                partieHeurte: "",
                effetVol: "",
                etatCiel: "",
                especeAnimaux: "",
                oiseauxImg: "",
                nombreOiseauVu: "",
                pilotePrevenu: "",
                userEmail: "",
                commentaire1: "",
                commentaire2: "",
                commentaire3: "",
                userId: "",
                userName: "",
                status: "En cours",
                commentaireAdmin: "",
                dateEnvoi: "",
                id: "",
            },
            defaultItemInit: {
                detailStatut: "",
                commentaires: "",
                roleCommentateur: "",
                commentedBy: "",
                descriptionDommages: "",
                effetSurVolText: "",
                effetSurVol: "",
                lieuIncident: "",
                incidentSurPlace: "",
                nombreOiseauHeurte: "",
                dateIncident: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                titleCompteRendus: "",
                imagesJoined: [],
                documentsJoined: [],
                compagnieEtnumVol: "",
                evenement: "",
                addresseEmail: "",
                addresseEtat: "",
                marqueModelAeronef: "",
                immatriculationAeronef: "",
                marqueModelMoteur: "",
                momentIncident: "",
                agl: "",
                ias: "",
                phaseVol: "",
                piste: "",
                partieHeurte: "",
                effetVol: "",
                etatCiel: "",
                especeAnimaux: "",
                oiseauxImg: "",
                nombreOiseauVu: "",
                pilotePrevenu: "",
                userEmail: "",
                commentaire1: "",
                commentaire2: "",
                commentaire3: "",
                userId: "",
                userName: "",
                status: "En cours",
                commentaireAdmin: "",
                dateEnvoi: "",
                id: "",
            },
        };

    },
    computed: {

        ...mapGetters({
            compteRendus: "compteRendus/getcompteRendus",
        }),
        formTitle() {
            return "Modifier le statut";
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
        //mail sending//
        viewMail(item) {
            this.editedIndex = this.compteRendus.indexOf(item);
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
            let Columns = [{
                    header: "Titre du compte rendu",
                    key: "titleCompteRendus",
                }, {
                    header: "Statut",
                    key: "status"
                },
                {
                    header: "Agent",
                    key: "userName",
                },
                {
                    header: "Adresse Etat",
                    key: "addresseEtat"
                },
                {
                    header: "Adresse pour compte rendu",
                    key: "addresseEmail"
                },
                {
                    header: "Adresse email de l'agent",
                    key: "userEmail"
                },
                {
                    header: "Date et heure d'envoi",
                    key: "dateEnvoi"
                },
                {
                    header: "Compagnie / exploitant et numéro de vol",
                    key: "compagnieEtnumVol",
                },
                {
                    header: "Marque / Modèle de l'aéronef",
                    key: "marqueModelAeronef"
                },
                {
                    header: "Immatriculation de l'aéronef",
                    key: "immatriculationAeronef",
                },
                {
                    header: "Marque / Modèle du moteur",
                    key: "marqueModelMoteur"
                },

                {
                    header: "Temps",
                    key: "momentIncident",
                },
                {
                    header: "Hauteur au-dessus du niveau du sol (AGL)",
                    key: "agl",
                },
                {
                    header: "Vitesse indiquée (IAS), en KT",
                    key: "ias",
                },
                {
                    header: "Phase de vol",
                    key: "phaseVol",
                },
                {
                    header: "Piste utilisée",
                    key: "piste",
                },
                {
                    header: "Partie(s) heurtée(s)",
                    key: "partieHeurte",
                },
                {
                    header: "Effet(s) sur le vol",
                    key: "effetSurVol",
                },
                {
                    header: "Etat du ciel et précipitation",
                    key: "etatCiel",
                },
                {
                    header: "Espèce d'oiseaux ou d'animaux",
                    key: "especeAnimaux",
                },
                {
                    header: "Nombre d'oiseaux/animaux",
                    key: "nombreOiseauVu"
                },
                {
                    header: "Pilote prévenu",
                    key: "pilotePrevenu",
                },

                {
                    header: "Autres renseignements pertinents",
                    key: "commentaire1",
                },
                {
                    header: "Adresse de l'état",
                    key: "commentaire2",
                },
                {
                    header: "Evènements liés à l'impact d'animal",
                    key: "commentaire3",
                },
            ];
            this.loading = true;
            const snapshot = await firestore().collection("compteRendusOp").where("idForm", "==", this.formId).get();
            const documents = snapshot.docs.map((doc) => doc.data());
            const doc = new jsPDF();
            let pageHeight = doc.internal.pageSize.height;
            doc.addImage("data:image/png;base64,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",
                'JPEG', 20, 0, 25, 25)
            doc.setFontSize(16);
            doc.setFont("helvetica");
            doc.setTextColor(255, 0, 0);
            doc.text("Compte Rendu IBIS ACT (Code: " + this.formId + ")", 105, 15, null, null, "center");
            doc.setTextColor(0, 2, 3);
            let i = 35;
            Columns.forEach((element) => {
                doc.text(element["header"] + " : " + documents[0][element["key"]], 10, i, {
                    align: "left",
                });
                i = i + 10;
            });
            doc.setTextColor(51, 10, 199);
            doc.text("Ce document a été généré par le système GES-UPRA au " + dateString, 105, pageHeight - 10, {
                align: "center",
            });
            var pdfBase64 = doc.output('datauristring');
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "key=AAAALeem-1k:APA91bFi6XX1XOe2gz-VGRBEKI00LfWbXS8TpYRQKzKzc9L3mVKJgZwXWJuNZetn5F316V1ePT_qwFyrR-6q7nwVGs7Hp649JGlEb-wUdpRfDyfvrEcaUxFlsGEjjMXjZY6ap2pQwY-Q"
                }
            };
            let body = {
                pdf: pdfBase64,
                formId: this.formId,
                email: this.email,
            };
            await AXIOS.post("https://thawing-badlands-05581.herokuapp.com/sendMail", body, config);
            this.loading = false;
            this.snack = true;
            this.snackColor = "success";
            this.snackText = "Mail envoyé avec succès.";
            this.dialogMail = false;
        },

        async deleteItem(item) {
            this.loading = true;
            if (confirm("Etes vous sûr(e) de vouloir supprimer ce formulaire?")) {
                this.loading = true;
                try {
                    await this.removecompteRendus(item);
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

        async exportFormToPDF(idForm) {
            let Columns = [{
                    header: "Titre du compte rendu",
                    key: "titleCompteRendus",
                }, {
                    header: "Statut",
                    key: "status"
                },
                {
                    header: "Agent",
                    key: "userName",
                },
                {
                    header: "Adresse Etat",
                    key: "addresseEtat"
                },
                {
                    header: "Adresse pour compte rendu",
                    key: "addresseEmail"
                },
                {
                    header: "Adresse email de l'agent",
                    key: "userEmail"
                },
                {
                    header: "Date et heure d'envoi",
                    key: "dateEnvoi"
                },
                {
                    header: "Compagnie / exploitant et numéro de vol",
                    key: "compagnieEtnumVol",
                },
                {
                    header: "Marque / Modèle de l'aéronef",
                    key: "marqueModelAeronef"
                },
                {
                    header: "Immatriculation de l'aéronef",
                    key: "immatriculationAeronef",
                },
                {
                    header: "Marque / Modèle du moteur",
                    key: "marqueModelMoteur"
                },

                {
                    header: "Temps",
                    key: "momentIncident",
                },
                {
                    header: "Hauteur au-dessus du niveau du sol (AGL)",
                    key: "agl",
                },
                {
                    header: "Vitesse indiquée (IAS), en KT",
                    key: "ias",
                },
                {
                    header: "Phase de vol",
                    key: "phaseVol",
                },
                {
                    header: "Piste utilisée",
                    key: "piste",
                },
                {
                    header: "Partie(s) heurtée(s)",
                    key: "partieHeurte",
                },
                {
                    header: "Effet(s) sur le vol",
                    key: "effetSurVol",
                },
                {
                    header: "Etat du ciel et précipitation",
                    key: "etatCiel",
                },
                {
                    header: "Espèce d'oiseaux ou d'animaux",
                    key: "especeAnimaux",
                },
                {
                    header: "Nombre d'oiseaux/animaux",
                    key: "nombreOiseauVu"
                },
                {
                    header: "Pilote prévenu",
                    key: "pilotePrevenu",
                },

                {
                    header: "Autres renseignements pertinents",
                    key: "commentaire1",
                },
                {
                    header: "Adresse de l'état",
                    key: "commentaire2",
                },
                {
                    header: "Evènements liés à l'impact d'animal",
                    key: "commentaire3",
                },

            ];
            this.loading = true;
            var m = new Date();
            var dateString =
                ("0" + m.getUTCDate()).slice(-2) + "-" +
                ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                m.getUTCFullYear() + " " +
                ("0" + m.getUTCHours()).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2);
            const snapshot = await firestore().collection("compteRendusOp").where("idForm", "==", idForm).get();
            const documents = snapshot.docs.map((doc) => doc.data());
            const doc = new jsPDF();
            let pageHeight = doc.internal.pageSize.height;

            doc.addImage("data:image/png;base64,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",
                'JPEG', 20, 0, 25, 25)
            doc.setFontSize(16);
            doc.setFont("helvetica");
            doc.setTextColor(255, 0, 0);
            doc.text("Compte Rendu IBIS ACT (Code: " + idForm + ")", 105, 15, null, null, "center");
            doc.setTextColor(0, 2, 3);
            let i = 35;
            Columns.forEach((element) => {
                doc.text(element["header"] + " : " + documents[0][element["key"]], 10, i, {
                    align: "left",
                });
                i = i + 10;
            });
            doc.setTextColor(51, 10, 199);
            doc.text("Ce document a été généré par le système GES-UPRA au " + dateString, 105, pageHeight - 10, {
                align: "center",
            });
            doc.save("UPRA FORM (" + idForm + ").pdf");
            this.loading = false;
        },

        async printForm(idForm) {
            let Columns = [{
                    header: "Titre du compte rendu",
                    key: "titleCompteRendus",
                },
                {
                    header: "Statut",
                    key: "status"
                },
                {
                    header: "Agent",
                    key: "userName",
                },
                {
                    header: "Adresse Etat",
                    key: "addresseEtat"
                },
                {
                    header: "Adresse pour compte rendu",
                    key: "addresseEmail"
                },
                {
                    header: "Adresse email de l'agent",
                    key: "userEmail"
                },
                {
                    header: "Date et heure d'envoi",
                    key: "dateEnvoi"
                },
                {
                    header: "Compagnie / exploitant et numéro de vol",
                    key: "compagnieEtnumVol",
                },
                {
                    header: "Marque / Modèle de l'aéronef",
                    key: "marqueModelAeronef"
                },
                {
                    header: "Immatriculation de l'aéronef",
                    key: "immatriculationAeronef",
                },
                {
                    header: "Marque / Modèle du moteur",
                    key: "marqueModelMoteur"
                },

                {
                    header: "Temps",
                    key: "momentIncident",
                },
                {
                    header: "Hauteur au-dessus du niveau du sol (AGL)",
                    key: "agl",
                },
                {
                    header: "Vitesse indiquée (IAS), en KT",
                    key: "ias",
                },
                {
                    header: "Phase de vol",
                    key: "phaseVol",
                },
                {
                    header: "Piste utilisée",
                    key: "piste",
                },
                {
                    header: "Partie(s) heurtée(s)",
                    key: "partieHeurte",
                },
                {
                    header: "Effet(s) sur le vol",
                    key: "effetSurVol",
                },
                {
                    header: "Etat du ciel et précipitation",
                    key: "etatCiel",
                },
                {
                    header: "Espèce d'oiseaux ou d'animaux",
                    key: "especeAnimaux",
                },
                {
                    header: "Nombre d'oiseaux/animaux",
                    key: "nombreOiseauVu"
                },
                {
                    header: "Pilote prévenu",
                    key: "pilotePrevenu",
                },

                {
                    header: "Autres renseignements pertinents",
                    key: "commentaire1",
                },
                {
                    header: "Adresse de l'état",
                    key: "commentaire2",
                },
                {
                    header: "Evènements liés à l'impact d'animal",
                    key: "commentaire3",
                },

            ];
            this.loading = true;
            var m = new Date();
            var dateString =
                ("0" + m.getUTCDate()).slice(-2) + "-" +
                ("0" + (m.getUTCMonth() + 1)).slice(-2) + "-" +
                m.getUTCFullYear() + " " +
                ("0" + m.getUTCHours()).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2);
            const snapshot = await firestore().collection("compteRendusOp").where("idForm", "==", idForm).get();
            const documents = snapshot.docs.map((doc) => doc.data());
            const doc = new jsPDF();
            let pageHeight = doc.internal.pageSize.height;

            doc.addImage("data:image/png;base64,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", 'JPEG', 20, 0, 25, 25)
            doc.setFontSize(16);
            doc.setFont("helvetica");
            doc.setTextColor(255, 0, 0);
            doc.text("Compte Rendu IBIS ACT (Code: " + idForm + ")", 105, 15, null, null, "center");
            doc.setTextColor(0, 2, 3);
            let i = 35;
            Columns.forEach((element) => {
                doc.text(element["header"] + " : " + documents[0][element["key"]], 10, i, {
                    align: "left",
                });
                i = i + 10;
            });
            doc.setTextColor(51, 10, 199);
            doc.text("Ce document a été généré par le système GES-UPRA au " + dateString, 105, pageHeight - 10, {
                align: "center",
            });
            doc.autoPrint({
                variant: 'non-conform'
            });
            doc.output('dataurlnewwindow');
            this.loading = false;
        },

        //To upload
        async uploadTaskImages() {
            this.snack = true;
            this.snackColor = "danger";
            this.snackText = this.$refs.uploader.files.length + " images prises en compte";
            let vm = this;
            vm.defaultItem.imagesJoined = [];
            for (let i = 0; i < this.$refs.uploader.files.length; i++) {
                const newImage = this.$refs.uploader.files[i];
                if (newImage != null && newImage.name) {
                    let ref = storage()
                        .ref()
                        .child("images/" + newImage.name);
                    await ref.put(newImage).then((snapshot) => {
                        if (snapshot.state === "success") {
                            snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                vm.defaultItem.imagesJoined.push(downloadURL);
                            });
                        }
                    });
                }
            }
        },

        async uploadTaskDocuments() {
            this.snack = true;
            this.snackColor = "danger";
            this.snackText = this.$refs.uploader1.files.length + " documents prises en compte";
            let vm = this;
            vm.defaultItem.documentsJoined = [];
            for (let i = 0; i < this.$refs.uploader1.files.length; i++) {
                const newDocument = this.$refs.uploader1.files[i];
                if (newDocument != null && newDocument.name) {
                    let ref = storage()
                        .ref()
                        .child("documents/" + newDocument.name);
                    await ref.put(newDocument).then((snapshot) => {
                        if (snapshot.state === "success") {
                            snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                vm.defaultItem.documentsJoined.push(downloadURL);
                            });
                        }
                    });
                }
            }
        },
        //-------------------------------------------------------------end upload

        ...mapActions({
            loadcompteRendus: "compteRendus/loadcompteRendus",
        }),
        openLink(link) {
            window.open(link, "_blank");
        },
        ...mapActions({
            addcompteRendu: "compteRendus/addcompteRendu",
            updatecompteRendus: "compteRendus/updatecompteRendus",
            removecompteRendus: "compteRendus/removecompteRendus",
        }),
        getcompteRendusById: function (id) {
            let compteRendus = this.compteRendus.filter((c) => c.id == id)[0];
            console.log(compteRendus.status);
            if (compteRendus === undefined) {
                console.log("undefined qarşim");
                return {
                    nom: "Unknown"
                };
            }
            return compteRendus;
        },
        async exportToExcel() {
            this.loading1 = true;
            let workbook = new Excel.Workbook();
            let worksheet = workbook.addWorksheet("Compte rendus IBIS ACT");
            worksheet.columns = [{
                    header: "ID",
                    key: "idForm",
                },
                {
                    header: "Titre du compte rendu",
                    key: "titleCompteRendus",
                },
                {
                    header: "Agent",
                    key: "userName",
                },
                {
                    header: "Adresse Etat",
                    key: "addresseEtat"
                },
                {
                    header: "Adresse pour compte rendu",
                    key: "addresseEmail"
                },
                {
                    header: "Adresse email de l'agent",
                    key: "userEmail"
                },
                {
                    header: "Date et heure d'envoi",
                    key: "dateEnvoi"
                },
                {
                    header: "Compagnie / exploitant et numéro de vol",
                    key: "compagnieEtnumVol",
                },
                {
                    header: "Marque / Modèle de l'aéronef",
                    key: "marqueModelAeronef"
                },
                {
                    header: "Immatriculation de l'aéronef",
                    key: "immatriculationAeronef",
                },
                {
                    header: "Marque / Modèle du moteur",
                    key: "marqueModelMoteur"
                },

                {
                    header: "Temps",
                    key: "momentIncident",
                },
                {
                    header: "Hauteur au-dessus du niveau du sol (AGL)",
                    key: "agl",
                },
                {
                    header: "Vitesse indiquée (IAS), en KT",
                    key: "ias",
                },
                {
                    header: "Phase de vol",
                    key: "phaseVol",
                },
                {
                    header: "Piste utilisée",
                    key: "piste",
                },
                {
                    header: "Partie(s) heurtée(s)",
                    key: "partieHeurte",
                },
                {
                    header: "Effet(s) sur le vol",
                    key: "effetSurVol",
                },
                {
                    header: "Etat du ciel et précipitation",
                    key: "etatCiel",
                },
                {
                    header: "Espèce d'oiseaux ou d'animaux",
                    key: "especeAnimaux",
                },
                {
                    header: "Nombre d'oiseaux/animaux",
                    key: "nombreOiseauVu"
                },
                {
                    header: "Pilote prévenu",
                    key: "pilotePrevenu",
                },

                {
                    header: "Autres renseignements pertinents",
                    key: "commentaire1",
                },
                {
                    header: "Adresse de l'état",
                    key: "commentaire2",
                },
                {
                    header: "Evènements liés à l'impact d'animal",
                    key: "commentaire3",
                },

                // { header: "Commentaires de l'administrateur", key: "commentaireAdmin" },
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
                column.width = maxLength < 10 ? 10 : maxLength;
            });
            worksheet.getRow(1).font = {
                bold: true,
                color: {
                    argb: "0047AB"
                }
            };
            const snapshot = await firestore().collection("compteRendusOp").get();
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
                fs.saveAs(blob, `compteRendus.xlsx`);
            });
            this.loading1 = false;
        },
        addItem() {
            this.editedIndex = -1;
            this.defaultItem = Object.assign({}, this.defaultItemInit);
            this.dialogAdd = true;
        },
        closeAdd() {
            this.dialogAdd = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        exportPDF() {
            this.loading2 = true;
            let exportColumns = [{
                    title: "ID",
                    dataKey: "idForm",
                },
                {
                    title: "Titre du compte rendu",
                    dataKey: "titleCompteRendus",
                },
                {
                    title: "Agent",
                    dataKey: "userName",
                },
                {
                    title: "Compagnie",
                    dataKey: "compagnieEtnumVol",
                },
                {
                    title: "Immatriculation",
                    dataKey: "immatriculationAeronef",
                },

                {
                    title: "Temps",
                    dataKey: "momentIncident",
                },
                {
                    title: "Hauteur",
                    dataKey: "agl",
                },
                {
                    title: "Vitesse",
                    dataKey: "ias",
                },
                {
                    title: "Phase de vol",
                    dataKey: "phaseVol",
                },
                {
                    title: "Piste utilisée",
                    dataKey: "piste",
                },
                {
                    title: "Partie(s) heurtée(s)",
                    dataKey: "partieHeurte",
                },
                {
                    title: "Date et heure",
                    dataKey: "dateEnvoi"
                },
                // { title: "Commentaires de l'administrateur", dataKey: "commentaireAdmin" },
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
                    doc.text("Liste des comptes rendus IBIS ACT", 30, 30, {
                        align: "justify",
                    });
                    doc.autoTable(exportColumns, this.compteRendus);
                    doc.save("Comptes rendus IBIS ACT.pdf");
                    this.loading2 = false;
                })
            });
        },
        async initialize() {
            this.loading = true;
            try {
                await this.loadcompteRendus();
            } catch (e) {
                console.error(e);
            }
            this.loading = false;
        },

        editItem(item) {
            this.editedIndex = this.compteRendus.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        viewItem(item) {
            this.editedIndex = this.compteRendus.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.editedItem["dateIncident"] = moment(this.editedItem["dateIncident"], 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD');
            this.dialogView = true;
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeView() {
            this.dialogView = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        async save() {
            if (!this.$refs.dialogForm.validate()) return;
            this.loading = true;
            if (this.editedIndex <= -1) {
                this.snack = true;
                this.snackColor = "blue";
                this.snackText = "Action en cours...";
                await this.uploadTaskImages();
                await this.uploadTaskDocuments();
            }

            if (this.editedIndex > -1) {
                this.loading = true;
                try {
                    await this.updatecompteRendus({
                        index: this.editedIndex,
                        order: this.editedItem,
                    });
                    this.loading = false;
                    this.dialogView = false;
                    this.dialogAdd = false;
                    this.close();
                    this.snack = true;
                    this.snackColor = "success";
                    this.snackText = "Le statut du formulaire a été mise à jour";
                } catch (e) {
                    this.loading = false;
                    this.close();

                    this.snack = true;
                    this.snackColor = "error";
                    this.snackText =
                        "Le statut du formulaire n'a pas pu être mise à jour";
                    console.error(e);
                }
            } else {
                this.loading = true;
                try {
                    await this.addcompteRendu(this.defaultItem);
                    this.loading = false;
                    this.close();
                    this.dialogAdd = false;
                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Formulaire ajouté avec succès.'
                } catch (e) {
                    this.loading = false;
                    this.close();
                    this.snack = true
                    this.snackColor = 'error'
                    this.snackText = 'Le formulaire n\'a pas été ajouté.'
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
