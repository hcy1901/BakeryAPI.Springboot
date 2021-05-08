<template>
    <v-container fill-height>
        <v-layout text-xs-center wrap>
            <v-flex xs12 v-if="winningMove">
                <v-btn
                    large fab
                >
                    <v-icon x-large>{{ `fa-hand-${winningMove}` }}</v-icon>
  