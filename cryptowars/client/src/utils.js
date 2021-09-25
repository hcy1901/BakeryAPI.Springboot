export class UserRaidenApi {
    constructor(axios, ip, token, target) {
        this.axios = axios;
        this.ip = ip;
        this.token = token;
        this.target = target;
    }

    pay(payload) {
        const api = `${this.ip}/api/v1/payments/${this.token}/${this.target}`;
        console.log('pay', api, payload);
        return this.axios.post