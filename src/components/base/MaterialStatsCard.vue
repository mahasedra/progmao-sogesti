<template>
    <base-material-card :icon="icon" v-bind="$attrs" v-on="$listeners" class="py-6" @click="goto(path)">
        <template v-slot:after-heading>
            <div class="ml-auto text-left">
                <h3 :class="`text-h3 font-weight-medium ${dataEnCours != undefined ? 'white' : 'light'}--text`">
                    {{ data }}
                </h3>
                <div :class="`text-h4 font-weight-light ${dataEnCours != undefined ? 'white' : 'light'}--text`"
                    v-text="title" />
            </div>
        </template>

        <v-col cols="12" class="px-0">
            <!-- <v-divider /> -->
        </v-col>

        <div v-if="dataEnCours != undefined" class="d-flex grow justify-space-around">
            <div>
                <span class="body-1 white--text font-weight-black" v-text="dataEnCours" />
                <span class="body-2 white--text font-weight-regular">
                    En cours
                </span>
            </div>
            <div>
                <span class="body-1 white--text font-weight-black" v-text="dataValide" />
                <span class="body-2 white--text font-weight-regular">
                    Validé
                </span>
            </div>
            <div>
                <span class="body-1 white--text font-weight-black" v-text="dataApprouve" />
                <span class="body-2 white--text font-weight-regular">
                    Approuvé
                </span>
            </div>
        </div>

    </base-material-card>
</template>

<script>
import Card from "./Card";

export default {
    name: "MaterialStatsCard",

    inheritAttrs: false,

    props: {
        ...Card.props,
        icon: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: undefined,
        },
        data: {
            type: Number,
            default: undefined,
        },
        dataEnCours: {
            type: Number,
            default: undefined,
        },
        dataValide: {
            type: Number,
            default: undefined,
        },
        dataApprouve: {
            type: Number,
            default: undefined,
        },
        path: {
            type: String,
            default: undefined,
        },
    },

    methods: {
        goto(newPath) {
            this.$router.push({ path: "/admin" + newPath }).catch(() => { });
        },
    },
};
</script>

<style lang="sass">
.v-card--material-stats
  display: flex
  flex-wrap: wrap

  > div:first-child
    justify-content: space-between

  .v-card
    border-radius: 4px
    flex: 0 1 auto

  .v-card__text
    display: inline-block
    flex: 1 0 calc(100% - 120px)
    position: absolute
    top: 0
    right: 0
    width: 100%

  .v-card__actions
    flex: 1 0 100%
</style>
