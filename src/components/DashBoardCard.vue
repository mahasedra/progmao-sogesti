<template>
    <v-card class="ma-1" :color="color" elevation="5" outlined @click="goto(path)">
        <v-list-item>
            <!-- <v-list-item-avatar tile class="mt-n16">
                <v-card class="mx-auto" max-width="344" elevation="20" >
                    
                </v-card>
            </v-list-item-avatar> -->
            <v-row>
 <v-icon color="white" large left>{{ icon }}</v-icon>
   <v-list-item-content style="color: white">
               
                <div class="overline text-right">{{ title }}</div>
                <v-list-item-title class="headline mb-1 text-right">{{ data }}</v-list-item-title>
                <div>
                    <v-divider></v-divider>
                </div>
            </v-list-item-content>
            </v-row>
          
        </v-list-item>
        <v-card-actions>
            <v-icon right dark>archive-clock-outline</v-icon>
            <div class="overline" style="color: white;">En cours : </div>
            <div class="headline mb-1 text-right" style="color: white;"> {{ dataEnCours }}</div>
            &nbsp;
            <v-icon right dark>archive-clock-outline</v-icon>
            <div class="overline" style="color: white; font-weight: bold;">Validé : </div>
            <div class="headline mb-1 text-right" style="color: white;"> {{ dataValide }}</div>
            &nbsp;
            <v-icon right dark>archive-clock-outline</v-icon>
            <div class="overline" style="color: white; font-weight: bold;">Approuvé : </div>
            <div class="headline mb-1 text-right" style="color: white;"> {{ dataApprouve }}</div>
        </v-card-actions>


    </v-card>

</template>


<script>
export default {
    props: {
        title: String,
        color: String,
        data: Number,
        dataEnCours: Number,
        dataValide: Number,
        dataApprouve: Number,
        icon: String,
        path: String,
    },
    methods: {
        goto(newPath) {
            this.$router.push({ path: "/admin" + newPath }).catch(() => { });
        },
    },
}
</script>