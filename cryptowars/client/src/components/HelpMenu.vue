
<template>
    <v-dialog ref="myDialog"
        v-model="dialog"
        width="500"
        persistent
    >
        <v-btn absolute small top right fab
            color="white"
            class="menu help"
            slot="activator"
        >
            <v-icon>fa-question</v-icon>
        </v-btn>