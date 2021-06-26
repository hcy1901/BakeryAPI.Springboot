
<template>
    <!-- <v-container fill-height> -->
        <v-layout wrap text-xs-center>
            <v-flex xs12>
                <Timer
                    :time="timer.intervalGame || 0"
                    :startValue="timer.value || 0"
                    size="100"
                    color="grey"
                    v-on:timer-end="$emit('timer-end')"
                />
                </br>
            </v-flex>
            <v-flex xs12>
                <div class="display-1">Choose:</div>
            </v-flex>
            <v-flex xs12>