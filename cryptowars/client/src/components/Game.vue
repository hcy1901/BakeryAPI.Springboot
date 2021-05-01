
<template>
    <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="swiper-margin no-swipe">
            <v-container fill-height>
                <v-layout>
                    <StartPage v-on:go="nextSlide()"/>
                </v-layout>
            </v-container>
        </swiper-slide>
        <swiper-slide class="swiper-margin no-swipe">
            <v-layout text-xs-center wrap>
                <v-flex xs12>
                    <GameOpen
                        :timer="timer"
                        v-on:player-chosen="setPlayer"
                        v-on:move-chosen="setMove"
                        v-on:play="userPlay"
                        v-on:timer-end="gameTimerEnd"
                    />
                </v-flex>
            </v-layout>
        </swiper-slide>
        <swiper-slide class="swiper-margin no-swipe">
            <GameClosed
                v-if="game"
                :game="game"
                :timer="timer"
                :player="player"
                :move="move"
                :winningPayment="winningPayment"
                v-on:timer-end="resolveTimerEnd"
                v-on:restart-game="restartGame()"
            />
        </swiper-slide>

        <!-- <v-btn absolute small top left fab
            color="white"
            slot="button-prev"
            class="nav prev"
        >
            <v-icon>fa-chevron-left</v-icon>
        </v-btn>
        <v-btn absolute small top right fab
            color="white"
            class="nav next"
            slot="button-next"
        >
            <v-icon>fa-chevron-right</v-icon>
        </v-btn> -->
  </div>

    </swiper>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import StartPage from './StartPage';
import GameOpen from './GameOpen';
import GameClosed from './GameClosed';
import GameEnd from './GameEnd';
import { MovesToIndex, IndexToMoves, GameGuardian, GameState, GameStateIndex, Network } from '../constants';
import { UserRaidenApi, GuardianApi } from '../utils';

Vue.use(VueAwesomeSwiper);

const web3Utils = require('web3-utils');


export default {
    props: ['userInfo'],
    components: {
        StartPage,
        GameOpen,
        GameClosed,
        GameEnd,
    },
    data() {
        return {
            swiperOptions: {
                noSwiping: true,
                navigation: {
                    nextEl: '.next',
                    prevEl: '.prev',
                },
                noSwipingClass: "no-swipe",
                loop: false,
                slidesPerView: "auto",
            },
            userRaidenApi: null,
            guardianApi: new GuardianApi(
                Vue.axios,
                GameGuardian.host,
            ),
            player: null,
            game: null,
            gameState: GameState.null,
            move: null,
            timer: {intervalGame: 0, intervalResolve: 0, value: 0},
            raiden_payment: null,
            winningPayment: null,
            moveStarted: null,
            secret: null,
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
    },
    watch: {