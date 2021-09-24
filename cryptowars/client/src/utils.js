export class UserRaidenApi {
    constructor(axios, ip, token, target) {
        this.axios = axios;
        this.ip = ip;
        this.token = token;
        this.target = target;
    }

    pay(payload) {
        const