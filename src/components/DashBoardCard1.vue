

<template>
    <v-card :color="color" elevation="5" outlined @click="goto(path)">
        <v-card-title>
            <v-icon color="white" large left>{{ icon }}</v-icon>
            <span class="white--text">{{ data }}</span>
        </v-card-title>
        <v-card-text class="white--text">
            {{ title }}
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props: {
        title: String,
        color: String,
        data: Number,
        icon: String,
        path: String
    },
    methods: {
        goto(newPath) {
            this.$router.push({ path: "/admin" + newPath }).catch(() => { });
        },
    },
}
</script>