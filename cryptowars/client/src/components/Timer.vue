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
        </v-progress-circular>
    </div>
</template>

<script>
export default {
    props: {
        time: {
            type: Number,
            default: 0,
        },
        color: {
            type: String,
            default: 'black',
        },
        startValue: {
            type: Number,
            default: 0,
        },
        size: {
            type: String,
            default: "100",
        }
    },
    data() {
        return {
            value: 0,
            interval: null,
            intervalTime: 1000,
        }
    },
    beforeDestroy () {
        this.clearInterval();
    },
    mounted() {
        this.