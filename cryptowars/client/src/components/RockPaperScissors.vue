<template>
    <v-layout row wrap text-xs-center>
        <v-flex xs4>
            <v-btn
                v-on:click.stop="$emit('move-chosen', MovesToIndex.rock)"
                large fab
            >
                <v-icon light x-large>fa-hand-rock</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs4>
            <v-btn
                v-on:click.stop="$emit('move-chosen', MovesToIndex.paper)"
                large fab
         