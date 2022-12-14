<template>
    <v-card v-bind="$attrs" v-on="$listeners" :class="classes" class="v-card--material pa-3"
        :style="icon ? `background: ${color}` : undefined">
        <div v-if="icon" class="d-flex grow align-center justify-center">
            <v-sheet v-if="iconColor" :class="{
                'pa-5': !$slots.image,
            }" :color="iconColor" max-height="80" width="auto" elevation="6">
                <v-icon size="40" v-text="icon" />
            </v-sheet>

            <v-icon v-else size="60" v-text="icon" class="white--text" />

            <div v-if="$slots['after-heading']" class="ml-6">
                <slot name="after-heading" />
            </div>
        </div>
        <div v-else class="d-flex grow flex-wrap">
            <v-avatar v-if="avatar" size="128" class="mx-auto v-card--material__avatar elevation-6" color="grey">
                <v-img :src="avatar" />
            </v-avatar>

            <v-sheet v-else :class="{
                'pa-7': !$slots.image,
            }" :color="color" width="100%" elevation="0" class="text-start v-card--material__heading mb-n6" dark>
                <slot v-if="$slots.heading" name="heading" />

                <slot v-else-if="$slots.image" name="image" />

                <div v-else-if="title && !icon" class="display-1 font-weight-light" v-text="title" />

                <div v-if="text" class="headline font-weight-thin" v-text="text" />
            </v-sheet>

            <div v-if="$slots['after-heading']" class="ml-2">
                <slot name="after-heading" />
            </div>
        </div>

        <slot />

        <template v-if="$slots.actions">
            <v-divider class="mt-2" />

            <v-card-actions class="pb-0">
                <slot name="actions" />
            </v-card-actions>
        </template>
    </v-card>
</template>

<script>
export default {
    name: "MaterialCard",

    props: {
        avatar: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "primary",
        },
        icon: {
            type: String,
            default: undefined,
        },
        iconColor: {
            type: String,
            default: undefined,
        },
        image: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },

    computed: {
        classes() {
            return {
                "v-card--material--has-heading": this.hasHeading,
            };
        },
        hasHeading() {
            return Boolean(this.$slots.heading || this.title || this.icon);
        },
        hasAltHeading() {
            return Boolean(this.$slots.heading || (this.title && this.icon));
        },
    },
};
</script>

<style lang="sass">
.v-card--material
  &__avatar
    position: relative
    top: -64px
    margin-bottom: -32px

  &__heading
    position: relative
    top: -40px
    transition: .3s ease
    z-index: 1
</style>
