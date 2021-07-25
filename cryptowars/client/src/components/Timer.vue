<template>
    <div class="text-xs-center">
        <v-progress-circular
            :rotate="-90"
            :size="size"
            :width="15"
            :value="value"
            :color="color"
        >
            {{ getTimeLeft(value) }}
        </v-progress