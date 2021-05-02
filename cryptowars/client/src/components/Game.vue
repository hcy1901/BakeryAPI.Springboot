
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
        userInfo() {
            this.setUserRaidenApi();
        },
    },
    mounted() {
        this.setUserRaidenApi();
    },
    methods: {
        setUserRaidenApi() {
            this.userRaidenApi = new UserRaidenApi(
                Vue.axios,
                this.userInfo.ip,
                GameGuardian.token_address[Network],
                GameGuardian.raiden_address[Network]
            );
        },
        restartGame() {
            this.swiper.slideTo(0, 1000, false);
        },
        nextSlide() {
            if (this.swiper.realIndex == 0) {
                console.log('this.userInfo', this.userInfo);
                this.game = null;
                this.raiden_payment = null;
                this.winningPayment = null;
                this.player = null;
                this.move = null;
                this.moveStarted = null;
                this.secret = null;
                if (!this.userInfo.address || !this.userInfo.ip) {
                    this.$emit('needs-info');
                    return;
                }
                this.setCurrentGame().then(() => {
                    if (this.gameState == GameState.resolved) {
                        console.log('gameState resolved, starting new game');
                        return this.startGame();
                    }
                    return;
                }).then(() => {
                    return this.setCurrentGame();
                }).then(() => {
                    if (this.gameState == GameState.closed) {
                        alert(`wait for results on previous game: ${Math.floor(this.wait / 1000)} sec`);
                    } else {
                        this.swiper.slideNext(1000, false);
                    }
                });
            } else {
                this.swiper.slideNext(1000, false);
            }
        },
        userPlay() {
            let self = this;
            if (!this.player || !this.move) {
                alert('Choose a player and a move.');
            }

            async function play() {
                if (!self.paymentIdentifier) {
                    await self.initMove();
                }
                if (!self.paymentIdentifier) {
                    throw new Error('Payment identifier not received.')
                }
                self.userRaidenApi.pay({
                    amount: GameGuardian.amount,
                    identifier: self.paymentIdentifier,
                }).then((response) => {
                    console.log('raiden payment response', response);
                    self.paymentIdentifier = null;
                    self.raiden_payment = response.data;
                    self.nextSlide();
                }).catch((error) => {
                    alert(`${error} on ${self.userRaidenApi.ip}`);
                });
            };
            play();
        },
        initMove() {
            return this.guardianApi.initMove(this.game._id, {
                playerId: String(this.player),
                userAddress: this.userInfo.address,
                moveHash: this.getMoveHash(),
            }).catch((error) => {
                alert(`${error} on ${this.guardianApi.ip}`);
            }).then((response) => {
                this.moveStarted = response.data;
                this.paymentIdentifier = response.data.paymentIdentifier;
            });
        },